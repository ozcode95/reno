import * as THREE from 'three';
import { ShapeUtils, Vector2 } from 'three';

export type V3 = [number, number, number];
export type P2 = [number, number];

export interface FaceMats {
  px?: string;
  nx?: string;
  py?: string;
  ny?: string;
  pz?: string;
  nz?: string;
  rest?: string;
}
export type MatSpec = string | FaceMats;

interface Bucket {
  pos: number[];
  nor: number[];
  uv: number[];
}

const _v = new THREE.Vector3();
const _n = new THREE.Vector3();

function resolve(spec: MatSpec, face: keyof FaceMats): string {
  if (typeof spec === 'string') return spec;
  return (spec[face] ?? spec.rest ?? 'wallInt') as string;
}

/** Box projection UVs in world metres (textures define physical size through repeat). */
function boxUV(p: V3, n: V3): P2 {
  const ax = Math.abs(n[0]);
  const ay = Math.abs(n[1]);
  const az = Math.abs(n[2]);
  if (ay >= ax && ay >= az) return [p[0], n[1] > 0 ? -p[2] : p[2]];
  if (ax >= az) return [n[0] > 0 ? -p[2] : p[2], p[1]];
  return [n[2] > 0 ? p[0] : -p[0], p[1]];
}

function cross(a: V3, b: V3, c: V3): V3 {
  const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
  const vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
  return [uy * vz - uz * vy, uz * vx - ux * vz, ux * vy - uy * vx];
}
function norm(v: V3): V3 {
  const l = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / l, v[1] / l, v[2] / l];
}
function dot(a: V3, b: V3) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
function area2(poly: P2[]) {
  let a = 0;
  for (let i = 0; i < poly.length; i++) {
    const p = poly[i];
    const q = poly[(i + 1) % poly.length];
    a += p[0] * q[1] - q[0] * p[1];
  }
  return a;
}

/**
 * Geometry accumulator. Everything is added as triangles into buckets keyed by
 * (group, material). `build()` merges each bucket into a single mesh, which keeps
 * draw calls low while allowing hundreds of wall pieces / fixtures.
 */
export class Kit {
  private buckets = new Map<string, Map<string, Bucket>>();
  group = 'gf';
  remap: Record<string, string> = {};
  /** optional UV override (world position, world face normal, material) → UV in metres; null = box projection */
  uvFn: ((p: V3, n: V3, mat: string) => P2 | null) | null = null;
  private m = new THREE.Matrix4();
  private nm = new THREE.Matrix3();
  private identity = true;
  private flip = false;

  setTransform(m: THREE.Matrix4 | null) {
    if (!m) {
      this.identity = true;
      this.flip = false;
      this.m.identity();
      this.nm.identity();
      return;
    }
    this.identity = false;
    this.m.copy(m);
    this.nm.getNormalMatrix(m);
    this.flip = m.determinant() < 0;
  }

  private bucket(mat: string): Bucket {
    const key = this.remap[mat] ?? mat;
    let g = this.buckets.get(this.group);
    if (!g) {
      g = new Map();
      this.buckets.set(this.group, g);
    }
    let b = g.get(key);
    if (!b) {
      b = { pos: [], nor: [], uv: [] };
      g.set(key, b);
    }
    return b;
  }

  private tp(p: V3): V3 {
    if (this.identity) return p;
    _v.set(p[0], p[1], p[2]).applyMatrix4(this.m);
    return [_v.x, _v.y, _v.z];
  }
  private tn(n: V3): V3 {
    if (this.identity) return n;
    _n.set(n[0], n[1], n[2]).applyMatrix3(this.nm).normalize();
    return [_n.x, _n.y, _n.z];
  }

