import * as THREE from 'three';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';

export type Units = 'metric' | 'imperial' | 'both';

export function fmtLen(m: number, units: Units): string {
  const metric = m < 1 ? `${(m * 100).toFixed(1)} cm` : `${m.toFixed(3)} m`;
  const inches = m / 0.0254;
  let ft = Math.floor(inches / 12);
  let inch = Math.round((inches - ft * 12) * 8) / 8;
  if (inch >= 12) { ft += 1; inch -= 12; }
  const whole = Math.floor(inch);
  const frac = Math.round((inch - whole) * 8);
  const fracs = ['', '⅛', '¼', '⅜', '½', '⅝', '¾', '⅞'];
  const imperial = `${ft}′ ${whole}${fracs[frac] ?? ''}″`;
  if (units === 'metric') return metric;
  if (units === 'imperial') return imperial;
  return `${metric}  ·  ${imperial}`;
}

interface Measurement {
  a: THREE.Vector3;
  b: THREE.Vector3;
  line: Line2;
  ends: THREE.Mesh[];
  label: CSS2DObject;
}

export class MeasureTool {
  active = false;
  units: Units = 'both';
  group = new THREE.Group();
  private ray = new THREE.Raycaster();
  private list: Measurement[] = [];
  private start: THREE.Vector3 | null = null;
  private cursor: THREE.Mesh;
  private preview: Line2;
  private previewLabel: CSS2DObject;
  private lineMat: LineMaterial;
  private prevMat: LineMaterial;
  private endMat = new THREE.MeshBasicMaterial({ color: 0xffb300, depthTest: false, toneMapped: false });
  private cursorMats = {
    surface: new THREE.MeshBasicMaterial({ color: 0xffffff, depthTest: false, toneMapped: false }),
    edge: new THREE.MeshBasicMaterial({ color: 0x47d7ff, depthTest: false, toneMapped: false }),
    vertex: new THREE.MeshBasicMaterial({ color: 0xff6d00, depthTest: false, toneMapped: false }),
  };
  shift = false;
  onChange?: () => void;

