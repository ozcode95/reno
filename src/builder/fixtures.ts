import * as THREE from 'three';
import type { Kit, V3 } from './kit';

export type Axis = 'x' | 'z';
export interface Opening {
  a: number;
  b: number;
  y0: number;
  y1: number;
}

/** local wall frame: s = along wall, n = offset along wall normal (from centre line) */
export function lp(axis: Axis, c: number, s: number, y: number, n: number): V3 {
  return axis === 'x' ? [s, y, c + n] : [c + n, y, s];
}
export function lbox(kit: Kit, axis: Axis, c: number, s0: number, s1: number, y0: number, y1: number, n0: number, n1: number, mat: string | Record<string, string>) {
  if (axis === 'x') kit.box(s0, s1, y0, y1, c + n0, c + n1, mat as never);
  else kit.box(c + n0, c + n1, y0, y1, s0, s1, mat as never);
}
function nvec(axis: Axis): [number, number] {
  return axis === 'x' ? [0, 1] : [1, 0];
}
function svec(axis: Axis): [number, number] {
  return axis === 'x' ? [1, 0] : [0, 1];
}

/**
 * Straight wall with rectangular openings.
 * axis 'x' → wall runs along X at z=c, `matPos` is the +Z face.
 * axis 'z' → wall runs along Z at x=c, `matPos` is the +X face.
 */
export function wall(
  kit: Kit, axis: Axis, c: number, a0: number, a1: number, y0: number, y1: number, t: number,
  matPos: string, matNeg: string, openings: Opening[] = [], reveal?: string,
) {
  const rv = reveal ?? matNeg;
  const faces = axis === 'x'
    ? { pz: matPos, nz: matNeg, px: rv, nx: rv, py: rv, ny: rv }
    : { px: matPos, nx: matNeg, pz: rv, nz: rv, py: rv, ny: rv };
  const seg = (s0: number, s1: number, b0: number, b1: number) => {
    if (s1 - s0 < 1e-4 || b1 - b0 < 1e-4) return;
    lbox(kit, axis, c, s0, s1, b0, b1, -t / 2, t / 2, faces);
  };
  const ops = [...openings].sort((p, q) => p.a - q.a);
  let cur = a0;
  for (const o of ops) {
    const oa = Math.max(a0, o.a), ob = Math.min(a1, o.b);
    if (ob <= oa) continue;
    seg(cur, oa, y0, y1);
    if (o.y0 > y0 + 1e-4) seg(oa, ob, y0, Math.min(o.y0, y1));
    if (o.y1 < y1 - 1e-4) seg(oa, ob, Math.max(o.y1, y0), y1);
    cur = ob;
  }
  seg(cur, a1, y0, y1);
}

/** Thin finish layer (tiles) on one face of a wall. side = +1 / -1 relative to wall normal, `face` = distance of wall face from centre */
export function skin(kit: Kit, axis: Axis, c: number, face: number, side: 1 | -1, a0: number, a1: number, y0: number, y1: number, mat: string, openings: Opening[] = []) {
  const t = 0.008;
  const cc = c + side * (face + t / 2);
  wall(kit, axis, cc, a0, a1, y0, y1, t, mat, mat, openings, mat);
}

/* ------------------------------------------------------------------ */
/*  Door frames & leaves                                               */
/* ------------------------------------------------------------------ */

export function doorFrame(kit: Kit, axis: Axis, c: number, t: number, a: number, b: number, y0: number, y1: number, mat = 'frameSage', transomAt?: number, f = 0.045) {
  const d = t / 2 + 0.012;
  lbox(kit, axis, c, a, a + f, y0, y1, -d, d, mat);
  lbox(kit, axis, c, b - f, b, y0, y1, -d, d, mat);
  lbox(kit, axis, c, a, b, y1 - f, y1, -d, d, mat);
  if (transomAt !== undefined) lbox(kit, axis, c, a + f, b - f, transomAt, transomAt + f, -d, d, mat);
  // stop rebate
  const st = f < 0.04 ? 0.008 : 0.012;
  lbox(kit, axis, c, a + f, a + f + st, y0, y1 - f, -0.015, 0.015, mat);
  lbox(kit, axis, c, b - f - st, b - f, y0, y1 - f, -0.015, 0.015, mat);
}

