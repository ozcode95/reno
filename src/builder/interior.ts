import * as THREE from 'three';
import type { Kit } from './kit';
import { wallOutlet, plate } from './fixtures';
import {
  W, T_PARTY, T_INT, Y_FF, Y_FF_CEIL, Y_RENOVATED_GF_CEIL, Y_BATH1_CEIL, Z_STAIR_N, Z_LIVING_N, Z_MASTER_EXTENSION_FRONT, Z_LOT_REAR,
  Z_BATH_SPLIT, X_BATH_W, X_DOOR_A, X_DOOR_B, Y_PORCH, Z_RENOVATED_BED4_REAR,
  RISE, STAIR_TREADS, X_STAIR_W_STRIP, X_STAIR_TOP,
} from '../config';

/*
 * Interior design packages. They furnish the RENOVATED layout only (rear extension, enlarged
 * bedroom 4, open old kitchen, extended master bedroom), so they are built only with the renovation.
 * Besides geometry, a package lists its light fittings (see interiorLamps) – main.ts turns them into
 * real lights that switch on at dusk.
 */
export type InteriorStyle = 'none' | 'japanese';
export const INTERIOR_STYLES: { id: Exclude<InteriorStyle, 'none'>; label: string }[] = [
  { id: 'japanese', label: '日式简约风 · Japanese minimalist' },
];

/** a light fitting: world position, colour, luminous intensity (cd) when switched on */
export interface LampSpec {
  level: 'gf' | 'ff';
  pos: [number, number, number];
  color: string;
  intensity: number;
  distance: number;
  /** altar lamps (神台灯) burn day and night */
  always?: boolean;
}
const lamps: LampSpec[] = [];
/** light fittings of the interior built last */
export function interiorLamps(): LampSpec[] {
  return [...lamps];
}

// materials (registered in MaterialLib)
const OAK = 'jpOak', OAK_D = 'jpOakDark', LINEN = 'jpLinen', LINEN_G = 'jpLinenGrey', CUSHION = 'jpCushion';
const TATAMI = 'jpTatami', HERI = 'jpHeri', WASHI = 'jpWashi', RUG = 'jpRug', LED = 'jpLED';
const WHITE = 'plasticWhite', STEEL = 'stainless', SCREEN = 'glassDark';
/** warm white of paper-shaded lamps (≈ 2700 K) and of the LED fittings (≈ 3500 K) */
const WARM = '#ffd2a1', NEUTRAL = '#ffe6cc';

const hp = T_PARTY / 2, hi = T_INT / 2;
const XE = W - hp; // inner face of the east party wall
const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
/** rotation that makes a piece's front (local +z) face the given world direction */
const FACE = { pz: 0, px: Math.PI / 2, nz: Math.PI, nx: -Math.PI / 2 } as const;

/* ------------------------------------------------------------------ */
/*  Local frames: origin on the floor at the footprint centre,         */
/*  front of the piece towards local +z. Frames nest.                  */
/* ------------------------------------------------------------------ */
const stack: THREE.Matrix4[] = [];
function at(kit: Kit, x: number, y: number, z: number, rotY: number, build: () => void) {
  const local = new THREE.Matrix4().makeRotationY(rotY).setPosition(x, y, z);
  const world = stack.length ? stack[stack.length - 1].clone().multiply(local) : local;
  stack.push(world);
  kit.setTransform(world);
  try {
    build();
  } finally {
    stack.pop();
    kit.setTransform(stack[stack.length - 1] ?? null);
  }
}
function geom(kit: Kit, g: THREE.BufferGeometry, mat: string, x: number, y: number, z: number, sy = 1, rot?: THREE.Matrix4) {
  const m = new THREE.Matrix4().makeScale(1, sy, 1);
  if (rot) m.premultiply(rot);
  kit.geom(g, mat, m.setPosition(x, y, z));
  g.dispose();
}
/** registers a light fitting at a point of the current local frame */
function lamp(kit: Kit, x: number, y: number, z: number, intensity: number, o: { color?: string; distance?: number; always?: boolean } = {}) {
  const p = V(x, y, z);
  if (stack.length) p.applyMatrix4(stack[stack.length - 1]);
  lamps.push({
    level: kit.group === 'ff' ? 'ff' : 'gf', pos: [p.x, p.y, p.z],
    color: o.color ?? WARM, intensity, distance: o.distance ?? 6, always: o.always,
  });
}
/** textured rectangle facing local +z (plaques) */
function plaque(kit: Kit, x0: number, x1: number, y0: number, y1: number, z: number, mat: string) {
  kit.quad([x0, y0, z], [x1, y0, z], [x1, y1, z], [x0, y1, z], mat, [0, 0, 1], [[0, 0], [1, 0], [1, 1], [0, 1]]);
}

/* ------------------------------------------------------------------ */
/*  Furniture (local coordinates)                                      */
/* ------------------------------------------------------------------ */

/** vertical door joints + slim oak pulls on a front plane at local z = zf */
function doorFronts(kit: Kit, w: number, y0: number, y1: number, zf: number, doors: number, pullY: [number, number]) {
  for (let i = 1; i < doors; i++) {
    const x = -w / 2 + (i * w) / doors;
    kit.box(x - 0.003, x + 0.003, y0, y1, zf, zf + 0.002, OAK_D);
  }
  for (let i = 0; i < doors; i++) {
    const a = -w / 2 + (i * w) / doors, b = a + w / doors;
    const x = i % 2 === 0 ? b - 0.035 : a + 0.035; // pulls near the meeting edges of each pair
    kit.box(x - 0.006, x + 0.006, pullY[0], pullY[1], zf, zf + 0.016, OAK_D);
  }
}

/** low oak platform bed; head at local −z, nightstands with paper lamps either side of the head */
function bed(kit: Kit, w: number, l: number, withNightstands = true) {
  const x = w / 2, z = l / 2;
  kit.box(-x + 0.1, x - 0.1, 0, 0.1, -z + 0.1, z - 0.1, OAK_D); // recessed plinth: the bed seems to float
  kit.box(-x, x, 0.1, 0.28, -z, z, OAK);
  kit.box(-x + 0.05, x - 0.05, 0.28, 0.48, -z + 0.08, z - 0.05, LINEN); // mattress
  kit.box(-x + 0.03, x - 0.03, 0.34, 0.53, -z + 0.8, z - 0.03, LINEN_G); // duvet over the lower two thirds
  kit.box(-x + 0.02, x - 0.02, 0.52, 0.545, z - 0.55, z - 0.25, CUSHION); // bed runner
  const single = w < 1.2;
  const pw = single ? 0.62 : Math.min(0.62, w / 2 - 0.1);
  for (const px of single ? [0] : [-w / 4, w / 4]) kit.box(px - pw / 2, px + pw / 2, 0.48, 0.6, -z + 0.12, -z + 0.5, LINEN);
  kit.box(-x, x, 0.28, 0.95, -z, -z + 0.05, OAK); // low headboard
  // concealed warm LED strip behind the headboard washes the wall
  kit.box(-x + 0.05, x - 0.05, 0.93, 0.94, -z - 0.005, -z, LED);
  if (withNightstands) {
    for (const s of [-1, 1]) at(kit, s * (x + 0.25), 0, -z + 0.2, 0, () => nightstand(kit));
  }
  lamp(kit, 0, 1.25, -z + 0.45, withNightstands ? 0.6 : 0.2, { distance: 3.5 }); // bedside lamps + headboard glow
}