  /** Low level triangle (local coordinates). If uvs omitted, world box projection is used. */
  tri(a: V3, b: V3, c: V3, mat: string, na?: V3, nb?: V3, nc?: V3, uvs?: [P2, P2, P2]) {
    const P = [this.tp(a), this.tp(b), this.tp(c)];
    const fn = norm(cross(P[0], P[1], P[2]));
    const faceN: V3 = this.flip ? [-fn[0], -fn[1], -fn[2]] : fn;
    const N = [na ? this.tn(na) : faceN, nb ? this.tn(nb) : faceN, nc ? this.tn(nc) : faceN];
    const order = this.flip ? [0, 2, 1] : [0, 1, 2];
    const bk = this.bucket(mat);
    for (const i of order) {
      const p = P[i];
      const n = N[i];
      bk.pos.push(p[0], p[1], p[2]);
      bk.nor.push(n[0], n[1], n[2]);
      const uv = uvs ? uvs[i] : (this.uvFn?.(p, faceN, mat) ?? boxUV(p, faceN));
      bk.uv.push(uv[0], uv[1]);
    }
  }

  /** Planar quad a-b-c-d; orientation fixed to face `hint` direction if given. */
  quad(a: V3, b: V3, c: V3, d: V3, mat: string, hint?: V3, uvs?: [P2, P2, P2, P2]) {
    let n = norm(cross(a, b, c));
    if (hint && dot(n, hint) < 0) {
      [b, d] = [d, b];
      if (uvs) uvs = [uvs[0], uvs[3], uvs[2], uvs[1]];
      n = [-n[0], -n[1], -n[2]];
    }
    this.tri(a, b, c, mat, n, n, n, uvs ? [uvs[0], uvs[1], uvs[2]] : undefined);
    this.tri(a, c, d, mat, n, n, n, uvs ? [uvs[0], uvs[2], uvs[3]] : undefined);
  }

  /** Axis aligned box with per-face materials. `skip` lists faces to omit. */
  box(x0: number, x1: number, y0: number, y1: number, z0: number, z1: number, mats: MatSpec, skip: string = '') {
    if (x1 < x0) [x0, x1] = [x1, x0];
    if (y1 < y0) [y0, y1] = [y1, y0];
    if (z1 < z0) [z0, z1] = [z1, z0];
    if (x1 - x0 < 1e-5 || y1 - y0 < 1e-5 || z1 - z0 < 1e-5) return;
    const has = (f: string) => !skip.includes(f);
    if (has('px')) this.quad([x1, y0, z1], [x1, y0, z0], [x1, y1, z0], [x1, y1, z1], resolve(mats, 'px'), [1, 0, 0]);
    if (has('nx')) this.quad([x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0], resolve(mats, 'nx'), [-1, 0, 0]);
    if (has('py')) this.quad([x0, y1, z1], [x1, y1, z1], [x1, y1, z0], [x0, y1, z0], resolve(mats, 'py'), [0, 1, 0]);
    if (has('ny')) this.quad([x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1], resolve(mats, 'ny'), [0, -1, 0]);
    if (has('pz')) this.quad([x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1], resolve(mats, 'pz'), [0, 0, 1]);
    if (has('nz')) this.quad([x1, y0, z0], [x0, y0, z0], [x0, y1, z0], [x1, y1, z0], resolve(mats, 'nz'), [0, 0, -1]);
  }

  private capTris(poly: P2[]): number[][] {
    const contour = poly.map((p) => new Vector2(p[0], p[1]));
    return ShapeUtils.triangulateShape(contour, []);
  }

  /** Vertical prism, polygon in XZ. */
  prismXZ(poly: P2[], y0: number, y1: number, top: string, bottom: string, side: string | ((nx: number, nz: number, i: number) => string)) {
    const tris = this.capTris(poly);
    for (const t of tris) {
      const [a, b, c] = t.map((i) => poly[i]);
      const A: V3 = [a[0], y1, a[1]], B: V3 = [b[0], y1, b[1]], C: V3 = [c[0], y1, c[1]];
      let n = norm(cross(A, B, C));
      if (n[1] < 0) this.tri(A, C, B, top); else this.tri(A, B, C, top);
      const A0: V3 = [a[0], y0, a[1]], B0: V3 = [b[0], y0, b[1]], C0: V3 = [c[0], y0, c[1]];
      n = norm(cross(A0, B0, C0));
      if (n[1] > 0) this.tri(A0, C0, B0, bottom); else this.tri(A0, B0, C0, bottom);
    }
    const s = Math.sign(area2(poly));
    for (let i = 0; i < poly.length; i++) {
      const p = poly[i];
      const q = poly[(i + 1) % poly.length];
      const dx = q[0] - p[0], dz = q[1] - p[1];
      const l = Math.hypot(dx, dz);
      if (l < 1e-6) continue;
      const nx = (s > 0 ? dz : -dz) / l, nz = (s > 0 ? -dx : dx) / l;
      const mat = typeof side === 'string' ? side : side(nx, nz, i);
      this.quad([p[0], y0, p[1]], [q[0], y0, q[1]], [q[0], y1, q[1]], [p[0], y1, p[1]], mat, [nx, 0, nz]);
    }
  }