/** Surface-mounted single sliding leaf on the inside of a Z-aligned partition; no floor track. */
export function roomSlidingDoor(kit: Kit, c: number, a: number, b: number, direction: 1 | -1, mat: string): MovablePart {
  doorFrame(kit, 'z', c, 0.12, a, b, 0, 2.1, 'frameSage', undefined, 0.035);
  // Extend the jambs and head to the sliding leaf to close oblique sight lines
  // through the stand-off from the wall. Keep the opening free of a floor track.
  for (const [z0, z1] of [[a - 0.035, a + 0.025], [b - 0.025, b + 0.035]]) {
    kit.box(c - 0.12, c - 0.06, 0, 2.12, z0, z1, 'frameSage');
  }
  kit.box(c - 0.12, c - 0.06, 2.065, 2.13, a - 0.035, b + 0.035, 'frameSage');
  const travel = b - a + 0.05;
  const za = Math.min(a, a + direction * travel), zb = Math.max(b, b + direction * travel);
  kit.box(c - 0.14, c - 0.08, 2.12, 2.17, za - 0.04, zb + 0.04, 'aluSilver');
  return { kind: 'slide', index: 0, offset: [0, direction * travel], build: (k) => {
    k.box(c - 0.16, c - 0.12, 0.008, 2.11, a - 0.025, b + 0.025, mat);
    k.box(c - 0.155, c - 0.125, 0, 0.008, a - 0.025, b + 0.025, mat); // bottom privacy seal
    const handleZ = direction > 0 ? a + 0.09 : b - 0.09;
    for (const x of [c - 0.175, c - 0.105]) {
      k.box(x - 0.006, x + 0.006, 0.85, 1.1, handleZ - 0.015, handleZ + 0.015, 'chrome');
    }
  } };
}

export interface LeafOpts {
  hinge: [number, number];
  dir: [number, number]; // unit: hinge → latch (closed)
  swing: [number, number]; // unit: direction the leaf opens towards
  angle: number; // radians
  width: number;
  height: number;
  thick?: number;
  y0: number;
  mat: string;
  knob?: 'knob' | 'lever' | 'pull' | 'none';
  grooves?: boolean;
}

export function doorLeaf(kit: Kit, o: LeafOpts) {
  const th = o.thick ?? 0.04;
  const ca = Math.cos(o.angle), sa = Math.sin(o.angle);
  const d = new THREE.Vector3(o.dir[0] * ca + o.swing[0] * sa, 0, o.dir[1] * ca + o.swing[1] * sa).normalize();
  const tv = new THREE.Vector3(o.swing[0] * ca - o.dir[0] * sa, 0, o.swing[1] * ca - o.dir[1] * sa).normalize();
  const up = new THREE.Vector3(0, 1, 0);
  const center = new THREE.Vector3(o.hinge[0], o.y0 + o.height / 2, o.hinge[1]).addScaledVector(d, o.width / 2);
  const m = new THREE.Matrix4().makeBasis(d, up, tv).setPosition(center);
  const g = new THREE.BoxGeometry(o.width, o.height, th);
  kit.geom(g, o.mat, m);
  g.dispose();
  // hinges (3)
  for (const hy of [0.25, o.height / 2, o.height - 0.25]) {
    const hp = new THREE.Vector3(o.hinge[0], o.y0 + hy, o.hinge[1]);
    kit.rod(hp.clone().add(new THREE.Vector3(0, -0.05, 0)), hp.clone().add(new THREE.Vector3(0, 0.05, 0)), 0.008, 'stainless', 8);
  }
  const kind = o.knob ?? 'knob';
  if (kind === 'none') return;
  const latch = new THREE.Vector3(o.hinge[0], o.y0 + (kind === 'pull' ? 1.05 : 0.98), o.hinge[1]).addScaledVector(d, o.width - 0.065);
  for (const sgn of [1, -1]) {
    const face = latch.clone().addScaledVector(tv, sgn * (th / 2));
    const out = face.clone().addScaledVector(tv, sgn * 0.055);
    if (kind === 'knob') {
      kit.rod(face, face.clone().addScaledVector(tv, sgn * 0.012), 0.03, 'stainless', 16);
      kit.rod(face, out, 0.009, 'stainless', 8);
      const s = new THREE.SphereGeometry(0.029, 16, 12);
      s.scale(1, 1, 0.8);
      kit.geom(s, 'stainless', new THREE.Matrix4().makeBasis(d, up, tv).setPosition(out));
      s.dispose();
    } else if (kind === 'lever') {
      kit.rod(face, face.clone().addScaledVector(tv, sgn * 0.01), 0.025, 'stainless', 16);
      kit.rod(face, out, 0.009, 'stainless', 8);
      kit.bar(out, out.clone().addScaledVector(d, -0.12), 0.018, 0.012, 'stainless');
    } else if (kind === 'pull') {
      const a = face.clone().addScaledVector(tv, sgn * 0.05);
      kit.bar(a.clone().add(new THREE.Vector3(0, -0.3, 0)), a.clone().add(new THREE.Vector3(0, 0.3, 0)), 0.022, 0.022, 'stainless');
      kit.rod(face.clone().add(new THREE.Vector3(0, -0.25, 0)), a.clone().add(new THREE.Vector3(0, -0.25, 0)), 0.008, 'stainless', 8);
      kit.rod(face.clone().add(new THREE.Vector3(0, 0.25, 0)), a.clone().add(new THREE.Vector3(0, 0.25, 0)), 0.008, 'stainless', 8);
    }
  }
}