function nightstand(kit: Kit) {
  kit.box(-0.18, 0.18, 0, 0.06, -0.16, 0.16, OAK_D);
  kit.box(-0.21, 0.21, 0.06, 0.42, -0.2, 0.2, OAK);
  kit.box(-0.19, 0.19, 0.3, 0.304, 0.2, 0.202, OAK_D); // drawer joint
  kit.box(-0.05, 0.05, 0.42, 0.44, -0.05, 0.05, OAK_D); // lamp base
  kit.box(-0.08, 0.08, 0.44, 0.68, -0.08, 0.08, WASHI);
}

function wardrobe(kit: Kit, w: number, d = 0.6, h = 2.4) {
  kit.box(-w / 2 + 0.02, w / 2 - 0.02, 0, 0.08, -d / 2, d / 2 - 0.05, OAK_D);
  kit.box(-w / 2, w / 2, 0.08, h, -d / 2, d / 2, OAK);
  const doors = Math.max(2, Math.round(w / 0.5));
  doorFronts(kit, w, 0.09, h - 0.01, d / 2, doors, [0.9, 1.3]);
  kit.box(-w / 2 + 0.01, w / 2 - 0.01, h - 0.453, h - 0.447, d / 2, d / 2 + 0.002, OAK_D); // top cupboards
}

/** low sofa: oak frame and arms, linen cushions; back at local −z */
function sofa(kit: Kit, w: number, d = 0.9) {
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    const x = sx * (w / 2 - 0.1), z = sz * (d / 2 - 0.1);
    kit.box(x - 0.025, x + 0.025, 0, 0.1, z - 0.025, z + 0.025, OAK_D);
  }
  kit.box(-w / 2, w / 2, 0.1, 0.22, -d / 2, d / 2, OAK);
  for (const s of [-1, 1]) kit.box(s * w / 2, s * (w / 2 - 0.07), 0.22, 0.58, -d / 2, d / 2, OAK);
  kit.box(-w / 2 + 0.07, w / 2 - 0.07, 0.22, 0.5, -d / 2, -d / 2 + 0.03, OAK);
  const x0 = -w / 2 + 0.08, x1 = w / 2 - 0.08;
  const n = w > 2 ? 3 : 2, cw = (x1 - x0) / n;
  for (let i = 0; i < n; i++) {
    const a = x0 + i * cw + 0.005, b = a + cw - 0.01;
    kit.box(a, b, 0.22, 0.42, -d / 2 + 0.24, d / 2 - 0.02, LINEN_G); // seat
    kit.box(a, b, 0.22, 0.8, -d / 2 + 0.03, -d / 2 + 0.24, LINEN_G); // back
  }
  for (const s of [-1, 1]) kit.box(s * (w / 2 - 0.55), s * (w / 2 - 0.13), 0.42, 0.82, -d / 2 + 0.24, -d / 2 + 0.38, CUSHION);
}

/** oak table with square legs; optional lower shelf */
function table(kit: Kit, w: number, d: number, h: number, leg = 0.045, shelf = false) {
  kit.box(-w / 2, w / 2, h - 0.035, h, -d / 2, d / 2, OAK);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    const x = sx * (w / 2 - 0.06 - leg / 2), z = sz * (d / 2 - 0.06 - leg / 2);
    kit.box(x - leg / 2, x + leg / 2, 0, h - 0.035, z - leg / 2, z + leg / 2, OAK);
  }
  if (shelf) kit.box(-w / 2 + 0.08, w / 2 - 0.08, 0.1, 0.12, -d / 2 + 0.08, d / 2 - 0.08, OAK_D);
}

/** dining chair: oak frame, linen seat pad, board back at local −z */
function chair(kit: Kit) {
  const s = 0.21, t = 0.028;
  for (const x of [-s, s]) for (const z of [-s, s]) kit.box(x - t / 2, x + t / 2, 0, 0.43, z - t / 2, z + t / 2, OAK);
  kit.box(-s - 0.01, s + 0.01, 0.43, 0.46, -s - 0.01, s + 0.01, OAK);
  kit.box(-s + 0.01, s - 0.01, 0.46, 0.48, -s + 0.02, s, LINEN_G);
  for (const x of [-s, s]) kit.box(x - t / 2, x + t / 2, 0.46, 0.82, -s - t / 2, -s + t / 2, OAK);
  kit.box(-s, s, 0.64, 0.8, -s - 0.012, -s + 0.012, OAK);
}

/** floating TV console with a TV, soundbar and Wi-Fi router; back at local −z */
function tvConsole(kit: Kit, w: number, withSoundbar = true) {
  const d = 0.42, h = 0.42;
  kit.box(-w / 2 + 0.1, w / 2 - 0.1, 0, 0.14, -d / 2, d / 2 - 0.08, OAK_D);
  kit.box(-w / 2, w / 2, 0.14, h, -d / 2, d / 2, OAK);
  doorFronts(kit, w, 0.15, h - 0.01, d / 2, 4, [0.2, 0.36]);
  kit.box(-w / 2 + 0.1, w / 2 - 0.1, 0.135, 0.14, -d / 2 + 0.02, d / 2 - 0.1, LED); // under-glow
  const z = -0.06;
  kit.box(-0.22, 0.22, h, h + 0.012, z - 0.08, z + 0.1, 'black'); // stand
  kit.box(-0.035, 0.035, h, h + 0.1, z - 0.02, z, 'black');
  kit.box(-0.73, 0.73, h + 0.07, h + 0.91, z - 0.03, z, 'black'); // 65" TV
  kit.box(-0.72, 0.72, h + 0.08, h + 0.9, z, z + 0.002, SCREEN);
  if (withSoundbar) {
    kit.box(-0.45, 0.45, h, h + 0.065, 0.06, 0.15, 'black'); // soundbar
    kit.box(-0.44, 0.44, h + 0.008, h + 0.057, 0.15, 0.151, 'plasticGrey');
  }
  kit.box(w / 2 - 0.3, w / 2 - 0.08, h, h + 0.035, -0.12, 0.02, WHITE); // router
  kit.box(w / 2 - 0.1, w / 2 - 0.093, h + 0.012, h + 0.019, 0.02, 0.021, 'switchIndicatorRed');
}

