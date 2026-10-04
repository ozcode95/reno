import * as THREE from 'three';
import { Kit } from './builder/kit';
import { doorLeaf, type LeafOpts, type MovablePart } from './builder/fixtures';

/** A hinged door leaf (front door, room doors). */
export interface SwingLeafSpec extends Omit<LeafOpts, 'angle'> {
  id: string;
  label: string;
  /** opening angle when fully open (radians) */
  maxAngle: number;
  open?: boolean;
  /** scene group the leaf belongs to (so it hides with its floor) */
  level?: 'gf' | 'ff' | 'site';
}

/**
 * Anything that opens at runtime: door leaves, casement sashes, sliding glass panels.
 * `build` emits the part in world coordinates at its closed position.
 */
export interface MovableSpec extends MovablePart {
  id: string;
  label: string;
  level?: 'gf' | 'ff' | 'site';
  /** Second panel on a vertical folding hinge, built in closed world coordinates. */
  fold?: { pivot: [number, number]; angle: number; build: (kit: Kit) => void };
}

export interface Movable {
  spec: MovableSpec;
  pivot: THREE.Group;
  foldPivot?: THREE.Group;
  open: boolean;
  /** hinge: 0 = closed … 1 = open. slide: progress of the current move from `from` to `goal` */
  t: number;
  meshes: THREE.Mesh[];
  /** slide offsets (x, z): where the current move started and where it goes */
  from: [number, number];
  goal: [number, number];
  dur: number;
}

/** staged slider group state (e.g. 3-panel sliding door) */
interface Group {
  parts: Movable[];
  stage: number;
  stages: number;
  dir: 1 | -1;
}

/** convert a hinged door leaf into a generic movable */
export function leafMovable(spec: SwingLeafSpec): MovableSpec {
  // rotation.y = +a turns +X towards -Z: pick the sign that swings the latch edge towards `swing`
  const sign = spec.dir[1] * spec.swing[0] - spec.dir[0] * spec.swing[1] >= 0 ? 1 : -1;
  return {
    id: spec.id, label: spec.label, level: spec.level, open: spec.open ?? false, index: 0,
    kind: 'hinge', pivot: spec.hinge, angle: sign * spec.maxAngle,
    build: (kit) => doorLeaf(kit, { ...spec, angle: 0 }),
  };
}

const DURATION = { hinge: 1.1 }; // seconds for a full swing (slides move at ~0.85 m/s)
const ease = (t: number) => t * t * (3 - 2 * t);

export class Openables {
  readonly leaves: Movable[] = [];
  private groups = new Map<string, Group>();
  /** called once a movement has finished (e.g. to rebuild the path tracer's scene) */
  onSettled?: () => void;
  /** called whenever a part is toggled */
  onToggle?: (leaf: Movable) => void;
  private moving = false;

  constructor(private getMat: (key: string) => THREE.Material, private casts: (key: string) => boolean) {}

  private buildPart(id: string, build: (kit: Kit) => void): THREE.Group {
    const kit = new Kit();
    kit.group = 'part';
    build(kit);
    const g = kit.build(this.getMat, this.casts).get('part') ?? new THREE.Group();
    g.name = `openable-part:${id}`;
    return g;
  }