/** Convenience: a hinged door in an opening of a wall. hingeAtB → hinge at the larger coordinate end. openTo=+1 swings to +normal side */
export type HingedOpts = { hingeAtB: boolean; openTo: 1 | -1; angle: number; mat: string; knob?: LeafOpts['knob']; frame?: boolean; transom?: number; thick?: number; /** frame face width (default 45 mm) */ frameW?: number };

/** Frame of a hinged door + the leaf options (not built) – used for leaves that swing at runtime */
export function hingedDoorLeaf(kit: Kit, axis: Axis, c: number, t: number, a: number, b: number, y0: number, h: number, opt: HingedOpts): LeafOpts {
  const f = opt.frameW ?? 0.045;
  if (opt.frame !== false) doorFrame(kit, axis, c, t, a, b, y0, opt.transom ?? y0 + h + f, 'frameSage', opt.transom !== undefined ? y0 + h : undefined, f);
  const s = svec(axis), n = nvec(axis);
  const ha = opt.hingeAtB ? b - f - 0.004 : a + f + 0.004;
  const width = b - a - 2 * f - 0.008;
  const hingeP = lp(axis, c, ha, 0, 0);
  const dir: [number, number] = opt.hingeAtB ? [-s[0], -s[1]] : [s[0], s[1]];
  return {
    hinge: [hingeP[0], hingeP[2]], dir, swing: [n[0] * opt.openTo, n[1] * opt.openTo], angle: opt.angle,
    width, height: h - 0.01, y0: y0 + 0.008, mat: opt.mat, knob: opt.knob, thick: opt.thick,
  };
}

export function hingedDoor(kit: Kit, axis: Axis, c: number, t: number, a: number, b: number, y0: number, h: number, opt: HingedOpts) {
  doorLeaf(kit, hingedDoorLeaf(kit, axis, c, t, a, b, y0, h, opt));
}

/* ------------------------------------------------------------------ */
/*  Windows                                                            */
/* ------------------------------------------------------------------ */

/**
 * A part that can open at runtime. `build` emits it (world coordinates) in its closed position.
 * hinge: rotates about the vertical axis through `pivot` (x, z) by `angle` (rotation.y) when open.
 * slide: translates by `offset` (dx, dz) when open.
 */
export interface MovablePart {
  kind: 'hinge' | 'slide';
  build: (kit: Kit) => void;
  pivot?: [number, number];
  /** hinge axis: 'y' = vertical (default, side-hung); 'x' / 'z' = horizontal (top-hung) through pivotY */
  rotAxis?: 'x' | 'y' | 'z';
  pivotY?: number;
  angle?: number;
  offset?: [number, number];
  /**
   * staged sliders: parts sharing a `group` move together through `stages` (offset of this part at
   * stage 1…N; stage 0 = closed). Each click steps the group one stage open, then back closed again.
   */
  group?: string;
  stages?: [number, number][];
  open?: boolean;
  /** pane / panel index within its window or door */
  index: number;
}
export type MovableSink = (p: MovablePart) => void;

/** rotation.y sign that swings a leaf whose latch lies along `dir` (from the hinge) towards `swing` */
function swingSign(dir: [number, number], swing: [number, number]): 1 | -1 {
  return dir[1] * swing[0] - dir[0] * swing[1] >= 0 ? 1 : -1;
}

/**
 * Casement window. With `movable`, every sash (frame + glass + handle) is handed over as a hinged part
 * that opens outwards (the outside is the side of `nOff`); otherwise it is built fixed.
 * hung: 'side' (default) swings about a vertical jamb; 'top' (awning) is hinged at the head – the
 * bottom pushes out and up.
 */