/** floating genkan shoe cabinet with a key tray; back at local −z */
function shoeCabinet(kit: Kit, w: number) {
  const d = 0.36, y0 = 0.22, y1 = 0.98;
  kit.box(-w / 2, w / 2, y0, y1, -d / 2, d / 2, OAK);
  doorFronts(kit, w, y0 + 0.01, y1 - 0.01, d / 2, 3, [y0 + 0.08, y0 + 0.3]);
  kit.box(-w / 2 + 0.1, w / 2 - 0.1, y0 - 0.005, y0, -d / 2 + 0.03, d / 2 - 0.03, LED); // night light onto the floor
  kit.box(w / 2 - 0.4, w / 2 - 0.15, y1, y1 + 0.02, -0.08, 0.08, OAK_D); // key tray
}

/** low sideboard on slim legs; back at local −z */
function sideboard(kit: Kit, w: number, d = 0.45, h = 0.78) {
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    const x = sx * (w / 2 - 0.06), z = sz * (d / 2 - 0.06);
    kit.box(x - 0.02, x + 0.02, 0, 0.18, z - 0.02, z + 0.02, OAK_D);
  }
  kit.box(-w / 2, w / 2, 0.18, h, -d / 2, d / 2, OAK);
  doorFronts(kit, w, 0.19, h - 0.01, d / 2, 4, [0.3, 0.5]);
  // paper table lamp
  kit.box(-w / 2 + 0.2, -w / 2 + 0.34, h, h + 0.03, -0.07, 0.07, OAK_D);
  kit.rod(V(-w / 2 + 0.27, h + 0.03, 0), V(-w / 2 + 0.27, h + 0.2, 0), 0.008, OAK_D, 6);
  geom(kit, new THREE.CylinderGeometry(0.13, 0.15, 0.24, 24), WASHI, -w / 2 + 0.27, h + 0.32, 0);
  lamp(kit, -w / 2 + 0.27, h + 0.35, 0.25, 0.8, { distance: 4 });
}

/** paper floor lamp (andon) with a light inside */
function andon(kit: Kit, h = 0.62, intensity = 0.9) {
  for (const x of [-0.14, 0.14]) for (const z of [-0.14, 0.14]) kit.box(x - 0.012, x + 0.012, 0, h, z - 0.012, z + 0.012, OAK_D);
  kit.box(-0.13, 0.13, 0.1, h - 0.02, -0.13, 0.13, WASHI);
  for (const y of [0.09, h - 0.02]) kit.box(-0.15, 0.15, y, y + 0.02, -0.15, 0.15, OAK_D);
  lamp(kit, 0, h + 0.05, 0, intensity, { distance: 3.5 });
}

/** tatami platform: oak base, mats with dark cloth edges (heri) along their long sides; mats run along local z */
function tatamiPlatform(kit: Kit, w: number, d: number, h = 0.2) {
  kit.box(-w / 2 + 0.04, w / 2 - 0.04, 0, 0.06, -d / 2 + 0.04, d / 2 - 0.04, OAK_D);
  kit.box(-w / 2, w / 2, 0.06, h - 0.05, -d / 2, d / 2, OAK);
  kit.box(-w / 2 + 0.04, w / 2 - 0.04, 0.055, 0.06, d / 2 - 0.05, d / 2 - 0.04, LED); // toe-kick light line
  const mats = Math.max(1, Math.round(w / 0.9)), mw = w / mats;
  for (let i = 0; i < mats; i++) {
    const a = -w / 2 + i * mw, b = a + mw;
    kit.box(a + 0.003, b - 0.003, h - 0.05, h, -d / 2 + 0.003, d / 2 - 0.003, TATAMI);
    for (const x of [a + 0.003, b - 0.033]) kit.box(x, x + 0.03, h - 0.049, h + 0.0015, -d / 2 + 0.003, d / 2 - 0.003, HERI);
  }
}

function zabuton(kit: Kit) {
  kit.box(-0.27, 0.27, 0, 0.07, -0.29, 0.29, CUSHION);
}

/** oak desk with slab legs, paper desk lamp and a laptop; the user sits at local +z */
function desk(kit: Kit, w: number, d = 0.5) {
  const h = 0.74;
  kit.box(-w / 2, w / 2, h - 0.03, h, -d / 2, d / 2, OAK);
  for (const s of [-1, 1]) kit.box(s * (w / 2 - 0.03), s * w / 2, 0, h - 0.03, -d / 2 + 0.02, d / 2 - 0.02, OAK);
  kit.box(-w / 2 + 0.03, w / 2 - 0.03, 0.45, h - 0.03, -d / 2 + 0.02, -d / 2 + 0.04, OAK); // modesty panel
  kit.box(w / 2 - 0.3, w / 2 - 0.24, h, h + 0.02, -d / 2 + 0.08, -d / 2 + 0.14, OAK_D); // desk lamp
  kit.rod(V(w / 2 - 0.27, h + 0.02, -d / 2 + 0.11), V(w / 2 - 0.27, h + 0.38, -d / 2 + 0.11), 0.006, OAK_D, 6);
  kit.box(w / 2 - 0.36, w / 2 - 0.18, h + 0.3, h + 0.44, -d / 2 + 0.04, -d / 2 + 0.2, WASHI);
  // laptop, open
  kit.box(-0.2, 0.12, h, h + 0.015, -0.02, 0.2, 'aluSilver');
  kit.box(-0.2, 0.12, h, h + 0.22, -0.03, -0.02, 'aluSilver');
  kit.box(-0.19, 0.11, h + 0.015, h + 0.21, -0.02, -0.018, SCREEN);
}

/* ------------------------------------------------------------------ */
/*  Electrical appliances (local coordinates)                          */
/* ------------------------------------------------------------------ */

/** wall-mounted split air-conditioner: local z = 0 at the wall, origin at the bottom centre */
function airCon(kit: Kit) {
  kit.box(-0.44, 0.44, 0, 0.29, 0, 0.21, WHITE);
  kit.box(-0.42, 0.42, 0.25, 0.28, 0.211, 0.212, 'plasticGrey'); // top intake line
  kit.box(-0.4, 0.4, 0.02, 0.075, 0.18, 0.212, 'plasticGrey'); // outlet louvre
  kit.box(0.28, 0.32, 0.1, 0.108, 0.211, 0.213, LED); // display
}

