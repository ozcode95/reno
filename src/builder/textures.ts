import * as THREE from 'three';

/* ------------------------------------------------------------------ */
/*  Seamless noise helpers                                             */
/* ------------------------------------------------------------------ */

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Periodic value-noise lattice (tiles over `period` cells). */
class Lattice {
  vals: Float32Array;
  constructor(public px: number, public py: number, rnd: () => number) {
    this.vals = new Float32Array(px * py);
    for (let i = 0; i < this.vals.length; i++) this.vals[i] = rnd();
  }
  sample(x: number, y: number) {
    const { px, py, vals } = this;
    const xf = Math.floor(x), yf = Math.floor(y);
    const tx = x - xf, ty = y - yf;
    const sx = tx * tx * (3 - 2 * tx), sy = ty * ty * (3 - 2 * ty);
    const x0 = ((xf % px) + px) % px, y0 = ((yf % py) + py) % py;
    const x1 = (x0 + 1) % px, y1 = (y0 + 1) % py;
    const a = vals[y0 * px + x0], b = vals[y0 * px + x1];
    const c = vals[y1 * px + x0], d = vals[y1 * px + x1];
    return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy;
  }
}

/** Fractal noise over the unit square [0,1)², seamless. Returns ~[0,1]. */
export class Fbm {
  layers: Lattice[] = [];
  constructor(baseX: number, baseY: number, octaves: number, seed: number, public gain = 0.5) {
    const rnd = mulberry32(seed);
    for (let o = 0; o < octaves; o++) this.layers.push(new Lattice(baseX << o, baseY << o, rnd));
  }
  at(u: number, v: number) {
    let sum = 0, amp = 1, norm = 0;
    for (const l of this.layers) {
      sum += l.sample(u * l.px, v * l.py) * amp;
      norm += amp;
      amp *= this.gain;
    }
    return sum / norm;
  }
}

function hash2(i: number, j: number, seed: number) {
  let h = Math.imul(i, 374761393) + Math.imul(j, 668265263) + Math.imul(seed, 1442695041);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h = h ^ (h >>> 16);
  return (h >>> 0) / 4294967296;
}

/* ------------------------------------------------------------------ */
/*  Output helpers                                                     */
/* ------------------------------------------------------------------ */

export interface TexSet {
  map?: THREE.Texture;
  normalMap?: THREE.Texture;
  roughnessMap?: THREE.Texture;
  /** physical size (m) covered by one texture repeat */
  size: [number, number];
}

let maxAniso = 8;
export function setMaxAnisotropy(a: number) {
  maxAniso = Math.min(16, a);
}

function toTexture(canvas: HTMLCanvasElement, srgb: boolean): THREE.Texture {
  const t = new THREE.CanvasTexture(canvas);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  t.anisotropy = maxAniso;
  t.generateMipmaps = true;
  t.minFilter = THREE.LinearMipmapLinearFilter;
  t.needsUpdate = true;
  return t;
}

function canvasFrom(w: number, h: number, fill: (img: Uint8ClampedArray) => void) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d')!;
  const id = ctx.createImageData(w, h);
  fill(id.data);
  ctx.putImageData(id, 0, 0);
  return c;
}

/** Height field → tangent-space normal map (OpenGL convention, seamless). */
function normalFromHeight(h: Float32Array, w: number, hh: number, strength: number) {
  return canvasFrom(w, hh, (d) => {
    for (let y = 0; y < hh; y++) {
      const ym = (y - 1 + hh) % hh, yp = (y + 1) % hh;
      for (let x = 0; x < w; x++) {
        const xm = (x - 1 + w) % w, xp = (x + 1) % w;
        const dx = (h[y * w + xp] - h[y * w + xm]) * strength;
        const dy = (h[yp * w + x] - h[ym * w + x]) * strength;
        // canvas y goes down, texture v goes up (flipY) -> invert dy
        let nx = -dx, ny = dy, nz = 1;
        const l = Math.hypot(nx, ny, nz);
        nx /= l; ny /= l; nz /= l;
        const i = (y * w + x) * 4;
        d[i] = (nx * 0.5 + 0.5) * 255;
        d[i + 1] = (ny * 0.5 + 0.5) * 255;
        d[i + 2] = (nz * 0.5 + 0.5) * 255;
        d[i + 3] = 255;
      }
    }
  });
}