export function casement(kit: Kit, axis: Axis, c: number, a: number, b: number, y0: number, y1: number, opt: { panes?: number; frame?: string; glass?: string; nOff?: number; movable?: MovableSink; openAngle?: number; open?: boolean[]; hung?: 'side' | 'top'; /** mirror the hinge side(s) */ flip?: boolean } = {}) {
  const panes = opt.panes ?? 2;
  const fm = opt.frame ?? 'aluWhite';
  const gm = opt.glass ?? 'glass';
  const n0 = opt.nOff ?? 0;
  const out = n0 < 0 ? -1 : 1;
  const f = 0.045, dd = 0.05;
  // outer frame
  lbox(kit, axis, c, a, a + f, y0, y1, n0 - dd, n0 + dd, fm);
  lbox(kit, axis, c, b - f, b, y0, y1, n0 - dd, n0 + dd, fm);
  lbox(kit, axis, c, a, b, y1 - f, y1, n0 - dd, n0 + dd, fm);
  lbox(kit, axis, c, a, b, y0, y0 + f, n0 - dd, n0 + dd, fm);
  const pw = (b - a - 2 * f) / panes;
  const s = svec(axis), n = nvec(axis);
  for (let i = 0; i < panes; i++) {
    const s0 = a + f + i * pw, s1 = s0 + pw;
    if (i > 0) lbox(kit, axis, c, s0 - 0.02, s0 + 0.02, y0 + f, y1 - f, n0 - dd, n0 + dd, fm);
    // sash
    const sf = 0.035, sd = 0.03;
    const q0 = s0 + (i > 0 ? 0.02 : 0), q1 = s1 - (i < panes - 1 ? 0.02 : 0);
    const hingeAtB = (i > 0 && i === panes - 1) !== !!opt.flip; // pairs open from the middle; flip mirrors
    const sash = (k: Kit) => {
      lbox(k, axis, c, q0, q0 + sf, y0 + f, y1 - f, n0 - sd, n0 + sd, fm);
      lbox(k, axis, c, q1 - sf, q1, y0 + f, y1 - f, n0 - sd, n0 + sd, fm);
      lbox(k, axis, c, q0, q1, y1 - f - sf, y1 - f, n0 - sd, n0 + sd, fm);
      lbox(k, axis, c, q0, q1, y0 + f, y0 + f + sf, n0 - sd, n0 + sd, fm);
      lbox(k, axis, c, q0 + sf, q1 - sf, y0 + f + sf, y1 - f - sf, n0 - 0.003, n0 + 0.003, gm);
      // handle (inside face): on the latch jamb, or on the bottom rail of a top-hung sash
      const inN = -out;
      const hn0 = Math.min(n0 + inN * sd, n0 + inN * (sd + 0.03)), hn1 = Math.max(n0 + inN * sd, n0 + inN * (sd + 0.03));
      if (opt.hung === 'top') {
        const hm = (q0 + q1) / 2, hy = y0 + f + sf / 2;
        lbox(k, axis, c, hm - 0.05, hm + 0.05, hy - 0.008, hy + 0.008, hn0, hn1, 'chrome');
      } else {
        const hs = hingeAtB ? q0 + sf / 2 : q1 - sf / 2;
        lbox(k, axis, c, hs - 0.008, hs + 0.008, (y0 + y1) / 2 - 0.05, (y0 + y1) / 2 + 0.05, hn0, hn1, 'chrome');
      }
    };
    if (!opt.movable) { sash(kit); continue; }
    if (opt.hung === 'top') {
      // hinge line along the head of the sash, on its outer face; the bottom swings out (and so up)
      const hp = lp(axis, c, (q0 + q1) / 2, y1 - f, n0 + out * sd);
      const a = opt.openAngle ?? (35 * Math.PI) / 180;
      // rotation about X moves a hanging point towards -Z for +a; about Z it moves towards +X
      const angle = axis === 'x' ? -out * a : out * a;
      opt.movable({ kind: 'hinge', build: sash, rotAxis: axis === 'x' ? 'x' : 'z', pivot: [hp[0], hp[2]], pivotY: hp[1], angle, open: opt.open?.[i] ?? false, index: i });
      continue;
    }
    const hp = lp(axis, c, hingeAtB ? q1 : q0, 0, n0 + out * sd);
    const dir: [number, number] = hingeAtB ? [-s[0], -s[1]] : [s[0], s[1]];
    const sw: [number, number] = [n[0] * out, n[1] * out];
    opt.movable({ kind: 'hinge', build: sash, pivot: [hp[0], hp[2]], angle: swingSign(dir, sw) * (opt.openAngle ?? (75 * Math.PI) / 180), open: opt.open?.[i] ?? false, index: i });
  }
}

/**
 * Aluminium sliding glass door. With `movable`, the sliding panels are handed over as slide parts.
 * 2 panels: each slides over the other. 3 panels (3 tracks): a staged group – 1st click the left
 * panel slides onto the middle one, 2nd click both slide onto the right one, then back step by step.
 */