  add(spec: MovableSpec): Movable {
    const g = this.buildPart(spec.id, spec.build);
    const pivot = new THREE.Group();
    pivot.name = `openable:${spec.id}`;
    // geometry is in world coordinates; the pivot sits on the hinge axis (or at the origin for sliders)
    const p = spec.kind === 'hinge' ? spec.pivot ?? [0, 0] : [0, 0];
    const py = spec.kind === 'hinge' ? spec.pivotY ?? 0 : 0;
    pivot.position.set(p[0], py, p[1]);
    g.position.set(-p[0], -py, -p[1]);
    pivot.add(g);
    let foldPivot: THREE.Group | undefined;
    if (spec.kind === 'hinge' && spec.fold) {
      const [fx, fz] = spec.fold.pivot;
      foldPivot = new THREE.Group();
      foldPivot.name = `openable-fold:${spec.id}`;
      foldPivot.position.set(fx - p[0], 0, fz - p[1]);
      const folded = this.buildPart(`${spec.id}:fold`, spec.fold.build);
      folded.position.set(-fx, -py, -fz);
      foldPivot.add(folded);
      pivot.add(foldPivot);
    }
    const meshes: THREE.Mesh[] = [];
    pivot.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) {
        m.userData.openable = spec.id;
        meshes.push(m);
      }
    });
    const open = spec.open ?? false;
    const off: [number, number] = spec.kind === 'slide' && open && !spec.group ? spec.offset ?? [0, 0] : [0, 0];
    const leaf: Movable = { spec, pivot, foldPivot, open, t: spec.kind === 'hinge' ? (open ? 1 : 0) : 1, meshes, from: off, goal: off, dur: 1 };
    if (spec.group) {
      let g = this.groups.get(spec.group);
      if (!g) this.groups.set(spec.group, (g = { parts: [], stage: 0, stages: 0, dir: 1 }));
      g.parts.push(leaf);
      g.stages = Math.max(g.stages, spec.stages?.length ?? 0);
    }
    this.pose(leaf);
    this.leaves.push(leaf);
    return leaf;
  }

  clear() {
    for (const leaf of this.leaves) leaf.pivot.removeFromParent();
    this.leaves.length = 0;
    this.groups.clear();
    this.moving = false;
  }

  get meshes(): THREE.Mesh[] {
    return this.leaves.flatMap((l) => l.meshes);
  }

  get(id: string) {
    return this.leaves.find((l) => l.spec.id === id);
  }

  /** part that owns a raycast hit object, if any */
  leafOf(obj: THREE.Object3D | null | undefined): Movable | undefined {
    const id = obj?.userData?.openable as string | undefined;
    return id ? this.get(id) : undefined;
  }

  toggle(leaf: Movable | undefined, open = !leaf?.open) {
    if (!leaf) return;
    if (leaf.spec.id.startsWith('auto-gate-')) {
      for (const other of this.leaves) if (other.spec.id.startsWith('auto-gate-')) other.open = open;
    }
    const g = leaf.spec.group ? this.groups.get(leaf.spec.group) : undefined;
    if (g) {
      // step the whole group one stage: open fully, then close back stage by stage
      if (g.stage >= g.stages) g.dir = -1;
      else if (g.stage <= 0) g.dir = 1;
      g.stage += g.dir;
      for (const p of g.parts) {
        p.open = g.stage > 0;
        this.slideTo(p, g.stage > 0 ? p.spec.stages?.[g.stage - 1] ?? [0, 0] : [0, 0]);
      }
    } else {
      leaf.open = open;
      if (leaf.spec.kind === 'slide') this.slideTo(leaf, open ? leaf.spec.offset ?? [0, 0] : [0, 0]);
    }
    this.onToggle?.(leaf);
  }

  /** start a slide from the current position towards `goal` */
  private slideTo(l: Movable, goal: [number, number]) {
    const cur = this.slidePos(l);
    l.from = cur;
    l.goal = goal;
    l.t = 0;
    l.dur = Math.max(0.35, Math.hypot(goal[0] - cur[0], goal[1] - cur[1]) / 0.85);
  }

  private slidePos(l: Movable): [number, number] {
    const k = ease(l.t);
    return [l.from[0] + (l.goal[0] - l.from[0]) * k, l.from[1] + (l.goal[1] - l.from[1]) * k];
  }

  /** advances the animations; returns true while something moves */
  update(dt: number): boolean {
    let any = false;
    const d = Math.min(dt, 0.1);
    for (const l of this.leaves) {
      if (l.spec.kind === 'slide') {
        if (l.t >= 1) continue;
        l.t = Math.min(1, l.t + d / l.dur);
      } else {
        const goal = l.open ? 1 : 0;
        if (l.t === goal) continue;
        const step = d / DURATION.hinge;
        l.t = goal > l.t ? Math.min(goal, l.t + step) : Math.max(goal, l.t - step);
      }
      this.pose(l);
      any = true;
    }
    if (this.moving && !any) this.onSettled?.();
    this.moving = any;
    return any;
  }

  private pose(l: Movable) {
    if (l.spec.kind === 'hinge') {
      const progress = ease(l.t);
      l.pivot.rotation[l.spec.rotAxis ?? 'y'] = (l.spec.angle ?? 0) * progress;
      if (l.foldPivot && l.spec.fold) l.foldPivot.rotation.y = l.spec.fold.angle * progress;
    }
    else {
      const o = this.slidePos(l);
      l.pivot.position.set(o[0], 0, o[1]);
    }
    l.pivot.updateMatrixWorld(true);
  }
}