/** French-door fridge-freezer; back at local −z */
function fridge(kit: Kit, w = 0.72, d = 0.68, h = 1.82) {
  for (const x of [-w / 2 + 0.06, w / 2 - 0.06]) for (const z of [-d / 2 + 0.06, d / 2 - 0.1]) kit.box(x - 0.02, x + 0.02, 0, 0.03, z - 0.02, z + 0.02, 'black');
  kit.box(-w / 2, w / 2, 0.03, h, -d / 2, d / 2 - 0.06, STEEL);
  const zf = d / 2 - 0.06;
  kit.box(-w / 2, -0.002, 0.8, h, zf, zf + 0.05, STEEL);
  kit.box(0.002, w / 2, 0.8, h, zf, zf + 0.05, STEEL);
  kit.box(-w / 2, w / 2, 0.03, 0.795, zf, zf + 0.05, STEEL); // freezer drawer
  for (const x of [-0.03, 0.03]) kit.box(x - 0.008, x + 0.008, 1.05, 1.6, zf + 0.05, zf + 0.075, 'black');
  kit.box(-0.25, 0.25, 0.68, 0.7, zf + 0.05, zf + 0.075, 'black');
  kit.box(-0.3, -0.18, 1.4, 1.48, zf + 0.05, zf + 0.052, SCREEN); // control panel
}

function microwave(kit: Kit) {
  kit.box(-0.25, 0.25, 0, 0.29, -0.19, 0.19, WHITE);
  kit.box(-0.23, 0.1, 0.04, 0.25, 0.19, 0.192, SCREEN);
  kit.box(0.13, 0.23, 0.04, 0.25, 0.19, 0.192, 'plasticGrey');
  geom(kit, new THREE.CylinderGeometry(0.02, 0.02, 0.012, 16), 'black', 0.18, 0.11, 0.196, 1, new THREE.Matrix4().makeRotationX(Math.PI / 2));
}

function riceCooker(kit: Kit) {
  geom(kit, new THREE.CylinderGeometry(0.13, 0.12, 0.2, 28), WHITE, 0, 0.1, 0);
  geom(kit, new THREE.SphereGeometry(0.13, 28, 10, 0, Math.PI * 2, 0, Math.PI / 2), WHITE, 0, 0.2, 0, 0.35);
  kit.box(-0.05, 0.05, 0.09, 0.14, 0.11, 0.128, SCREEN);
  kit.box(-0.06, 0.06, 0.24, 0.26, -0.015, 0.015, 'plasticGrey'); // handle
}

function kettle(kit: Kit) {
  geom(kit, new THREE.CylinderGeometry(0.1, 0.1, 0.02, 24), 'black', 0, 0.01, 0);
  geom(kit, new THREE.CylinderGeometry(0.07, 0.085, 0.2, 24), STEEL, 0, 0.12, 0);
  kit.box(-0.012, 0.012, 0.06, 0.2, -0.13, -0.08, 'black'); // handle
  kit.box(-0.01, 0.01, 0.17, 0.19, 0.07, 0.11, STEEL); // spout
}

function washingMachine(kit: Kit) {
  kit.box(-0.3, 0.3, 0, 0.85, -0.3, 0.3, WHITE);
  kit.box(-0.28, 0.28, 0.74, 0.82, 0.3, 0.302, 'plasticGrey');
  const rot = new THREE.Matrix4().makeRotationX(Math.PI / 2);
  geom(kit, new THREE.CylinderGeometry(0.21, 0.21, 0.02, 32), 'chrome', 0, 0.42, 0.31, 1, rot);
  geom(kit, new THREE.CylinderGeometry(0.17, 0.17, 0.024, 32), SCREEN, 0, 0.42, 0.312, 1, rot);
  geom(kit, new THREE.CylinderGeometry(0.03, 0.03, 0.02, 20), 'chrome', 0.18, 0.78, 0.31, 1, rot);
}

/** instant water heater above the shower mixer: local z = 0 at the wall */
function waterHeater(kit: Kit) {
  kit.box(-0.11, 0.11, 0, 0.34, 0, 0.085, WHITE);
  kit.box(-0.07, 0.07, 0.2, 0.26, 0.085, 0.087, SCREEN);
  kit.box(0.02, 0.05, 0.215, 0.23, 0.087, 0.088, 'switchIndicatorRed');
}

/* ------------------------------------------------------------------ */
/*  神台 – ancestral / deity altar facing the front door                */
/* ------------------------------------------------------------------ */

/**
 * Oak altar cabinet (local front +z, back against the wall at local z = −d/2):
 * the 地主 (earth-god) shrine sits in a floor niche of the base; the upper altar carries a porcelain
 * Guanyin before a red lacquer 佛光普照 panel, a pair of red 神台灯 lamps (lit day and night),
 * a brass incense burner, three tea cups and plates of mandarin oranges, under an oak canopy.
 */