type RGB = [number, number, number];
export function hexRGB(hex: string): RGB {
  const v = parseInt(hex.replace('#', ''), 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

/* ------------------------------------------------------------------ */
/*  Ceramic / porcelain tiles                                          */
/* ------------------------------------------------------------------ */

export interface TileOpts {
  px: number;
  meters: [number, number];
  tile: [number, number];
  grout: number;
  base: string;
  grout_c: string;
  tileVar: number; // per tile brightness variation
  cloud: number; // in-tile mottling amplitude
  cloudScale: number;
  speckle?: number;
  roughTile: number;
  roughGrout: number;
  bevel: number;
  surfaceRelief?: number; // fine stone grain in the normal map, independent of the grout recess
  normalStrength: number;
  seed: number;
  stagger?: boolean;
}

export function tileTexture(o: TileOpts): TexSet {
  const W = o.px;
  const H = Math.round(o.px * (o.meters[1] / o.meters[0]));
  const base = hexRGB(o.base), gc = hexRGB(o.grout_c);
  const cloud = new Fbm(o.cloudScale, Math.round(o.cloudScale * (o.meters[1] / o.meters[0])), 5, o.seed);
  const fine = new Fbm(64, Math.round(64 * (o.meters[1] / o.meters[0])), 2, o.seed + 7);
  const height = new Float32Array(W * H);
  const rough = new Float32Array(W * H);
  const col = new Float32Array(W * H * 3);
  const mppx = o.meters[0] / W;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const mx = (x + 0.5) * mppx;
      const my = (y + 0.5) * mppx;
      let row = Math.floor(my / o.tile[1]);
      const shift = o.stagger && row % 2 ? o.tile[0] / 2 : 0;
      let lx = (mx + shift) % o.meters[0];
      const col_i = Math.floor(lx / o.tile[0]);
      lx = lx - col_i * o.tile[0];
      const ly = my - row * o.tile[1];
      const edge = Math.min(lx, o.tile[0] - lx, ly, o.tile[1] - ly);
      const i = y * W + x;
      const u = x / W, v = y / H;
      const g = o.grout / 2;
      if (edge < g) {
        height[i] = 0;
        rough[i] = o.roughGrout;
        const n = 0.92 + fine.at(u, v) * 0.16;
        col[i * 3] = gc[0] * n; col[i * 3 + 1] = gc[1] * n; col[i * 3 + 2] = gc[2] * n;
      } else {
        const b = Math.min(1, (edge - g) / Math.max(1e-4, o.bevel));
        height[i] = 0.35 + 0.65 * Math.sin((b * Math.PI) / 2);
        if (o.surfaceRelief) height[i] += (fine.at(u, v) - 0.5) * o.surfaceRelief;
        const tv = (hash2(col_i, row, o.seed) - 0.5) * 2 * o.tileVar;
        // each tile samples the cloud field with its own offset for natural variation
        const off = hash2(col_i + 17, row + 31, o.seed);
        const c = (cloud.at((u + off) % 1, (v + off * 0.7) % 1) - 0.5) * 2 * o.cloud;
        let s = 0;
        if (o.speckle) s = (fine.at(u, v) - 0.5) * o.speckle;
        const k = 1 + tv + c + s;
        col[i * 3] = base[0] * k; col[i * 3 + 1] = base[1] * k; col[i * 3 + 2] = base[2] * k;
        rough[i] = o.roughTile * (0.85 + 0.3 * cloud.at(u, v));
      }
    }
  }
  const map = canvasFrom(W, H, (d) => {
    for (let i = 0; i < W * H; i++) {
      d[i * 4] = col[i * 3]; d[i * 4 + 1] = col[i * 3 + 1]; d[i * 4 + 2] = col[i * 3 + 2]; d[i * 4 + 3] = 255;
    }
  });
  const rmap = canvasFrom(W, H, (d) => {
    for (let i = 0; i < W * H; i++) {
      const r = Math.max(0, Math.min(1, rough[i])) * 255;
      d[i * 4] = r; d[i * 4 + 1] = r; d[i * 4 + 2] = r; d[i * 4 + 3] = 255;
    }
  });
  const nmap = normalFromHeight(height, W, H, o.normalStrength);
  return { map: toTexture(map, true), roughnessMap: toTexture(rmap, false), normalMap: toTexture(nmap, false), size: o.meters };
}