  /** Prism extruded along X, polygon in (z, y). */
  prismZY(poly: P2[], x0: number, x1: number, cap: string, edge: string | ((nz: number, ny: number, i: number) => string)) {
    const tris = this.capTris(poly);
    for (const t of tris) {
      const [a, b, c] = t.map((i) => poly[i]);
      this.oriented([x1, a[1], a[0]], [x1, b[1], b[0]], [x1, c[1], c[0]], cap, [1, 0, 0]);
      this.oriented([x0, a[1], a[0]], [x0, b[1], b[0]], [x0, c[1], c[0]], cap, [-1, 0, 0]);
    }
    const s = Math.sign(area2(poly));
    for (let i = 0; i < poly.length; i++) {
      const p = poly[i];
      const q = poly[(i + 1) % poly.length];
      const dz = q[0] - p[0], dy = q[1] - p[1];
      const l = Math.hypot(dz, dy);
      if (l < 1e-6) continue;
      const nz = (s > 0 ? dy : -dy) / l, ny = (s > 0 ? -dz : dz) / l;
      const mat = typeof edge === 'string' ? edge : edge(nz, ny, i);
      this.quad([x0, p[1], p[0]], [x1, p[1], p[0]], [x1, q[1], q[0]], [x0, q[1], q[0]], mat, [0, ny, nz]);
    }
  }

  /** Prism extruded along Z, polygon in (x, y). */
  prismXY(poly: P2[], z0: number, z1: number, cap: string, edge: string | ((nx: number, ny: number, i: number) => string)) {
    const tris = this.capTris(poly);
    for (const t of tris) {
      const [a, b, c] = t.map((i) => poly[i]);
      this.oriented([a[0], a[1], z1], [b[0], b[1], z1], [c[0], c[1], z1], cap, [0, 0, 1]);
      this.oriented([a[0], a[1], z0], [b[0], b[1], z0], [c[0], c[1], z0], cap, [0, 0, -1]);
    }
    const s = Math.sign(area2(poly));
    for (let i = 0; i < poly.length; i++) {
      const p = poly[i];
      const q = poly[(i + 1) % poly.length];
      const dx = q[0] - p[0], dy = q[1] - p[1];
      const l = Math.hypot(dx, dy);
      if (l < 1e-6) continue;
      const nx = (s > 0 ? dy : -dy) / l, ny = (s > 0 ? -dx : dx) / l;
      const mat = typeof edge === 'string' ? edge : edge(nx, ny, i);
      this.quad([p[0], p[1], z0], [q[0], q[1], z0], [q[0], q[1], z1], [p[0], p[1], z1], mat, [nx, ny, 0]);
    }
  }

  private oriented(a: V3, b: V3, c: V3, mat: string, want: V3) {
    const n = cross(a, b, c);
    if (dot(n, want) < 0) this.tri(a, c, b, mat);
    else this.tri(a, b, c, mat);
  }