function altar(kit: Kit) {
  const w = 1.4, d = 0.55, x = w / 2, zb = -d / 2, zf = d / 2;
  const top = 1.12;
  // --- base cabinet with the central floor niche
  kit.box(-x + 0.03, x - 0.03, 0, 0.06, zb, zf - 0.04, OAK_D);
  kit.box(-x, -0.27, 0.06, top, zb, zf, OAK);
  kit.box(0.27, x, 0.06, top, zb, zf, OAK);
  kit.box(-0.27, 0.27, 0.52, top, zb, zf, OAK);
  for (const s of [-1, 1]) {
    kit.box(s * 0.485 - 0.003, s * 0.485 + 0.003, 0.07, top - 0.01, zf, zf + 0.002, OAK_D); // door joints
    kit.box(s * 0.44 - 0.006, s * 0.44 + 0.006, 0.55, 0.75, zf, zf + 0.016, OAK_D);
  }
  kit.box(-0.26, 0.26, 0.9, 0.904, zf, zf + 0.002, OAK_D); // drawer joint
  // niche: lacquered lining, earth-god plaque, incense pot and two small red lamps
  kit.box(-0.27, 0.27, 0.0, 0.06, zb, zf, 'jpLacquer');
  kit.box(-0.27, 0.27, 0.06, 0.52, zb, zb + 0.08, 'jpLacquer');
  plaque(kit, -0.22, 0.22, 0.1, 0.49, zb + 0.081, 'jpTudiPlaque');
  geom(kit, new THREE.CylinderGeometry(0.055, 0.045, 0.07, 20), 'jpBrass', 0, 0.095, 0.02);
  for (const dx of [-0.02, 0.01, 0.03]) kit.rod(V(dx, 0.1, 0.02), V(dx * 1.5, 0.3, 0.02), 0.002, 'jpIncense', 4);
  for (const s of [-1, 1]) {
    kit.rod(V(s * 0.19, 0.06, -0.05), V(s * 0.19, 0.16, -0.05), 0.006, 'jpGold', 6);
    geom(kit, new THREE.CylinderGeometry(0.03, 0.04, 0.08, 16), 'jpAltarRed', s * 0.19, 0.2, -0.05);
  }

  // --- altar top, oak side wings, slatted back and canopy with a concealed downlight
  kit.box(-x - 0.05, x + 0.05, top, top + 0.05, zb, zf + 0.05, OAK);
  const y0 = top + 0.05, y1 = 2.62;
  kit.box(-x, x, y0, y1, zb, zb + 0.02, OAK_D);
  for (let sx = -x + 0.02; sx + 0.035 <= x - 0.02; sx += 0.07) {
    if (sx + 0.035 > -0.38 && sx < 0.38) continue; // behind the lacquer panel
    kit.box(sx, sx + 0.035, y0, y1, zb + 0.02, zb + 0.05, OAK);
  }
  for (const s of [-1, 1]) kit.box(s * x, s * (x + 0.05), top, y1 + 0.08, zb, 0.1, OAK);
  kit.box(-x - 0.05, x + 0.05, y1, y1 + 0.08, zb, 0.12, OAK);
  kit.box(-x + 0.05, x - 0.05, y1 - 0.005, y1, zb + 0.06, 0.08, LED);
  kit.box(-0.38, 0.38, 1.4, 2.4, zb + 0.02, zb + 0.05, 'jpLacquer');
  plaque(kit, -0.35, 0.35, 1.43, 2.37, zb + 0.051, 'jpAltarPlaque');

  // --- Guanyin statue (white porcelain) on a small dark stand
  const sz = -0.1;
  kit.box(-0.15, 0.15, y0, y0 + 0.08, sz - 0.12, sz + 0.12, OAK_D);
  const yb = y0 + 0.08;
  geom(kit, new THREE.CylinderGeometry(0.1, 0.11, 0.05, 28), 'jpGold', 0, yb + 0.025, sz); // lotus base
  const robe = [[0, 0], [0.085, 0], [0.08, 0.1], [0.065, 0.22], [0.05, 0.3], [0.03, 0.33], [0, 0.335]].map(([r, y]) => new THREE.Vector2(r, y));
  geom(kit, new THREE.LatheGeometry(robe, 28), 'ceramic', 0, yb + 0.05, sz);
  geom(kit, new THREE.SphereGeometry(0.035, 20, 14), 'ceramic', 0, yb + 0.41, sz, 1.1);
  geom(kit, new THREE.SphereGeometry(0.02, 14, 10), 'ceramic', 0, yb + 0.46, sz - 0.01);
  geom(kit, new THREE.TorusGeometry(0.075, 0.006, 8, 40), 'jpGold', 0, yb + 0.41, sz - 0.05); // halo
  // --- red altar lamps (神台灯), always lit
  for (const s of [-1, 1]) {
    const lx = s * 0.5;
    geom(kit, new THREE.CylinderGeometry(0.05, 0.06, 0.03, 20), 'jpGold', lx, y0 + 0.015, 0);
    kit.rod(V(lx, y0 + 0.03, 0), V(lx, y0 + 0.3, 0), 0.01, 'jpGold', 8);
    geom(kit, new THREE.CylinderGeometry(0.055, 0.07, 0.17, 20), 'jpAltarRed', lx, y0 + 0.385, 0);
    geom(kit, new THREE.CylinderGeometry(0.03, 0.058, 0.03, 20), 'jpGold', lx, y0 + 0.485, 0);
  }
  lamp(kit, 0, y0 + 0.45, 0.2, 0.35, { color: '#ff6a3d', distance: 3, always: true });
  // --- incense burner, tea cups, oranges
  geom(kit, new THREE.CylinderGeometry(0.085, 0.075, 0.09, 28), 'jpBrass', 0, y0 + 0.065, 0.2);
  geom(kit, new THREE.TorusGeometry(0.085, 0.008, 8, 28), 'jpBrass', 0, y0 + 0.11, 0.2, 1, new THREE.Matrix4().makeRotationX(Math.PI / 2));
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2;
    kit.box(Math.cos(a) * 0.06 - 0.008, Math.cos(a) * 0.06 + 0.008, y0, y0 + 0.02, 0.2 + Math.sin(a) * 0.06 - 0.008, 0.2 + Math.sin(a) * 0.06 + 0.008, 'jpBrass');
  }
  for (const dx of [-0.015, 0, 0.015]) {
    kit.rod(V(dx, y0 + 0.1, 0.2), V(dx * 2, y0 + 0.36, 0.2), 0.0022, 'jpIncense', 4);
    kit.rod(V(dx * 2, y0 + 0.36, 0.2), V(dx * 2, y0 + 0.37, 0.2), 0.0028, 'jpAltarRed', 4); // glowing tips
  }
  for (const cx of [-0.14, 0, 0.14]) geom(kit, new THREE.CylinderGeometry(0.025, 0.018, 0.035, 16), 'ceramic', cx, y0 + 0.0175, 0.07);
  for (const s of [-1, 1]) {
    const px = s * 0.3, pz = 0.15;
    geom(kit, new THREE.CylinderGeometry(0.1, 0.07, 0.02, 24), 'ceramic', px, y0 + 0.01, pz);
    for (const [ox, oy, oz] of [[-0.04, 0.035, -0.03], [0.04, 0.035, -0.02], [0, 0.035, 0.04], [0, 0.095, 0]] as const) {
      geom(kit, new THREE.SphereGeometry(0.035, 16, 12), 'jpOrange', px + ox, y0 + 0.02 + oy, pz + oz, 0.9);
    }
  }
}

/* ------------------------------------------------------------------ */
/*  World-space light fittings & pieces                                */
/* ------------------------------------------------------------------ */

function rug(kit: Kit, x0: number, x1: number, z0: number, z1: number, y: number) {
  kit.box(x0, x1, y + 0.001, y + 0.012, z0, z1, RUG);
  kit.box(x0 + 0.08, x1 - 0.08, y + 0.012, y + 0.0125, z0 + 0.08, z0 + 0.1, LINEN_G);
  kit.box(x0 + 0.08, x1 - 0.08, y + 0.012, y + 0.0125, z1 - 0.1, z1 - 0.08, LINEN_G);
}