/* ------------------------------------------------------------------ */
/*  Concrete interlocking roof tiles (Malaysian "Monier" style)        */
/* ------------------------------------------------------------------ */

export function roofTileTexture(px = 1024, seed = 11): TexSet {
  const cols = 4, rows = 4;
  const tw = 0.3, exposure = 0.33;
  const meters: [number, number] = [cols * tw, rows * exposure];
  const W = px, H = Math.round(px * (meters[1] / meters[0]));
  const base = hexRGB('#4a4f55');
  const grime = new Fbm(6, 7, 5, seed);
  const fine = new Fbm(96, 105, 2, seed + 3);
  const h = new Float32Array(W * H), col = new Float32Array(W * H * 3), rough = new Float32Array(W * H);
  for (let y = 0; y < H; y++) {
    // canvas y=0 is top of texture (v=1) -> up-slope. Convert to "up-slope distance" s.
    const s = (1 - (y + 0.5) / H) * meters[1];
    const row = Math.floor(s / exposure);
    const vs = s / exposure - row; // 0 at leading (bottom) edge, 1 at top
    for (let x = 0; x < W; x++) {
      const mx = ((x + 0.5) / W) * meters[0];
      const shift = row % 2 ? tw * 0.5 : 0;
      const lx = (mx + shift) % meters[0];
      const ci = Math.floor(lx / tw);
      const u = lx / tw - ci; // 0..1 across a tile
      // profile: broad pan + roll (double wave)
      const prof = 0.5 + 0.5 * Math.cos(u * Math.PI * 2 * 2) * 0.55 + (u < 0.1 || u > 0.9 ? -0.25 : 0);
      // tiles tilt: leading edge high, drop at the course line
      const tilt = (1 - vs) * 1.3;
      const lead = vs < 0.035 ? (vs / 0.035) * 0.3 + 0.7 : 1; // rounded nose
      const i = y * W + x;
      h[i] = (tilt + prof * 0.35) * lead;
      const tv = (hash2(ci + row * 13, row, seed) - 0.5) * 0.16;
      const gr = (grime.at(x / W, y / H) - 0.5) * 0.35;
      // shadow just above the leading edge of the course above (i.e. top of this tile)
      const shadow = vs > 0.9 ? 1 - (vs - 0.9) * 3.2 : 1;
      const ao = (0.8 + 0.2 * prof) * shadow;
      const k = (1 + tv + gr + (fine.at(x / W, y / H) - 0.5) * 0.12) * ao;
      col[i * 3] = base[0] * k; col[i * 3 + 1] = base[1] * k; col[i * 3 + 2] = base[2] * k * 1.02;
      rough[i] = 0.62 + gr * 0.4;
    }
  }
  const map = canvasFrom(W, H, (d) => {
    for (let i = 0; i < W * H; i++) { d[i * 4] = col[i * 3]; d[i * 4 + 1] = col[i * 3 + 1]; d[i * 4 + 2] = col[i * 3 + 2]; d[i * 4 + 3] = 255; }
  });
  const rmap = canvasFrom(W, H, (d) => {
    for (let i = 0; i < W * H; i++) { const r = Math.max(0, Math.min(1, rough[i])) * 255; d[i * 4] = r; d[i * 4 + 1] = r; d[i * 4 + 2] = r; d[i * 4 + 3] = 255; }
  });
  const nmap = normalFromHeight(h, W, H, 7.0);
  return { map: toTexture(map, true), roughnessMap: toTexture(rmap, false), normalMap: toTexture(nmap, false), size: meters };
}

