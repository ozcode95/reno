import * as THREE from 'three';
import { ROOMS, type RoomInfo } from '../config';
import { canvasToTexture } from '../builder/textures';
import { fmtLen, type Units } from './measure';

const INK = '#1d2a36';

function labelTexture(room: RoomInfo, units: Units) {
  const w = room.x1 - room.x0, d = room.z1 - room.z0;
  const area = w * d;
  const c = document.createElement('canvas');
  c.width = 640;
  c.height = 300;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = 'rgba(255,255,255,0.86)';
  ctx.beginPath();
  ctx.roundRect(6, 6, c.width - 12, c.height - 12, 26);
  ctx.fill();
  ctx.strokeStyle = 'rgba(29,42,54,0.35)';
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.textAlign = 'center';
  ctx.fillStyle = INK;
  ctx.font = '700 58px "Segoe UI", Roboto, Arial, sans-serif';
  ctx.fillText(room.name.toUpperCase(), c.width / 2, 78);
  ctx.font = 'italic 500 32px "Segoe UI", Roboto, Arial, sans-serif';
  ctx.fillStyle = '#5b6b78';
  ctx.fillText(room.malay, c.width / 2, 122);
  ctx.fillStyle = INK;
  ctx.font = '600 50px "Segoe UI", Roboto, Arial, sans-serif';
  const dims = units === 'imperial' ? `${fmtLen(w, 'imperial')} × ${fmtLen(d, 'imperial')}` : `${w.toFixed(2)} m × ${d.toFixed(2)} m`;
  ctx.fillText(dims, c.width / 2, 192);
  ctx.font = '500 38px "Segoe UI", Roboto, Arial, sans-serif';
  ctx.fillStyle = '#34495e';
  ctx.fillText(`${area.toFixed(1)} m²  ·  ${(area * 10.7639).toFixed(0)} sq ft`, c.width / 2, 250);
  return canvasToTexture(c);
}

function textTexture(text: string) {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 96;
  const ctx = c.getContext('2d')!;
  ctx.font = '700 54px "Segoe UI", Roboto, Arial, sans-serif';
  const tw = ctx.measureText(text).width + 36;
  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  ctx.beginPath();
  ctx.roundRect((c.width - tw) / 2, 10, tw, 76, 18);
  ctx.fill();
  ctx.fillStyle = INK;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, c.width / 2, 50);
  return canvasToTexture(c);
}

export class Annotations {
  groups: Record<'gf' | 'ff' | 'site', THREE.Group> = { gf: new THREE.Group(), ff: new THREE.Group(), site: new THREE.Group() };
  root = new THREE.Group();
  private inkMat = new THREE.MeshBasicMaterial({ color: INK, toneMapped: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
  units: Units = 'metric';
  private arrowGeo = (() => {
    const s = new THREE.Shape([new THREE.Vector2(0, 0), new THREE.Vector2(-0.15, 0.05), new THREE.Vector2(-0.15, -0.05)]);
    const g = new THREE.ShapeGeometry(s);
    g.rotateX(-Math.PI / 2);
    return g;
  })();

  constructor() {
    this.root.name = 'annotations';
    this.root.userData.noAO = true;
    for (const g of Object.values(this.groups)) this.root.add(g);
    this.rebuild();
  }

  rebuild() {
    for (const g of Object.values(this.groups)) {
      for (const c of [...g.children]) {
        g.remove(c);
        const m = c as THREE.Mesh;
        if (m.geometry && m.geometry !== this.arrowGeo) m.geometry.dispose();
        const mat = m.material as THREE.MeshBasicMaterial;
        if (mat && mat !== this.inkMat) {
          mat.map?.dispose();
          mat.dispose();
        }
      }
    }
    for (const r of ROOMS) this.addRoom(r);
  }

  private flat(tex: THREE.Texture, w: number, h: number, x: number, y: number, z: number, rotZ = 0) {
    const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, toneMapped: false, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4 });
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    m.rotation.set(-Math.PI / 2, 0, rotZ, 'XYZ');
    m.position.set(x, y, z);
    m.renderOrder = 10;
    return m;
  }

  private dimLine(g: THREE.Group, a: THREE.Vector3, b: THREE.Vector3) {
    const len = a.distanceTo(b);
    const dir = b.clone().sub(a).normalize();
    const mid = a.clone().lerp(b, 0.5);
    const alongX = Math.abs(dir.x) > 0.5;
    const t = 0.012;
    const bar = new THREE.Mesh(new THREE.BoxGeometry(alongX ? len : t, 0.002, alongX ? t : len), this.inkMat);
    bar.position.copy(mid);
    g.add(bar);
    for (const p of [a, b]) {
      const tick = new THREE.Mesh(new THREE.BoxGeometry(alongX ? t : 0.22, 0.002, alongX ? 0.22 : t), this.inkMat);
      tick.position.copy(p);
      g.add(tick);
      const outward = p === a ? dir.clone().negate() : dir.clone();
      const arrow = new THREE.Mesh(this.arrowGeo, this.inkMat);
      arrow.position.copy(p);
      arrow.rotation.y = Math.atan2(-outward.z, outward.x);
      g.add(arrow);
    }
    const tex = textTexture(fmtLen(len, this.units === 'both' ? 'metric' : this.units));
    const lbl = this.flat(tex, 1.1, 0.206, mid.x, mid.y + 0.001, mid.z, alongX ? 0 : Math.PI / 2);
    g.add(lbl);
  }

  private addRoom(r: RoomInfo) {
    const g = this.groups[r.level];
    const w = r.x1 - r.x0, d = r.z1 - r.z0;
    const y = r.y + 0.012;
    const cx = (r.x0 + r.x1) / 2 + (r.labelOffset?.[0] ?? 0);
    const cz = (r.z0 + r.z1) / 2 + (r.labelOffset?.[1] ?? 0);
    const lw = Math.min(2.1, w * 0.8);
    const tex = labelTexture(r, this.units);
    g.add(this.flat(tex, lw, lw * (300 / 640), cx, y, cz));
    const inset = Math.min(0.32, d * 0.12);
    this.dimLine(g, new THREE.Vector3(r.x0 + 0.02, y, r.z0 + inset), new THREE.Vector3(r.x1 - 0.02, y, r.z0 + inset));
    const insetX = Math.min(0.32, w * 0.12);
    this.dimLine(g, new THREE.Vector3(r.x0 + insetX, y, r.z0 + 0.02), new THREE.Vector3(r.x0 + insetX, y, r.z1 - 0.02));
  }
}