export function slidingDoor(kit: Kit, axis: Axis, c: number, a: number, b: number, y0: number, y1: number, opt: { panels: number; openIndex?: number; openAmount?: number; glass?: string; frame?: string; nOff?: number; movable?: MovableSink; group?: string }) {
  const fm = opt.frame ?? 'aluSilver';
  const gm = opt.glass ?? 'glassTint';
  const n0 = opt.nOff ?? 0;
  const f = 0.05, dd = 0.06;
  lbox(kit, axis, c, a, a + f, y0, y1, n0 - dd, n0 + dd, fm);
  lbox(kit, axis, c, b - f, b, y0, y1, n0 - dd, n0 + dd, fm);
  lbox(kit, axis, c, a, b, y1 - f, y1, n0 - dd, n0 + dd, fm);
  lbox(kit, axis, c, a, b, y0, y0 + 0.02, n0 - dd, n0 + dd, fm);
  const n = opt.panels;
  const overlap = 0.04;
  const inner = b - a - 2 * f;
  const pw = (inner + overlap * (n - 1)) / n;
  const sv = svec(axis);
  for (let i = 0; i < n; i++) {
    let s0 = a + f + i * (pw - overlap);
    if (!opt.movable && opt.openIndex === i) s0 -= opt.openAmount ?? pw * 0.9;
    const s1 = s0 + pw;
    const tri = n === 3; // three tracks so all panels can stack on the right
    const track = tri ? n0 + (i - 1) * 0.038 : n0 + (i % 2 === 0 ? 0.022 : -0.022);
    const st = 0.045, rl = 0.06, pd = tri ? 0.016 : 0.018;
    const panel = (k: Kit) => {
      lbox(k, axis, c, s0, s0 + st, y0 + 0.02, y1 - f, track - pd, track + pd, fm);
      lbox(k, axis, c, s1 - st, s1, y0 + 0.02, y1 - f, track - pd, track + pd, fm);
      lbox(k, axis, c, s0, s1, y1 - f - rl, y1 - f, track - pd, track + pd, fm);
      lbox(k, axis, c, s0, s1, y0 + 0.02, y0 + 0.02 + rl, track - pd, track + pd, fm);
      lbox(k, axis, c, s0 + st, s1 - st, y0 + 0.02 + rl, y1 - f - rl, track - 0.003, track + 0.003, gm);
      // pull handle
      const hs = i === 0 ? s1 - st / 2 : s0 + st / 2;
      const side = tri ? (i === 0 ? -1 : 1) : i % 2 === 0 ? 1 : -1;
      const hd = tri && i === 1 ? 0.005 : 0.012; // the middle panel's pull must pass its neighbours
      const h0 = track + side * pd, h1 = track + side * (pd + hd);
      lbox(k, axis, c, hs - 0.01, hs + 0.01, y0 + 0.9, y0 + 1.15, Math.min(h0, h1), Math.max(h0, h1), 'black');
    };
    // travel of this panel along the wall (0 = fixed)
    const step = pw - overlap;
    const at = (d: number): [number, number] => [sv[0] * d, sv[1] * d];
    if (tri) {
      if (!opt.movable) { panel(kit); continue; }
      // the right panel never moves, but is part of the group so clicking it steps the door too
      const stages = i === 0 ? [at(step), at(2 * step)] : i === 1 ? [at(0), at(step)] : [at(0), at(0)];
      opt.movable({ kind: 'slide', build: panel, group: opt.group ?? 'slide3', stages, index: i });
      continue;
    }
    let travel = 0;
    if (n === 2) travel = (i === 0 ? 1 : -1) * step * 0.95;
    if (!opt.movable || travel === 0) { panel(kit); continue; }
    opt.movable({ kind: 'slide', build: panel, offset: at(travel), open: opt.openIndex === i, index: i });
  }
}

/**
 * Jalousie (louvre) window in a wall running along `axis`: aluminium frame with tilted frosted glass
 * blades. `nOff` = offset of the blade plane from the wall centre line; `out` = outside direction (±1).
 */
export function jalousie(kit: Kit, axis: Axis, c: number, a: number, b: number, y0: number, y1: number, opt: { nOff?: number; out?: 1 | -1; frame?: string; glass?: string; tilt?: number; pitch?: number } = {}) {
  const fm = opt.frame ?? 'aluWhite', gm = opt.glass ?? 'glassFrosted';
  const n0 = opt.nOff ?? 0, out = opt.out ?? 1;
  const f = 0.035, dd = 0.045;
  lbox(kit, axis, c, a, a + f, y0, y1, n0 - dd, n0 + dd, fm);
  lbox(kit, axis, c, b - f, b, y0, y1, n0 - dd, n0 + dd, fm);
  lbox(kit, axis, c, a, b, y1 - f, y1, n0 - dd, n0 + dd, fm);
  lbox(kit, axis, c, a, b, y0, y0 + f, n0 - dd, n0 + dd, fm);
  const pitch = opt.pitch ?? 0.075, depth = 0.095, tilt = opt.tilt ?? (28 * Math.PI) / 180;
  const n = Math.max(1, Math.floor((y1 - y0 - 2 * f) / pitch));
  const gap = (y1 - y0 - 2 * f - n * pitch) / 2;
  const len = b - a - 2 * f - 0.006;
  const sv = svec(axis), nv = nvec(axis);
  const S = new THREE.Vector3(sv[0], 0, sv[1]);
  const N = new THREE.Vector3(nv[0] * out, 0, nv[1] * out);
  for (let i = 0; i < n; i++) {
    const yc = y0 + f + gap + (i + 0.5) * pitch;
    const p = lp(axis, c, (a + b) / 2, yc, n0);
    // blade: long along S, thin, depth across N; outer edge tilted down so rain runs off outwards
    const up = new THREE.Vector3(0, 1, 0);
    const across = N.clone().multiplyScalar(Math.cos(tilt)).addScaledVector(up, -Math.sin(tilt));
    const normal = new THREE.Vector3().crossVectors(across, S).normalize();
    const m = new THREE.Matrix4().makeBasis(S, normal, across).setPosition(p[0], p[1], p[2]);
    const g = new THREE.BoxGeometry(len, 0.005, depth);
    kit.geom(g, gm, m);
    g.dispose();
    // blade clips on both jambs
    for (const s of [a + f, b - f - 0.012]) lbox(kit, axis, c, s, s + 0.012, yc - 0.02, yc + 0.02, n0 - 0.035, n0 + 0.035, fm);
  }
}