/* ------------------------------------------------------------------ */
/*  Wood / laminate                                                    */
/* ------------------------------------------------------------------ */

export function woodTexture(o: { px: number; meters: [number, number]; base: string; dark: string; grooves?: number; grain: number; seed: number; rough: number }): TexSet {
  const W = o.px, H = Math.round(o.px * (o.meters[1] / o.meters[0]));
  const b = hexRGB(o.base), dk = hexRGB(o.dark);
  const grain = new Fbm(24, 2, 5, o.seed);
  const wob = new Fbm(3, 3, 3, o.seed + 1);
  const h = new Float32Array(W * H), col = new Float32Array(W * H * 3);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const u = x / W, v = y / H;
      const w = wob.at(u, v) * 0.08;
      let g = grain.at((u + w) % 1, v);
      g = Math.pow(Math.abs(Math.sin(g * Math.PI * 9)), 3) * o.grain;
      const i = y * W + x;
      let t = g;
      let hh = 1 - g * 0.1;
      if (o.grooves) {
        const gp = (u * o.meters[0]) / o.grooves;
        const f = gp - Math.floor(gp);
        if (f < 0.04) { hh = 0.2; t = Math.min(1, t + 0.5); }
      }
      h[i] = hh;
      col[i * 3] = b[0] + (dk[0] - b[0]) * t; col[i * 3 + 1] = b[1] + (dk[1] - b[1]) * t; col[i * 3 + 2] = b[2] + (dk[2] - b[2]) * t;
    }
  }
  const map = canvasFrom(W, H, (d) => {
    for (let i = 0; i < W * H; i++) { d[i * 4] = col[i * 3]; d[i * 4 + 1] = col[i * 3 + 1]; d[i * 4 + 2] = col[i * 3 + 2]; d[i * 4 + 3] = 255; }
  });
  const nmap = normalFromHeight(h, W, H, o.grooves ? 6 : 1.5);
  const rmap = canvasFrom(W, H, (d) => {
    for (let i = 0; i < W * H; i++) {
      // Open pores scatter highlights more than the sealed face of the timber.
      const r = Math.min(1, o.rough + (1 - h[i]) * 0.6) * 255;
      d[i * 4] = d[i * 4 + 1] = d[i * 4 + 2] = r;
      d[i * 4 + 3] = 255;
    }
  });
  return { map: toTexture(map, true), normalMap: toTexture(nmap, false), roughnessMap: toTexture(rmap, false), size: o.meters };
}

/** Plain woven cloth: alternating over/under yarns, with a 2 mm thread spacing. */
export function linenTexture(px = 512, seed = 81): TexSet {
  const threads = 32;
  const yarn = new Fbm(threads, threads, 2, seed);
  const height = new Float32Array(px * px);
  for (let y = 0; y < px; y++) for (let x = 0; x < px; x++) {
    const u = x / px * threads, v = y / px * threads;
    const warp = Math.sin((u % 1) * Math.PI);
    const weft = Math.sin((v % 1) * Math.PI);
    const over = (Math.floor(u) + Math.floor(v)) % 2 === 0;
    height[y * px + x] = (over ? warp * 0.75 + weft * 0.25 : weft * 0.75 + warp * 0.25)
      * (0.85 + yarn.at(x / px, y / px) * 0.15);
  }
  const grey = (base: number, variation: number) => toTexture(canvasFrom(px, px, (d) => {
    for (let i = 0; i < height.length; i++) {
      const value = base + height[i] * variation;
      d[i * 4] = d[i * 4 + 1] = d[i * 4 + 2] = value;
      d[i * 4 + 3] = 255;
    }
  }), false);
  const map = grey(225, 30);
  map.colorSpace = THREE.SRGBColorSpace;
  return {
    map,
    normalMap: toTexture(normalFromHeight(height, px, px, 1.1), false),
    roughnessMap: grey(235, -18),
    size: [0.064, 0.064],
  };
}