/** washi pendant: 'lantern' (chōchin sphere) or 'drum' (cylinder); `light` = 0 for shade only */
function pendant(kit: Kit, x: number, z: number, yCeil: number, yBottom: number, shape: 'lantern' | 'drum', r: number, light: number) {
  const h = shape === 'lantern' ? r * 1.6 : r * 1.1;
  geom(kit, new THREE.CylinderGeometry(0.06, 0.06, 0.02, 16), WHITE, x, yCeil - 0.01, z);
  kit.rod(V(x, yCeil - 0.02, z), V(x, yBottom + h, z), 0.003, 'black', 5);
  if (shape === 'lantern') {
    geom(kit, new THREE.SphereGeometry(r, 28, 16), WASHI, x, yBottom + h / 2, z, 0.8);
    for (const y of [yBottom, yBottom + h - 0.01]) geom(kit, new THREE.CylinderGeometry(0.07, 0.07, 0.015, 18), OAK_D, x, y + 0.0075, z);
  } else {
    geom(kit, new THREE.CylinderGeometry(r, r, h, 28), WASHI, x, yBottom + h / 2, z);
    geom(kit, new THREE.CylinderGeometry(r + 0.005, r + 0.005, 0.012, 28), OAK_D, x, yBottom + h - 0.006, z);
  }
  if (light > 0) lamp(kit, x, yBottom + h * 0.4, z, light);
}

/** flush washi ceiling light with an oak rim (main light of a room) */
function ceilingLight(kit: Kit, x: number, z: number, yCeil: number, light: number, r = 0.26) {
  geom(kit, new THREE.CylinderGeometry(r, r, 0.09, 36), WASHI, x, yCeil - 0.045, z);
  geom(kit, new THREE.CylinderGeometry(r + 0.012, r + 0.012, 0.015, 36), OAK_D, x, yCeil - 0.0925, z);
  lamp(kit, x, yCeil - 0.3, z, light, { distance: 5 });
}

/** recessed LED downlight (bathrooms, kitchen) */
function downlight(kit: Kit, x: number, z: number, yCeil: number, light: number) {
  geom(kit, new THREE.CylinderGeometry(0.075, 0.075, 0.008, 24), LED, x, yCeil - 0.004, z);
  geom(kit, new THREE.TorusGeometry(0.08, 0.006, 6, 24), WHITE, x, yCeil - 0.004, z, 1, new THREE.Matrix4().makeRotationX(Math.PI / 2));
  lamp(kit, x, yCeil - 0.25, z, light, { color: NEUTRAL, distance: 5 });
}

/** ceiling fan with oak blades and a washi light bowl */
function ceilingFan(kit: Kit, x: number, z: number, yCeil: number, light: number) {
  geom(kit, new THREE.CylinderGeometry(0.08, 0.08, 0.05, 24), OAK_D, x, yCeil - 0.025, z);
  kit.rod(V(x, yCeil - 0.05, z), V(x, yCeil - 0.22, z), 0.012, 'black', 8);
  geom(kit, new THREE.CylinderGeometry(0.12, 0.13, 0.11, 28), OAK_D, x, yCeil - 0.275, z);
  const yb = yCeil - 0.3;
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    const m = new THREE.Matrix4().makeRotationY(a).multiply(new THREE.Matrix4().makeRotationX(0.12));
    const blade = new THREE.BoxGeometry(0.62, 0.012, 0.13).translate(0.45, 0, 0);
    kit.geom(blade, OAK, m.setPosition(x, yb, z));
    blade.dispose();
  }
  geom(kit, new THREE.SphereGeometry(0.16, 28, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), WASHI, x, yCeil - 0.33, z, 0.55);
  lamp(kit, x, yCeil - 0.45, z, light);
}

/** vertical oak slats on a dark backing, on a wall face at z (slats towards +z) */
function slatWallZ(kit: Kit, x0: number, x1: number, z: number, y0: number, y1: number) {
  kit.box(x0, x1, y0, y1, z, z + 0.012, OAK_D);
  for (let x = x0 + 0.015; x + 0.035 <= x1 - 0.01; x += 0.07) kit.box(x, x + 0.035, y0, y1, z + 0.012, z + 0.042, OAK);
}

/* ------------------------------------------------------------------ */
/*  日式简约风 · Japanese minimalist                                    */
/* ------------------------------------------------------------------ */

export function buildInterior(kit: Kit, style: InteriorStyle) {
  lamps.length = 0;
  if (style !== 'japanese') return;
  const prevUV = kit.uvFn;
  kit.uvFn = null;
  stack.length = 0;
  groundFloor(kit);
  firstFloor(kit);
  kit.setTransform(null);
  kit.uvFn = prevUV;
}

/** Full-height storage under the landing/upper flight; doors follow the sloping soffit. */
function underStairWardrobe(kit: Kit) {
  const landingRiser = STAIR_TREADS.lower + 3 + STAIR_TREADS.middle;
  const tread = (X_STAIR_TOP - X_STAIR_W_STRIP) / STAIR_TREADS.upper;
  const top = (x: number) => landingRiser * RISE - 0.16 - 0.025
    + Math.max(0, x - X_STAIR_W_STRIP) * RISE / tread;
  const back = Z_LIVING_N - hi - 0.02, front = back - 0.6;
  const edges = [hp + 0.02, 0.61, X_STAIR_W_STRIP, 1.68, 2.21, X_STAIR_TOP - 0.02];
  kit.box(edges[0], edges[edges.length - 1], 0, 0.08, front + 0.04, back, OAK_D);
  for (let i = 0; i < edges.length - 1; i++) {
    const a = edges[i] + 0.003, b = edges[i + 1] - 0.003;
    kit.prismXY([[a, 0.08], [b, 0.08], [b, top(b)], [a, top(a)]], front, back, OAK, () => OAK);
    const x = b - 0.045;
    kit.box(x - 0.006, x + 0.006, 0.95, 1.25, front - 0.018, front, OAK_D);
    // Upper cupboard joint follows the underside of the stair.
    kit.prismXY([[a, top(a) - 0.453], [b, top(b) - 0.453],
      [b, top(b) - 0.447], [a, top(a) - 0.447]], front - 0.002, front, OAK_D, () => OAK_D);
  }
}