/** Exterior projecting surround (white trim) around an opening on the face at `face` (distance from centre), side ±1 */
export function surround(kit: Kit, axis: Axis, c: number, face: number, side: 1 | -1, a: number, b: number, y0: number, y1: number, opt: { w?: number; depth?: number; sill?: number; mat?: string } = {}) {
  const w = opt.w ?? 0.08, dp = opt.depth ?? 0.035, m = opt.mat ?? 'wallExt';
  const n0 = side * face, n1 = side * (face + dp);
  lbox(kit, axis, c, a - w, a, y0 - w, y1 + w, n0, n1, m);
  lbox(kit, axis, c, b, b + w, y0 - w, y1 + w, n0, n1, m);
  lbox(kit, axis, c, a, b, y1, y1 + w, n0, n1, m);
  lbox(kit, axis, c, a, b, y0 - w, y0, n0, n1, m);
  if (opt.sill) lbox(kit, axis, c, a - w - 0.03, b + w + 0.03, y0 - w - 0.04, y0 - w, n0, side * (face + opt.sill), m);
}

/* ------------------------------------------------------------------ */
/*  Railings                                                           */
/* ------------------------------------------------------------------ */

export interface RailOpts {
  height: number;
  spacing?: number;
  mat?: string;
  rails?: number[]; // extra horizontal rails (height above base line)
  balFrom?: number; // balusters start height above base line
  balTo?: number; // balusters end height (default = height)
  posts?: boolean;
  topW?: number;
  topH?: number;
}

export function railing(kit: Kit, pts: THREE.Vector3[], o: RailOpts) {
  const mat = o.mat ?? 'steelRail';
  const up = new THREE.Vector3(0, 1, 0);
  const sp = o.spacing ?? 0.115;
  const bf = o.balFrom ?? 0.1;
  const bt = o.balTo ?? o.height;
  for (let i = 0; i + 1 < pts.length; i++) {
    const A = pts[i], B = pts[i + 1];
    kit.bar(A.clone().addScaledVector(up, o.height), B.clone().addScaledVector(up, o.height), o.topW ?? 0.045, o.topH ?? 0.04, mat);
    for (const r of o.rails ?? [bf]) kit.bar(A.clone().addScaledVector(up, r), B.clone().addScaledVector(up, r), 0.03, 0.022, mat);
    const len = Math.hypot(B.x - A.x, B.z - A.z);
    const n = Math.max(1, Math.round(len / sp));
    for (let k = 1; k < n; k++) {
      const P = A.clone().lerp(B, k / n);
      kit.bar(P.clone().addScaledVector(up, bf), P.clone().addScaledVector(up, bt), 0.018, 0.018, mat);
    }
  }
  if (o.posts !== false) {
    for (const P of pts) kit.bar(P.clone().addScaledVector(up, -0.02), P.clone().addScaledVector(up, o.height + 0.03), 0.05, 0.05, mat);
  }
}

/* ------------------------------------------------------------------ */
/*  Sanitary ware & fittings                                           */
/* ------------------------------------------------------------------ */

function placed(x: number, y: number, z: number, rotY: number) {
  return new THREE.Matrix4().makeRotationY(rotY).setPosition(x, y, z);
}