/** Honed limestone: quiet mineral clouds and fine pores at a physical metre scale. */
export function stoneTexture(px = 512, seed = 91): TexSet {
  const mineral = new Fbm(5, 5, 4, seed);
  const pores = new Fbm(96, 96, 2, seed + 1);
  const height = new Float32Array(px * px);
  const map = canvasFrom(px, px, (d) => {
    for (let y = 0; y < px; y++) for (let x = 0; x < px; x++) {
      const i = y * px + x;
      const cloud = mineral.at(x / px, y / px), pore = pores.at(x / px, y / px);
      height[i] = pore * 0.65 + cloud * 0.35;
      const value = 233 + cloud * 18 + pore * 4;
      d[i * 4] = value;
      d[i * 4 + 1] = value - 2;
      d[i * 4 + 2] = value - 5;
      d[i * 4 + 3] = 255;
    }
  });
  const rough = canvasFrom(px, px, (d) => {
    for (let i = 0; i < height.length; i++) {
      const r = (0.62 + height[i] * 0.16) * 255;
      d[i * 4] = d[i * 4 + 1] = d[i * 4 + 2] = r;
      d[i * 4 + 3] = 255;
    }
  });
  return {
    map: toTexture(map, true),
    normalMap: toTexture(normalFromHeight(height, px, px, 0.65), false),
    roughnessMap: toTexture(rough, false),
    size: [0.8, 0.8],
  };
}

/* ------------------------------------------------------------------ */
/*  Painted plaster (subtle roller texture) – normal only              */
/* ------------------------------------------------------------------ */

export function plasterTexture(px = 512, seed = 5, strength = 0.9): TexSet {
  const f = new Fbm(24, 24, 4, seed, 0.55);
  const g = new Fbm(3, 3, 3, seed + 9);
  const h = new Float32Array(px * px);
  for (let y = 0; y < px; y++) for (let x = 0; x < px; x++) h[y * px + x] = f.at(x / px, y / px) * 0.8 + g.at(x / px, y / px) * 0.2;
  const nmap = normalFromHeight(h, px, px, strength);
  const rmap = canvasFrom(px, px, (d) => {
    for (let i = 0; i < px * px; i++) { const r = (0.82 + (h[i] - 0.5) * 0.12) * 255; d[i * 4] = r; d[i * 4 + 1] = r; d[i * 4 + 2] = r; d[i * 4 + 3] = 255; }
  });
  return { normalMap: toTexture(nmap, false), roughnessMap: toTexture(rmap, false), size: [1.5, 1.5] };
}

/* ------------------------------------------------------------------ */
/*  Text on canvas (house number plate, labels)                        */
/* ------------------------------------------------------------------ */

export function textCanvas(lines: { text: string; size: number; weight?: string; color?: string }[], opts: { w: number; h: number; bg?: string; radius?: number; pad?: number; align?: CanvasTextAlign }) {
  const c = document.createElement('canvas');
  c.width = opts.w;
  c.height = opts.h;
  const ctx = c.getContext('2d')!;
  if (opts.bg) {
    ctx.fillStyle = opts.bg;
    const r = opts.radius ?? 0;
    ctx.beginPath();
    ctx.roundRect(0, 0, opts.w, opts.h, r);
    ctx.fill();
  }
  const total = lines.reduce((a, l) => a + l.size * 1.25, 0);
  let y = (opts.h - total) / 2;
  ctx.textAlign = opts.align ?? 'center';
  ctx.textBaseline = 'top';
  for (const l of lines) {
    ctx.font = `${l.weight ?? '600'} ${l.size}px "Segoe UI", Roboto, Helvetica, Arial, sans-serif`;
    ctx.fillStyle = l.color ?? '#222';
    ctx.fillText(l.text, opts.align === 'left' ? (opts.pad ?? 10) : opts.w / 2, y + l.size * 0.1);
    y += l.size * 1.25;
  }
  return c;
}

export function canvasToTexture(c: HTMLCanvasElement, srgb = true) {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  t.anisotropy = maxAniso;
  t.needsUpdate = true;
  return t;
}