function gamingConsole(kit: Kit) {
  kit.box(-0.16, 0.16, 0, 0.07, -0.07, 0.07, 'black');
  kit.box(-0.14, 0.14, 0.025, 0.03, 0.07, 0.072, SCREEN);
  kit.box(0.11, 0.125, 0.04, 0.046, 0.07, 0.073, LED);
  // Two controllers beside the console.
  for (const x of [-0.3, 0.3]) {
    kit.box(x - 0.065, x + 0.065, 0, 0.035, -0.04, 0.045, WHITE);
    for (const dx of [-0.025, 0.025]) geom(kit, new THREE.CylinderGeometry(0.009, 0.009, 0.008, 12), 'black', x + dx, 0.039, 0);
  }
}

function groundFloor(kit: Kit) {
  kit.group = 'gf';
  const yC = Y_RENOVATED_GF_CEIL;
  const zLiv = Z_LIVING_N + hi; // living back-wall face
  underStairWardrobe(kit);

  // --- 神台: on the living back wall, straight ahead of the front door
  const doorMid = (X_DOOR_A + X_DOOR_B) / 2 - 0.25; // shift altar 250 mm left
  at(kit, doorMid, 0, zLiv + 0.275, FACE.pz, () => altar(kit));
  slatWallZ(kit, doorMid + 0.8, 3.0, zLiv, 0, yC); // slats continue beside the altar

  // --- living room: low sofa facing a floating TV console on the east wall (TV outlets at z ≈ 9.8)
  // Leave about 1 m between the altar top and the sofa's rearward end.
  const sofaZ = 10.35;
  rug(kit, 2.95, 5.35, 8.95, 11.5, 0);
  at(kit, 2.75, 0, sofaZ, FACE.px, () => sofa(kit, 2.2));
  at(kit, 3.95, 0, sofaZ, FACE.px, () => table(kit, 1.1, 0.6, 0.36, 0.045, true));
  at(kit, XE - 0.03 - 0.21, 0, sofaZ, FACE.nx, () => tvConsole(kit, 2.0));
  ceilingFan(kit, 3.95, sofaZ, yC, 7);
  at(kit, XE, 2.47, 9.9, FACE.nx, () => airCon(kit)); // over the high socket
  // Floating shoe cabinet outside on the covered porch, clear of the entrance steps.
  kit.group = 'site';
  at(kit, hp + 0.19, Y_PORCH, 13.35, FACE.px, () => shoeCabinet(kit, 1.5));
  kit.group = 'gf';

  // --- former dining (stair foot): sideboard with a paper lamp, kept open for circulation
  at(kit, XE - 0.01 - 0.225, 0, 6.15, FACE.nx, () => sideboard(kit, 1.8));

  // --- dining, now at the back in the open former kitchen, next to the L-kitchen
  const dx = XE - 0.425, dz = 2.35;
  at(kit, dx, 0, dz, FACE.px, () => {
    table(kit, 1.5, 0.85, 0.72, 0.06);
    for (const x of [-0.38, 0.38]) {
      at(kit, x, 0, -0.425 - 0.12, FACE.pz, () => chair(kit));
    }
    // Keep two seats on the open long side; move the wall-side pair to the ends.
    at(kit, -0.87, 0, 0, FACE.px, () => chair(kit));
    at(kit, 0.87, 0, 0, FACE.nx, () => chair(kit));
  });
  for (const z of [dz - 0.38, dz + 0.38]) pendant(kit, dx, z, yC, 1.55, 'drum', 0.17, 0);
  lamp(kit, dx, 1.6, dz, 4.5);

  // --- kitchen: fridge at the end of the east leg, appliances on the worktop, lights
  at(kit, XE - 0.02 - 0.34, 0, 0.42 + 0.36, FACE.nx, () => fridge(kit));
  const zR = Z_LOT_REAR + 0.1, top = 0.9;
  at(kit, 5.2, top, zR + 0.22, FACE.pz, () => microwave(kit));
  at(kit, XE - 0.3, top, zR + 0.3, FACE.nx, () => riceCooker(kit));
  at(kit, XE - 0.3, top, -0.15, FACE.nx, () => kettle(kit));
  // LED strips under the east wall cabinets (either side of the hood)
  const hobZ = zR + 0.58 + 0.9;
  for (const [a, b] of [[zR, hobZ - 0.4], [hobZ + 0.4, 0.35]]) kit.box(XE - 0.33, XE - 0.3, 1.49, 1.5, a + 0.03, b - 0.03, LED);
  lamp(kit, XE - 0.4, 1.3, -1.0, 0.8, { color: NEUTRAL, distance: 3 }); // under-cabinet strips
  downlight(kit, 4.3, -1.3, yC, 3.5);
  downlight(kit, 2.8, -1.4, yC, 2); // back-door passage

  // --- laundry backed against the bedroom wall, facing the rear door
  const washerZ = Z_RENOVATED_BED4_REAR - hi - 0.3;
  at(kit, 2.28, 0, washerZ, FACE.nz, () => washingMachine(kit));
  // Bathroom water heater at the shower, downlight.
  at(kit, 0.65, 1.5, Z_LOT_REAR + 0.108, FACE.pz, () => waterHeater(kit));
  downlight(kit, 0.95, -1.35, yC, 2.5);

  // --- bedroom 4: platform bed with the head on the west wall, facing the sliding window
  const l4 = 2.05;
  at(kit, hp + 0.01 + l4 / 2, 0, 1.75, FACE.px, () => bed(kit, 1.0, l4, false));
  at(kit, 0.525, 0, Z_STAIR_N - hi - 0.3, FACE.nz, () => wardrobe(kit, 0.95));
  at(kit, 3.1 - hi, 2.46, 2.75, FACE.nx, () => airCon(kit));
  ceilingLight(kit, 1.55, 2.2, yC, 4.5);

  // Appliance outlets on adjacent dry wall faces, clear of worktops and cabinetry.
  for (const z of [10.2, 10.3, 10.4]) wallOutlet(kit, XE, 0.55, z, 'nx'); // TV, soundbar, router
  wallOutlet(kit, doorMid - 0.85, 0.9, zLiv, 'pz'); // altar lights
  wallOutlet(kit, XE, 0.95, 6.15, 'nx'); // sideboard lamp
  wallOutlet(kit, XE, 1.05, 1.3, 'nx'); // fridge, beside its footprint
  wallOutlet(kit, 5.25, 1.25, zR, 'pz'); // microwave
  wallOutlet(kit, XE, 1.25, zR + 0.45, 'nx'); // rice cooker
  wallOutlet(kit, XE, 1.25, -0.15, 'nx'); // kettle
  // Connection plates for fixed appliances; water heaters do not use general sockets.
  plate(kit, XE, 2.35, hobZ, 'nx', 0.086); // cooker hood supply
  plate(kit, XE, 0.65, hobZ + 0.45, 'nx', 0.086); // hob supply
  plate(kit, 0.85, 1.55, zR, 'pz', 0.086); // bathroom 3 heater connection
  wallOutlet(kit, 2.75, 1.05, Z_RENOVATED_BED4_REAR - hi, 'nz'); // washer, beside the machine
  wallOutlet(kit, hp, 0.75, 1.75, 'px'); // bed headboard light
  kit.group = 'site';
  wallOutlet(kit, hp, 1.0, 13.35, 'px'); // covered-porch shoe cabinet light
  kit.group = 'gf';
}