/** WC facing direction rotY (0 = facing +Z). Back against wall. */
export function toilet(kit: Kit, x: number, y: number, z: number, rotY: number) {
  const M = placed(x, y, z, rotY);
  const at = (m: THREE.Matrix4) => new THREE.Matrix4().multiplyMatrices(M, m);
  // pedestal
  const ped = new THREE.CylinderGeometry(0.1, 0.13, 0.3, 24);
  kit.geom(ped, 'ceramic', at(new THREE.Matrix4().makeScale(1, 1, 1.35).setPosition(0, 0.15, 0.33)));
  // bowl (lathe)
  const prof = [
    new THREE.Vector2(0.0, 0.0), new THREE.Vector2(0.12, 0.0), new THREE.Vector2(0.17, 0.06), new THREE.Vector2(0.185, 0.12),
    new THREE.Vector2(0.18, 0.14), new THREE.Vector2(0.155, 0.13), new THREE.Vector2(0.13, 0.06), new THREE.Vector2(0.05, 0.02), new THREE.Vector2(0.0, 0.02),
  ];
  const bowl = new THREE.LatheGeometry(prof, 32);
  kit.geom(bowl, 'ceramic', at(new THREE.Matrix4().makeScale(1, 1, 1.3).setPosition(0, 0.26, 0.37)));
  // seat & lid
  const seat = new THREE.TorusGeometry(0.15, 0.025, 10, 32);
  kit.geom(seat, 'ceramic', at(new THREE.Matrix4().makeRotationX(Math.PI / 2).premultiply(new THREE.Matrix4().makeScale(1, 0.6, 1.3)).setPosition(0, 0.415, 0.38)));
  // cistern
  kit.geom(new THREE.BoxGeometry(0.38, 0.36, 0.17), 'ceramic', at(new THREE.Matrix4().setPosition(0, 0.6, 0.1)));
  kit.geom(new THREE.BoxGeometry(0.4, 0.03, 0.19), 'ceramic', at(new THREE.Matrix4().setPosition(0, 0.795, 0.1)));
  kit.geom(new THREE.CylinderGeometry(0.02, 0.02, 0.012, 16), 'chrome', at(new THREE.Matrix4().setPosition(0, 0.815, 0.1)));
  kit.geom(new THREE.BoxGeometry(0.12, 0.2, 0.12), 'ceramic', at(new THREE.Matrix4().setPosition(0, 0.36, 0.14)));
  // angle valve
  kit.geom(new THREE.CylinderGeometry(0.012, 0.012, 0.08, 8), 'chrome', at(new THREE.Matrix4().makeRotationZ(Math.PI / 2).setPosition(0.24, 0.2, 0.03)));
}

export function basin(kit: Kit, x: number, y: number, z: number, rotY: number) {
  const M = placed(x, y, z, rotY);
  const at = (m: THREE.Matrix4) => new THREE.Matrix4().multiplyMatrices(M, m);
  const prof = [
    new THREE.Vector2(0.0, -0.17), new THREE.Vector2(0.08, -0.168), new THREE.Vector2(0.15, -0.13), new THREE.Vector2(0.195, -0.05),
    new THREE.Vector2(0.21, 0.0), new THREE.Vector2(0.205, 0.015), new THREE.Vector2(0.185, 0.012), new THREE.Vector2(0.17, -0.03),
    new THREE.Vector2(0.13, -0.1), new THREE.Vector2(0.06, -0.125), new THREE.Vector2(0.0, -0.128),
  ];
  const g = new THREE.LatheGeometry(prof, 36);
  kit.geom(g, 'ceramic', at(new THREE.Matrix4().makeScale(1.2, 1, 0.95).setPosition(0, 0, 0.22)));
  kit.geom(new THREE.BoxGeometry(0.46, 0.05, 0.1), 'ceramic', at(new THREE.Matrix4().setPosition(0, -0.01, 0.05)));
  // tap
  kit.geom(new THREE.CylinderGeometry(0.018, 0.022, 0.1, 16), 'chrome', at(new THREE.Matrix4().setPosition(0, 0.06, 0.07)));
  kit.geom(new THREE.CylinderGeometry(0.009, 0.009, 0.1, 8), 'chrome', at(new THREE.Matrix4().makeRotationX(Math.PI / 2).setPosition(0, 0.1, 0.11)));
  kit.geom(new THREE.BoxGeometry(0.015, 0.012, 0.08), 'chrome', at(new THREE.Matrix4().setPosition(0, 0.125, 0.05)));
  // trap
  kit.geom(new THREE.CylinderGeometry(0.016, 0.016, 0.3, 10), 'chrome', at(new THREE.Matrix4().setPosition(0, -0.3, 0.2)));
  kit.geom(new THREE.CylinderGeometry(0.016, 0.016, 0.18, 10), 'chrome', at(new THREE.Matrix4().makeRotationX(Math.PI / 2).setPosition(0, -0.45, 0.11)));
}

export function shower(kit: Kit, x: number, y: number, z: number, rotY: number) {
  const M = placed(x, y, z, rotY);
  const at = (m: THREE.Matrix4) => new THREE.Matrix4().multiplyMatrices(M, m);
  // arm from wall + head
  kit.geom(new THREE.CylinderGeometry(0.01, 0.01, 0.3, 8), 'chrome', at(new THREE.Matrix4().makeRotationX(Math.PI / 2 - 0.35).setPosition(0, 2.0, 0.14)));
  kit.geom(new THREE.CylinderGeometry(0.05, 0.035, 0.03, 20), 'chrome', at(new THREE.Matrix4().makeRotationX(-0.4).setPosition(0, 1.95, 0.29)));
  // mixer
  kit.geom(new THREE.CylinderGeometry(0.035, 0.035, 0.02, 20), 'chrome', at(new THREE.Matrix4().makeRotationX(Math.PI / 2).setPosition(0, 1.05, 0.01)));
  kit.geom(new THREE.BoxGeometry(0.012, 0.012, 0.08), 'chrome', at(new THREE.Matrix4().setPosition(0, 1.05, 0.05)));
  // wall tap low
  kit.geom(new THREE.CylinderGeometry(0.012, 0.012, 0.06, 8), 'chrome', at(new THREE.Matrix4().makeRotationX(Math.PI / 2).setPosition(0.25, 0.55, 0.03)));
}