  constructor(private camera: THREE.PerspectiveCamera, private targets: () => THREE.Object3D[]) {
    (this.ray as unknown as { firstHitOnly: boolean }).firstHitOnly = true;
    this.group.name = 'measure';
    this.group.userData.noAO = true;
    this.lineMat = new LineMaterial({ color: 0xffb300, linewidth: 3, depthTest: false, transparent: true, toneMapped: false });
    this.prevMat = new LineMaterial({ color: 0xffffff, linewidth: 2, depthTest: false, transparent: true, dashed: true, dashSize: 0.1, gapSize: 0.06, toneMapped: false });
    const sph = new THREE.SphereGeometry(1, 16, 12);
    this.cursor = new THREE.Mesh(sph, this.cursorMats.surface);
    this.cursor.renderOrder = 1000;
    this.cursor.visible = false;
    this.group.add(this.cursor);
    const g = new LineGeometry();
    g.setPositions([0, 0, 0, 0, 0, 0]);
    this.preview = new Line2(g, this.prevMat);
    this.preview.renderOrder = 999;
    this.preview.visible = false;
    this.group.add(this.preview);
    this.previewLabel = this.makeLabel('', true);
    this.previewLabel.visible = false;
    this.group.add(this.previewLabel);
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Shift') this.shift = true;
      if (e.key === 'Escape') this.cancel();
    });
    window.addEventListener('keyup', (e) => {
      if (e.key === 'Shift') this.shift = false;
    });
  }

  setResolution(w: number, h: number) {
    this.lineMat.resolution.set(w, h);
    this.prevMat.resolution.set(w, h);
  }

  setActive(on: boolean) {
    this.active = on;
    if (!on) this.cancel();
    this.cursor.visible = false;
  }

  cancel() {
    this.start = null;
    this.preview.visible = false;
    this.previewLabel.visible = false;
  }

  clear() {
    for (const m of this.list) {
      this.group.remove(m.line, m.label, ...m.ends);
      m.line.geometry.dispose();
      m.label.element.remove();
    }
    this.list = [];
    this.cancel();
    this.onChange?.();
  }

  undo() {
    const m = this.list.pop();
    if (!m) return;
    this.group.remove(m.line, m.label, ...m.ends);
    m.label.element.remove();
    this.onChange?.();
  }

  count() {
    return this.list.length;
  }

  refreshUnits() {
    for (const m of this.list) m.label.element.querySelector('.v')!.textContent = fmtLen(m.a.distanceTo(m.b), this.units);
  }

  private makeLabel(text: string, preview = false) {
    const el = document.createElement('div');
    el.className = 'measure-label' + (preview ? ' preview' : '');
    el.innerHTML = `<span class="v">${text}</span>`;
    const o = new CSS2DObject(el);
    o.center.set(0.5, 1.3);
    return o;
  }

  /** returns snapped world point under ndc */
  private pick(ndc: THREE.Vector2): { p: THREE.Vector3; kind: 'surface' | 'edge' | 'vertex' } | null {
    this.ray.setFromCamera(ndc, this.camera);
    const hit = this.ray.intersectObjects(this.targets(), false)[0];
    if (!hit || !hit.face) return null;
    const mesh = hit.object as THREE.Mesh;
    const pos = mesh.geometry.getAttribute('position') as THREE.BufferAttribute;
    const vs = [hit.face.a, hit.face.b, hit.face.c].map((i) => new THREE.Vector3().fromBufferAttribute(pos, i).applyMatrix4(mesh.matrixWorld));
    const dist = hit.distance;
    const snap = THREE.MathUtils.clamp(dist * 0.018, 0.02, 0.3);
    let best: THREE.Vector3 | null = null, bd = Infinity;
    for (const v of vs) {
      const d = v.distanceTo(hit.point);
      if (d < bd) { bd = d; best = v; }
    }
    if (best && bd < snap) return { p: best.clone(), kind: 'vertex' };
    const line = new THREE.Line3();
    let eb: THREE.Vector3 | null = null, ed = Infinity;
    for (let i = 0; i < 3; i++) {
      const a = vs[i], b = vs[(i + 1) % 3];
      const dir = b.clone().sub(a).normalize();
      // skip triangle diagonals (quads are split in two) – only snap to axis aligned edges
      if (Math.max(Math.abs(dir.x), Math.abs(dir.y), Math.abs(dir.z)) < 0.985) continue;
      line.set(a, b);
      const c = line.closestPointToPoint(hit.point, true, new THREE.Vector3());
      const d = c.distanceTo(hit.point);
      if (d < ed) { ed = d; eb = c; }
    }
    if (eb && ed < snap * 0.6) {
      return { p: eb, kind: 'edge' };
    }
    return { p: hit.point.clone(), kind: 'surface' };
  }

  private constrain(p: THREE.Vector3): THREE.Vector3 {
    if (!this.start || !this.shift) return p;
    const d = p.clone().sub(this.start);
    const ax = Math.abs(d.x), ay = Math.abs(d.y), az = Math.abs(d.z);
    if (ax >= ay && ax >= az) return new THREE.Vector3(p.x, this.start.y, this.start.z);
    if (ay >= az) return new THREE.Vector3(this.start.x, p.y, this.start.z);
    return new THREE.Vector3(this.start.x, this.start.y, p.z);
  }

  hover(ndc: THREE.Vector2) {
    if (!this.active) return;
    const r = this.pick(ndc);
    if (!r) {
      this.cursor.visible = false;
      return;
    }
    const p = this.constrain(r.p);
    this.cursor.visible = true;
    this.cursor.position.copy(p);
    this.cursor.material = this.cursorMats[this.start && this.shift ? 'surface' : r.kind];
    const s = THREE.MathUtils.clamp(this.camera.position.distanceTo(p) * 0.006, 0.008, 0.12);
    this.cursor.scale.setScalar(s);
    if (this.start) {
      (this.preview.geometry as LineGeometry).setPositions([this.start.x, this.start.y, this.start.z, p.x, p.y, p.z]);
      this.preview.computeLineDistances();
      this.preview.visible = true;
      this.previewLabel.position.copy(this.start).lerp(p, 0.5);
      this.previewLabel.element.querySelector('.v')!.textContent = fmtLen(this.start.distanceTo(p), this.units);
      this.previewLabel.visible = true;
    }
  }

  click(ndc: THREE.Vector2) {
    if (!this.active) return;
    const r = this.pick(ndc);
    if (!r) return;
    const p = this.constrain(r.p);
    if (!this.start) {
      this.start = p;
      return;
    }
    this.addMeasurement(this.start, p);
    this.cancel();
  }

  addMeasurement(a: THREE.Vector3, b: THREE.Vector3) {
    const g = new LineGeometry();
    g.setPositions([a.x, a.y, a.z, b.x, b.y, b.z]);
    const line = new Line2(g, this.lineMat);
    line.renderOrder = 998;
    const ends = [a, b].map((p) => {
      const m = new THREE.Mesh(this.cursor.geometry, this.endMat);
      m.position.copy(p);
      m.renderOrder = 1000;
      m.userData.dynamicScale = true;
      return m;
    });
    const label = this.makeLabel(fmtLen(a.distanceTo(b), this.units));
    label.position.copy(a).lerp(b, 0.5);
    const d = b.clone().sub(a);
    label.element.title = `Δx ${Math.abs(d.x).toFixed(3)} m · Δy ${Math.abs(d.y).toFixed(3)} m · Δz ${Math.abs(d.z).toFixed(3)} m`;
    this.group.add(line, label, ...ends);
    this.list.push({ a: a.clone(), b: b.clone(), line, ends, label });
    this.onChange?.();
  }

  /** keep endpoint spheres a constant screen size */
  update() {
    for (const m of this.list) for (const e of m.ends) e.scale.setScalar(THREE.MathUtils.clamp(this.camera.position.distanceTo(e.position) * 0.005, 0.006, 0.1));
  }
}