function firstFloor(kit: Kit) {
  kit.group = 'ff';
  const y = Y_FF, yC = Y_FF_CEIL;
  const zN = Z_STAIR_N - hi; // bedroom south wall face
  const l = 2.05;

  // --- bedroom 3 (west) and bedroom 2 (east): mirrored bed / desk under the window / wardrobe / aircon
  at(kit, hp + 0.01 + l / 2, y, 2.0, FACE.px, () => bed(kit, 1.52, l));
  at(kit, 1.55, y, 0.1 + 0.26, FACE.pz, () => desk(kit, 1.2));
  at(kit, 1.55, y, 0.88, FACE.nz, () => chair(kit));
  at(kit, 0.7, y, zN - 0.3, FACE.nz, () => wardrobe(kit, 1.3));
  at(kit, 3.04 - hi, y + 2.5, 1.6, FACE.nx, () => airCon(kit));
  ceilingLight(kit, 1.5, 2.2, yC, 4.5);

  at(kit, XE - 0.01 - l / 2, y, 2.0, FACE.nx, () => bed(kit, 1.52, l));
  at(kit, 4.575, y, 0.1 + 0.26, FACE.pz, () => desk(kit, 1.2));
  at(kit, 4.575, y, 0.88, FACE.nz, () => chair(kit));
  at(kit, 5.4, y, zN - 0.3, FACE.nz, () => wardrobe(kit, 1.28));
  at(kit, 3.04 + hi, y + 2.5, 1.6, FACE.px, () => airCon(kit));
  ceilingLight(kit, 4.57, 2.2, yC, 4.5);

  // --- family hall: open exercise floor, compact relaxation sofa and gaming corner.
  // Keep x=2.6..4.3, z=4.8..7.0 free of fixed furniture for yoga/stretching.
  at(kit, 5.08, y, Z_STAIR_N + hi + 0.42, FACE.pz, () => sofa(kit, 1.75, 0.8));
  at(kit, XE - 0.03 - 0.21, y, 6.4, FACE.nx, () => {
    tvConsole(kit, 1.6, false);
    at(kit, 0, 0.42, 0.115, 0, () => gamingConsole(kit));
  });
  // Loose yoga mat and two cork blocks; no coffee table or raised platform.
  kit.box(3.05, 3.73, y + 0.001, y + 0.007, 4.95, 6.85, CUSHION);
  for (const z of [5.05, 5.32]) kit.box(3.9, 4.05, y, y + 0.075, z, z + 0.23, OAK);
  // Rolled spare mat stored beside the sofa, against the east wall.
  geom(kit, new THREE.CylinderGeometry(0.09, 0.09, 0.65, 24), LINEN_G, XE - 0.15, y + 0.325, 5.48);
  ceilingLight(kit, 4.25, 5.95, yC, 4.5, 0.32);
  for (const z of [6.1, 6.2, 6.3, 6.4]) wallOutlet(kit, XE, y + 0.62, z, 'nx'); // TV, console, router and spare
  downlight(kit, 2.3, 7.0, yC, 1.5); // over the stair head

  // --- master bedroom: king bed on the west wall, wardrobe wall, tatami nook in the front extension
  const lm = 2.1;
  at(kit, hp + 0.01 + lm / 2, y, 10.3, FACE.px, () => bed(kit, 1.83, lm));
  at(kit, 1.25, y, Z_LIVING_N + hi + 0.3, FACE.pz, () => wardrobe(kit, 2.4));
  at(kit, X_BATH_W - hi, y + 2.5, 8.8, FACE.nx, () => airCon(kit));
  ceilingLight(kit, 2.0, 10.2, yC, 5.5, 0.3);
  const zFront = Z_MASTER_EXTENSION_FRONT - 0.1; // inner face of the new front wall
  const tz0 = 12.7, tx1 = 2.05;
  at(kit, (hp + tx1) / 2, y, (tz0 + zFront) / 2, 0, () => {
    const w = tx1 - hp, d = zFront - tz0;
    tatamiPlatform(kit, w, d);
    at(kit, 0, 0.2, 0.05, 0, () => table(kit, 0.8, 0.6, 0.33, 0.04));
    at(kit, -0.72, 0.2, 0.05, FACE.px, () => zabuton(kit));
    at(kit, 0.72, 0.2, 0.05, FACE.nx, () => zabuton(kit));
    at(kit, -w / 2 + 0.25, 0.2, -d / 2 + 0.25, 0, () => andon(kit, 0.5, 0.6));
  });
  pendant(kit, 1.9, 13.55, yC, yC - 0.6, 'drum', 0.2, 2.5);

  // --- bathrooms 2 and 1: water heaters beside the showers, downlights
  const yB2 = Y_FF + 2.1 + 5 * 0.3; // bathroom 2's raised ceiling (see house.ts)
  at(kit, 4.9, y + 1.5, Z_BATH_SPLIT - hi - 0.008, FACE.nz, () => waterHeater(kit));
  downlight(kit, 5.0, 8.6, yB2, 4);
  at(kit, XE - 0.008, y + 1.5, 11.0, FACE.nx, () => waterHeater(kit));
  downlight(kit, 5.0, 10.85, Y_BATH1_CEIL, 3);

  // Bedside lamps, headboard lights, desk lamps/laptops and the tatami lantern.
  for (const z of [0.95, 2.0, 3.05, 9.1, 10.3, 11.5, 13.0]) wallOutlet(kit, hp, y + 0.75, z, 'px');
  for (const z of [0.95, 2.0, 3.05]) wallOutlet(kit, XE, y + 0.75, z, 'nx');
  for (const x of [1.3, 1.4, 4.75, 4.85]) wallOutlet(kit, x, y + 0.85, 0.1, 'pz');
  plate(kit, 5.1, y + 1.65, Z_BATH_SPLIT - hi, 'nz', 0.086); // bathroom 2 heater connection
  plate(kit, XE, y + 1.65, 11.25, 'nx', 0.086); // bathroom 1 heater connection
}