export function floorTrap(kit: Kit, x: number, y: number, z: number) {
  kit.box(x - 0.06, x + 0.06, y, y + 0.003, z - 0.06, z + 0.06, 'stainless');
}

/** small wall plate (switch / socket). normal = direction the plate faces */
export function plate(kit: Kit, x: number, y: number, z: number, normal: 'px' | 'nx' | 'pz' | 'nz', w = 0.086, h = 0.086, mat = 'plasticWhite') {
  const d = 0.012;
  switch (normal) {
    case 'px': kit.box(x, x + d, y - h / 2, y + h / 2, z - w / 2, z + w / 2, mat); break;
    case 'nx': kit.box(x - d, x, y - h / 2, y + h / 2, z - w / 2, z + w / 2, mat); break;
    case 'pz': kit.box(x - w / 2, x + w / 2, y - h / 2, y + h / 2, z, z + d, mat); break;
    case 'nz': kit.box(x - w / 2, x + w / 2, y - h / 2, y + h / 2, z - d, z, mat); break;
  }
}

/** Wall services, with local left/right defined while facing the plate. */
export function wallOutlet(kit: Kit, x: number, y: number, z: number,
  normal: 'pz' | 'nz' | 'px' | 'nx', kind: 'uk' | 'fibre' | 'tv' = 'uk') {
  const rotY = { pz: 0, px: Math.PI / 2, nz: Math.PI, nx: -Math.PI / 2 }[normal];
  const transform = new THREE.Matrix4().makeRotationY(rotY)
    .setPosition(x, y, z);
  const box = (w: number, h: number, d: number, dx: number, dy: number, dz: number, mat: string, tilt = 0) => {
    const geometry = new THREE.BoxGeometry(w, h, d);
    const local = new THREE.Matrix4().makeRotationX(tilt).setPosition(dx, dy, dz);
    kit.geom(geometry, mat, transform.clone().multiply(local));
    geometry.dispose();
  };
  box(0.086, 0.086, 0.012, 0, 0, 0.006, 'plasticWhite');
  if (kind === 'uk') {
    box(0.005, 0.009, 0.0005, 0, 0.0055, 0.01225, 'black');
    for (const dx of [-0.011, 0.011]) {
      box(0.009, 0.005, 0.0005, dx, -0.016, 0.01225, 'black');
    }
    box(0.014, 0.021, 0.008, 0.024, 0.024, 0.017, 'plasticWhite', 0.12);
  } else if (kind === 'fibre') {
    // Projecting termination box, lid seam and lower cable outlet.
    box(0.076, 0.074, 0.026, 0, 0, 0.025, 'plasticWhite');
    box(0.064, 0.001, 0.0005, 0, -0.019, 0.03825, 'plasticGrey');
    box(0.01, 0.005, 0.004, 0, -0.036, 0.027, 'plasticGrey');
  } else {
    const ring = new THREE.RingGeometry(0.003, 0.006, 24);
    kit.geom(ring, 'chrome', transform.clone().multiply(new THREE.Matrix4().makeTranslation(0, 0, 0.015)));
    ring.dispose();
    const hole = new THREE.CircleGeometry(0.003, 24);
    kit.geom(hole, 'black', transform.clone().multiply(new THREE.Matrix4().makeTranslation(0, 0, 0.0125)));
    hole.dispose();
  }
}

/** Galvanised swing gate leaf spanning x0..x1 at z (centre), from y0 up h */
export function gateLeaf(kit: Kit, x0: number, x1: number, z: number, y0: number, h: number, mat = 'galv') {
  const f = 0.05;
  kit.box(x0, x0 + f, y0, y0 + h, z - f / 2, z + f / 2, mat);
  kit.box(x1 - f, x1, y0, y0 + h, z - f / 2, z + f / 2, mat);
  kit.box(x0, x1, y0 + h - f, y0 + h, z - f / 2, z + f / 2, mat);
  kit.box(x0, x1, y0, y0 + f, z - f / 2, z + f / 2, mat);
  kit.box(x0, x1, y0 + h - 0.16, y0 + h - 0.13, z - 0.02, z + 0.02, mat);
  const n = Math.round((x1 - x0) / 0.105);
  for (let i = 1; i < n; i++) {
    const x = x0 + ((x1 - x0) * i) / n;
    kit.box(x - 0.0125, x + 0.0125, y0 + f, y0 + h - f, z - 0.0125, z + 0.0125, mat);
  }
}