  /** Add an arbitrary three.js geometry (optionally transformed). */
  geom(g: THREE.BufferGeometry, mat: string, matrix?: THREE.Matrix4, keepUV = false) {
    const src = g.index ? g.toNonIndexed() : g;
    if (!src.getAttribute('normal')) src.computeVertexNormals();
    const pos = src.getAttribute('position') as THREE.BufferAttribute;
    const nor = src.getAttribute('normal') as THREE.BufferAttribute;
    const uv = src.getAttribute('uv') as THREE.BufferAttribute | undefined;
    const nm = matrix ? new THREE.Matrix3().getNormalMatrix(matrix) : null;
    const flipLocal = matrix ? matrix.determinant() < 0 : false;
    const P: V3[] = [];
    const N: V3[] = [];
    const U: P2[] = [];
    for (let i = 0; i < pos.count; i++) {
      _v.fromBufferAttribute(pos, i);
      _n.fromBufferAttribute(nor, i);
      if (matrix) {
        _v.applyMatrix4(matrix);
        _n.applyMatrix3(nm!).normalize();
      }
      P.push([_v.x, _v.y, _v.z]);
      N.push([_n.x, _n.y, _n.z]);
      if (uv) U.push([uv.getX(i), uv.getY(i)]);
    }
    for (let i = 0; i + 2 < P.length; i += 3) {
      const ia = i, ib = flipLocal ? i + 2 : i + 1, ic = flipLocal ? i + 1 : i + 2;
      this.tri(P[ia], P[ib], P[ic], mat, N[ia], N[ib], N[ic], keepUV && uv ? [U[ia], U[ib], U[ic]] : undefined);
    }
    if (src !== g) src.dispose();
  }

  /** Oriented rectangular bar between two points (cross-section w × h, h in the "up" direction). */
  bar(a: THREE.Vector3, b: THREE.Vector3, w: number, h: number, mat: string) {
    const d = new THREE.Vector3().subVectors(b, a);
    const len = d.length();
    if (len < 1e-5) return;
    const xA = d.clone().normalize();
    let up = new THREE.Vector3(0, 1, 0);
    if (Math.abs(xA.y) > 0.99) up = new THREE.Vector3(1, 0, 0);
    const zA = new THREE.Vector3().crossVectors(xA, up).normalize();
    const yA = new THREE.Vector3().crossVectors(zA, xA).normalize();
    const m = new THREE.Matrix4().makeBasis(xA, yA, zA);
    m.setPosition(a.clone().add(b).multiplyScalar(0.5));
    const g = new THREE.BoxGeometry(len, h, w);
    this.geom(g, mat, m);
    g.dispose();
  }

  /** Cylinder between two points. */
  rod(a: THREE.Vector3, b: THREE.Vector3, r: number, mat: string, seg = 10) {
    const d = new THREE.Vector3().subVectors(b, a);
    const len = d.length();
    if (len < 1e-5) return;
    const g = new THREE.CylinderGeometry(r, r, len, seg, 1, false);
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().normalize());
    const m = new THREE.Matrix4().compose(a.clone().add(b).multiplyScalar(0.5), q, new THREE.Vector3(1, 1, 1));
    this.geom(g, mat, m);
    g.dispose();
  }

  groups(): string[] {
    return [...this.buckets.keys()];
  }

  build(getMat: (key: string) => THREE.Material, castShadow: (key: string) => boolean): Map<string, THREE.Group> {
    const out = new Map<string, THREE.Group>();
    for (const [gname, mats] of this.buckets) {
      const group = new THREE.Group();
      group.name = gname;
      for (const [mkey, b] of mats) {
        if (b.pos.length === 0) continue;
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.Float32BufferAttribute(b.pos, 3));
        geo.setAttribute('normal', new THREE.Float32BufferAttribute(b.nor, 3));
        geo.setAttribute('uv', new THREE.Float32BufferAttribute(b.uv, 2));
        geo.computeBoundingBox();
        geo.computeBoundingSphere();
        const mesh = new THREE.Mesh(geo, getMat(mkey));
        mesh.name = `${gname}:${mkey}`;
        mesh.castShadow = castShadow(mkey);
        mesh.receiveShadow = true;
        mesh.userData.matKey = mkey;
        mesh.matrixAutoUpdate = false;
        mesh.updateMatrix();
        group.add(mesh);
      }
      out.set(gname, group);
    }
    this.buckets.clear();
    return out;
  }
}
