import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import type { Kit } from './kit';
import { interiorDesign, type InteriorDesign, type InteriorStyle, type RenovationLayout } from '../designs';
import { wallOutlet, plate } from './fixtures';
import {
  W, T_PARTY, T_INT, T_EXT, Z_FRONT, LIVING_WINDOW, Y_FF, Y_FF_CEIL, Y_RENOVATED_GF_CEIL, Y_BATH1_CEIL, Z_STAIR_N, Z_LIVING_N, Z_MASTER_EXTENSION_FRONT, Z_LOT_REAR,
  Z_BATH_SPLIT, X_BATH_W, X_DOOR_A, X_DOOR_B, Y_STEP, Z_RENOVATED_BED4_REAR,
  RISE, STAIR_TREADS, X_STAIR_W_STRIP, X_STAIR_FOOT, Z_CORE_S, MASTER_PARTITION,
  Y_PORCH_CEIL, Z_BALCONY_FRONT, Z_BATH_BOX, LIVING_SOFA, RENOVATED_BATH3,
} from '../config';

/*
 * Interior design packages. They furnish the RENOVATED layout only (rear extension, enlarged
 * bedroom 4 and open old kitchen). The master nook is added only with the master extension.
 * Besides geometry, a package lists its light fittings (see interiorLamps) – main.ts turns them into
 * real lights that switch on at dusk.
 */
/** a light fitting: world position, colour, luminous intensity (cd) when switched on */
export interface LampSpec {
  level: 'gf' | 'ff' | 'site';
  pos: [number, number, number];
  color: string;
  intensity: number;
  distance: number;
  /** altar lamps (神台灯) burn day and night */
  always?: boolean;
}
const lamps: LampSpec[] = [];
/** light fittings of the renovation and interior built last */
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
const SHOE_CABINET_DEPTH = 0.36;
const LIVING_WALL_LINING = 0.018;

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
    level: kit.group === 'site' ? 'site' : kit.group === 'ff' ? 'ff' : 'gf', pos: [p.x, p.y, p.z],
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
  rounded(kit, w, 0.18, l, 0, 0.19, 0, OAK, 0.012);
  rounded(kit, w - 0.1, 0.2, l - 0.13, 0, 0.38, 0.015, LINEN, 0.055); // mattress
  rounded(kit, w - 0.06, 0.19, l - 0.83, 0, 0.435, 0.385, LINEN_G, 0.07); // duvet
  rounded(kit, w - 0.04, 0.025, 0.3, 0, 0.5325, z - 0.4, CUSHION, 0.01); // runner
  const single = w < 1.2;
  const pw = single ? 0.62 : Math.min(0.62, w / 2 - 0.1);
  for (const px of single ? [0] : [-w / 4, w / 4]) rounded(kit, pw, 0.12, 0.38, px, 0.54, -z + 0.31, LINEN, 0.055);
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

/** Handleless oak media console on tall legs, with a TV and soundbar; back at local −z */
function tvConsole(kit: Kit, w: number, withSoundbar = true) {
  const d = 0.42, legHeight = 0.22, h = legHeight + 0.28;
  for (const x of [-w / 2 + 0.12, 0, w / 2 - 0.12]) for (const z of [-d / 2 + 0.07, d / 2 - 0.07]) {
    geom(kit, new THREE.CylinderGeometry(0.025, 0.018, legHeight, 12), OAK_D, x, legHeight / 2, z);
  }
  kit.box(-w / 2, w / 2, legHeight, h, -d / 2, d / 2, OAK);
  // Four flush handleless doors with fine shadow joints.
  for (let i = 1; i < 4; i++) {
    const x = -w / 2 + i * w / 4;
    kit.box(x - 0.002, x + 0.002, legHeight + 0.01, h - 0.01, d / 2, d / 2 + 0.002, OAK_D);
  }
  kit.box(-w / 2 + 0.1, w / 2 - 0.1, legHeight - 0.005, legHeight, -d / 2 + 0.02, d / 2 - 0.1, LED); // under-glow
  const z = -0.06;
  kit.box(-0.22, 0.22, h, h + 0.012, z - 0.08, z + 0.1, 'black'); // stand
  kit.box(-0.035, 0.035, h, h + 0.1, z - 0.02, z, 'black');
  const tvWidth = 1.66, tvHeight = tvWidth * 9 / 16, tvBase = h + 0.07; // approximately 75" TV
  kit.box(-tvWidth / 2 - 0.01, tvWidth / 2 + 0.01, tvBase, tvBase + tvHeight + 0.02, z - 0.03, z, 'black');
  kit.box(-tvWidth / 2, tvWidth / 2, tvBase + 0.01, tvBase + tvHeight + 0.01, z, z + 0.002, SCREEN);
  if (withSoundbar) {
    kit.box(-0.45, 0.45, h, h + 0.065, 0.06, 0.15, 'black'); // soundbar
    kit.box(-0.44, 0.44, h + 0.008, h + 0.057, 0.15, 0.151, 'plasticGrey');
  }

}

/** floating genkan shoe cabinet with a key tray; back at local −z */
function shoeCabinet(kit: Kit, w: number) {
  const d = SHOE_CABINET_DEPTH, y0 = 0.22, y1 = 0.98;
  kit.box(-w / 2, w / 2, y0, y1, -d / 2, d / 2, OAK);
  doorFronts(kit, w, y0 + 0.01, y1 - 0.01, d / 2, 2, [y0 + 0.08, y0 + 0.3]);
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
  geom(kit, new THREE.TorusGeometry(r + 0.004, 0.008, 8, 36), OAK_D, x, yCeil - 0.09, z,
    1, new THREE.Matrix4().makeRotationX(Math.PI / 2));
  lamp(kit, x, yCeil - 0.3, z, light, { distance: 5 });
}

/** recessed LED downlight */
function downlight(kit: Kit, x: number, z: number, yCeil: number, light: number, distance = 5) {
  geom(kit, new THREE.CylinderGeometry(0.075, 0.075, 0.008, 24), LED, x, yCeil - 0.004, z);
  geom(kit, new THREE.TorusGeometry(0.08, 0.006, 6, 24), WHITE, x, yCeil - 0.004, z, 1, new THREE.Matrix4().makeRotationX(Math.PI / 2));
  lamp(kit, x, yCeil - 0.25, z, light, { color: NEUTRAL, distance });
}

/** Permanent porch fittings, clear of the dropped beams and bathroom projection. */
function porchLighting(kit: Kit) {
  kit.group = 'site';
  for (const x of [2.0, W - 1.5]) {
    for (const z of [Z_BATH_BOX + 1.0, Z_BALCONY_FRONT - 1.0]) {
      downlight(kit, x, z, Y_PORCH_CEIL, 6, 7);
    }
  }
}

/** ceiling fan with oak blades and a washi light bowl */
function ceilingFan(kit: Kit, x: number, z: number, yCeil: number, light: number, radius = 0.76) {
  geom(kit, new THREE.CylinderGeometry(0.08, 0.08, 0.05, 24), OAK_D, x, yCeil - 0.025, z);
  kit.rod(V(x, yCeil - 0.05, z), V(x, yCeil - 0.22, z), 0.012, 'black', 8);
  geom(kit, new THREE.CylinderGeometry(0.12, 0.13, 0.11, 28), OAK_D, x, yCeil - 0.275, z);
  const yb = yCeil - 0.3;
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    const m = new THREE.Matrix4().makeRotationY(a).multiply(new THREE.Matrix4().makeRotationX(0.12));
    const blade = new THREE.BoxGeometry(radius - 0.14, 0.012, 0.13).translate((radius + 0.14) / 2, 0, 0);
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

export function buildInterior(kit: Kit, style: InteriorStyle, layout: RenovationLayout) {
  lamps.length = 0;
  if (!layout.groundFloor) return;
  const prevUV = kit.uvFn;
  kit.uvFn = null;
  stack.length = 0;
  porchLighting(kit);
  const design = interiorDesign(style);
  if (design) {
    groundFloor(kit, layout);
    firstFloor(kit, design, layout);
  }
  kit.setTransform(null);
  kit.uvFn = prevUV;
}

/** L-shaped storage in the recess beneath the lower flight and west stair return. */
function underStairWardrobe(kit: Kit) {
  const n = STAIR_TREADS.lower;
  const tread = (X_STAIR_FOOT - X_STAIR_W_STRIP) / n;
  const lowerTop = (x: number) => RISE * (X_STAIR_FOOT - x) / tread - 0.185;
  const lowEdges = [X_STAIR_W_STRIP, 1.6, 2.05, 2.5, 2.9, 2.97];
  for (let i = 0; i < lowEdges.length - 1; i++) {
    const a = lowEdges[i] + 0.003, b = lowEdges[i + 1] - 0.003;
    kit.prismXY([[a, 0], [b, 0], [b, lowerTop(b)], [a, lowerTop(a)]], 4.92, 5.5, OAK, () => OAK);
    const h = Math.min(0.8, lowerTop(b) - 0.06);
    if (h > 0.12) kit.box(a + 0.06, a + 0.18, h - 0.012, h, 5.5, 5.518, OAK_D);
  }
  // The return follows the winder transition, middle flight and flat landing.
  const zW = 5.75, zB = 5.52;
  const middleTread = (Z_CORE_S + hi - zW) / STAIR_TREADS.middle;
  const landingRiser = n + 3 + STAIR_TREADS.middle;
  const landingStart = zW + (landingRiser - n - 2) * middleTread;
  const returnTop = (z: number) => z < zW
    ? lowerTop(X_STAIR_W_STRIP) + (z - zB) / (zW - zB) * (2 * RISE)
    : Math.min(landingRiser * RISE - 0.185, (n + 2 + (z - zW) / middleTread) * RISE - 0.185);
  const end = Z_LIVING_N - hi - 0.02;
  const backX = X_STAIR_W_STRIP - 0.62, frontX = X_STAIR_W_STRIP - 0.02;
  const splitY = returnTop(zW), splitZ = 6.55, gap = 0.003;
  // Continuous carcass behind the new fronts; the dark reveal defines the three sections.
  kit.prismZY([[zB, 0], [end, 0], [end, returnTop(end)],
    [landingStart, returnTop(landingStart)], [zW, returnTop(zW)], [zB, returnTop(zB)]],
    backX, frontX - 0.025, OAK_D, () => OAK_D);
  // Small corner panel remains under the winder, beside the lower-flight cupboards.
  kit.prismZY([[zB + gap, 0], [zW - gap, 0],
    [zW - gap, returnTop(zW - gap)], [zB + gap, returnTop(zB + gap)]],
    frontX - 0.025, frontX, OAK, () => OAK);
  // Sections 2 and 3: two broad lower doors meeting at the marked vertical divide.
  for (const [a, b, handleZ] of [
    [zW + gap, splitZ - gap, splitZ - 0.07],
    [splitZ + gap, end - gap, splitZ + 0.07],
  ]) {
    kit.box(frontX - 0.025, frontX, 0, splitY - gap, a, b, OAK);
    kit.box(frontX, frontX + 0.018, 0.8, 1.02, handleZ - 0.006, handleZ + 0.006, OAK_D);
  }
  // Section 1: one uninterrupted upper front following the stair slope and landing.
  const upperStart = zW + 0.012, upperEnd = end - gap;
  kit.prismZY([[upperStart, splitY + gap], [upperEnd, splitY + gap],
    [upperEnd, returnTop(upperEnd)], [landingStart, returnTop(landingStart)],
    [upperStart, returnTop(upperStart)]], frontX - 0.025, frontX, OAK, () => OAK);
  kit.box(frontX, frontX + 0.018, splitY + 0.1, splitY + 0.112, 6.75, 6.95, OAK_D);
}

/** Soft-edged upholstery and stone; dimensions in metres. */
function rounded(kit: Kit, w: number, h: number, d: number, x: number, y: number, z: number, mat: string, radius = 0.06) {
  geom(kit, new RoundedBoxGeometry(w, h, d, 3, radius), mat, x, y, z);
}

function modernSofa(kit: Kit) {
  const { width, depth, chaiseDepth, legHeight } = LIVING_SOFA;
  const half = width / 2, rear = -depth / 2, front = rear + chaiseDepth;
  const baseTop = legHeight + 0.16;
  const armWidth = 0.16, seatSpacing = (width - 2 * armWidth) / 3;
  const cushionWidth = seatSpacing - 0.03, chaiseWidth = seatSpacing + armWidth;
  const fabric = 'modernLinen';
  // One continuous L-shaped carcass, raised on slim tapered timber legs.
  kit.prismXZ([[-half, rear], [half, rear], [half, front],
    [half - chaiseWidth, front], [half - chaiseWidth, depth / 2], [-half, depth / 2]],
    legHeight, baseTop, fabric, fabric, fabric);
  for (const [x, z] of [
    [-half + 0.13, rear + 0.13], [-half + 0.13, depth / 2 - 0.13],
    [0, rear + 0.13], [0, depth / 2 - 0.13],
    [half - 0.13, rear + 0.13], [half - 0.13, depth / 2 - 0.13],
    [half - chaiseWidth + 0.13, front - 0.13], [half - 0.13, front - 0.13],
  ]) {
    geom(kit, new THREE.CylinderGeometry(0.025, 0.018, legHeight, 12), OAK_D, x, legHeight / 2, z);
  }
  rounded(kit, width, 0.53, 0.22, 0, baseTop + 0.265, rear + 0.11, fabric);
  rounded(kit, armWidth, 0.36, depth - 0.04, -half + armWidth / 2, baseTop + 0.18, 0, fabric);
  rounded(kit, armWidth, 0.36, chaiseDepth - 0.04, half - armWidth / 2, baseTop + 0.18, (rear + front) / 2, fabric);
  for (const x of [-seatSpacing, 0, seatSpacing]) {
    const chaise = x > 0;
    const seatBack = rear + 0.22, seatFront = (chaise ? front : depth / 2) - 0.06;
    rounded(kit, cushionWidth, 0.15, seatFront - seatBack, x, baseTop + 0.075,
      (seatBack + seatFront) / 2, fabric, 0.045);
    rounded(kit, cushionWidth, 0.4, 0.2, x, baseTop + 0.33, rear + 0.29, fabric);
  }
}

/** Compact oak coffee table with a storage shelf and four timber legs. */
function coffeeTable(kit: Kit) {
  const width = 0.8, depth = 0.45, height = 0.38, wood = 'coffeeTableOak';
  rounded(kit, width, 0.035, depth, 0, height - 0.0175, 0, wood, 0.015);
  rounded(kit, width - 0.13, 0.018, depth - 0.13, 0, 0.15, 0, wood, 0.006);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    const x = sx * (width / 2 - 0.065), z = sz * (depth / 2 - 0.065);
    kit.box(x - 0.0225, x + 0.0225, 0, height - 0.035, z - 0.0225, z + 0.0225, wood);
  }
}

/** A fan/light over the seating area, with two downlights near the front window. */
function livingLighting(kit: Kit) {
  const loungeX = (LIVING_WINDOW.a + LIVING_WINDOW.b) / 2;
  const y = Y_RENOVATED_GF_CEIL;
  ceilingFan(kit, loungeX, 8.8, y, 4);
  for (const x of [loungeX - 0.8, loungeX + 0.8]) downlight(kit, x, 10.85, y, 1.5);
}

/** Window-length linen curtains on a slim track, ending just below the sill. */
function livingCurtains(kit: Kit) {
  const top = Y_RENOVATED_GF_CEIL - 0.12, bottom = LIVING_WINDOW.y0 - 0.12;
  const left = LIVING_WINDOW.a - 0.1, right = LIVING_WINDOW.b + 0.1;
  const z = Z_FRONT - 0.16;
  kit.box(left, right, top, top + 0.025, z - 0.025, z + 0.025, 'modernPlaster');
  for (const start of [left, right - 0.38]) {
    const segments = 48;
    for (let i = 0; i < segments; i++) {
      const x0 = start + i / segments * 0.38, x1 = start + (i + 1) / segments * 0.38;
      const z0 = z + Math.sin(i / segments * Math.PI * 12) * 0.025;
      const z1 = z + Math.sin((i + 1) / segments * Math.PI * 12) * 0.025;
      // Closed, thin pleated fabric works in both raster and path-traced views.
      kit.prismXZ([[x0, z0], [x1, z1], [x1, z1 + 0.003], [x0, z0 + 0.003]], bottom, top,
        'modernLinen', 'modernLinen', 'modernLinen');
    }
  }
}

function groundFloor(kit: Kit, layout: RenovationLayout) {
  kit.group = 'gf';
  const yC = Y_RENOVATED_GF_CEIL;
  const zLiv = Z_LIVING_N + hi; // living back-wall face
  underStairWardrobe(kit);

  // --- 神台: on the living back wall, straight ahead of the front door
  const doorMid = (X_DOOR_A + X_DOOR_B) / 2 - 0.25; // shift altar 250 mm left
  at(kit, doorMid, 0, zLiv + 0.275, FACE.pz, () => altar(kit));
  downlight(kit, doorMid, zLiv + 1.25, yC, 2.5);
  // One lounge faces the porch window; west side stays open to the entrance.
  const loungeX = (LIVING_WINDOW.a + LIVING_WINDOW.b) / 2;
  // Flush with the finished east wall, widening the passage beside the stairs.
  const sofaX = XE - LIVING_WALL_LINING - LIVING_SOFA.width / 2;
  at(kit, sofaX, 0, LIVING_SOFA.z, FACE.pz, () => modernSofa(kit));
  // Keep the complete table separate from the fixed furniture so it can be dragged.
  kit.group = 'coffee-table';
  at(kit, loungeX, 0, 9.85, FACE.pz, () => coffeeTable(kit));
  kit.group = 'gf';
  at(kit, loungeX, 0, Z_FRONT - 0.42, FACE.nz, () => tvConsole(kit, 2.8));
  livingLighting(kit);
  livingCurtains(kit);
  // Quiet plaster lining and low matching skirting along the former TV/gaming wall.
  kit.box(XE - LIVING_WALL_LINING, XE, 0, yC, Z_STAIR_N + hi, Z_FRONT - 0.1, 'modernPlaster');
  kit.box(XE - LIVING_WALL_LINING - 0.01, XE - LIVING_WALL_LINING, 0, 0.055, Z_STAIR_N + hi, Z_FRONT - 0.1, 'modernPlaster');
  at(kit, XE - 0.02, 2.47, 9.9, FACE.nx, () => airCon(kit));
  kit.group = 'site';
  // Centre the compact cabinet on the wall left of the door, clear of its frame and the corner.
  const shoeX = (hp + X_DOOR_A) / 2, shoeWidth = X_DOOR_A - hp - 0.15;
  const shoeWallZ = Z_FRONT + T_EXT / 2;
  at(kit, shoeX, Y_STEP, shoeWallZ + 0.01 + SHOE_CABINET_DEPTH / 2, FACE.pz,
    () => shoeCabinet(kit, shoeWidth));
  kit.group = 'gf';

  // Former gaming / yoga area becomes an open passage to the dining room.
  for (const z of [5.7, 7.0]) downlight(kit, 4.6, z, yC, 2);

  // --- dining, now at the back in the open former kitchen, next to the L-kitchen
  const dx = XE - 0.425, dz = 2.85; // 500 mm toward the socket beside the kitchen opening
  at(kit, dx, 0, dz, FACE.px, () => {
    table(kit, 1.5, 0.85, 0.72, 0.06);
    for (const x of [-0.38, 0.38]) {
      at(kit, x, 0, -0.425 - 0.12, FACE.pz, () => chair(kit));
    }
    // Keep two seats on the open long side; move the wall-side pair to the ends.
    at(kit, -0.87, 0, 0, FACE.px, () => chair(kit));
    at(kit, 0.87, 0, 0, FACE.nx, () => chair(kit));
  });
  // Fan on the table side, inset for blade clearance; ceiling light over the open floor.
  const diningFanRadius = 0.55;
  ceilingFan(kit, XE - diningFanRadius - 0.3, dz, yC, 2, diningFanRadius);
  ceilingLight(kit, dx - 1.4, dz, yC, 3.5, 0.2);

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
  at(kit, 2.43, 0, washerZ, FACE.nz, () => washingMachine(kit)); // 150 mm toward the kitchen
  // Bathroom water heater at the shower, downlight.
  at(kit, RENOVATED_BATH3.westX, 1.5, RENOVATED_BATH3.showerZ - 0.25, FACE.px, () => waterHeater(kit));
  downlight(kit, 0.95, -1.35, yC, 2.5);

  // --- bedroom 4: platform bed with the head on the west wall, facing the sliding window
  const l4 = 2.05, guestSuite = layout.bathroomAccess === 'ensuite';
  const bed4Z = guestSuite ? 2.2 : 1.75;
  at(kit, hp + 0.01 + l4 / 2, 0, bed4Z, FACE.px, () => bed(kit, guestSuite ? 1.52 : 1.0, l4, false));
  at(kit, 0.525, 0, Z_STAIR_N - hi - 0.3, FACE.nz, () => wardrobe(kit, 0.95));
  at(kit, 3.1 - hi, 2.46, 2.75, FACE.nx, () => airCon(kit));
  ceilingLight(kit, 1.55, 2.2, yC, 4.5);

  // Appliance outlets on adjacent dry wall faces, clear of worktops and cabinetry.
  for (const dx of [-0.35, -0.23, -0.11]) wallOutlet(kit, loungeX + dx, 0.28, Z_FRONT - 0.1, 'nz'); // concealed behind the media console
  wallOutlet(kit, XE, 0.95, 6.15, 'nx'); // spare outlet in the ground-floor flex area
  wallOutlet(kit, XE, 1.05, 1.3, 'nx'); // fridge, beside its footprint
  wallOutlet(kit, 5.25, 1.25, zR, 'pz'); // microwave
  wallOutlet(kit, XE, 1.25, zR + 0.45, 'nx'); // rice cooker
  wallOutlet(kit, XE, 1.25, -0.15, 'nx'); // kettle
  // Connection plates for fixed appliances; water heaters do not use general sockets.
  plate(kit, XE, 2.35, hobZ, 'nx', 0.086); // cooker hood supply
  plate(kit, XE, 0.65, hobZ + 0.45, 'nx', 0.086); // hob supply
  plate(kit, RENOVATED_BATH3.westX, 1.55, RENOVATED_BATH3.showerZ - 0.45, 'px', 0.086); // bathroom 3 heater connection
  wallOutlet(kit, 2.75, 1.05, Z_RENOVATED_BED4_REAR - hi, 'nz'); // washer, beside the machine
  wallOutlet(kit, hp, 0.75, bed4Z, 'px'); // bed headboard light
  kit.group = 'site';
  wallOutlet(kit, shoeX, 1.0, shoeWallZ, 'pz'); // above the relocated shoe cabinet
  kit.group = 'gf';
}

function firstFloor(kit: Kit, design: InteriorDesign, layout: RenovationLayout) {
  const { masterExtension, masterZone } = layout;
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

  // --- family hall: original upstairs lounge.
  rug(kit, 4.0, 5.95, 5.0, 7.0, y);
  at(kit, XE - 0.02 - 0.4, y, 6.0, FACE.nx, () => sofa(kit, 1.9, 0.8));
  at(kit, 4.6, y, 6.0, FACE.px, () => table(kit, 1.0, 0.6, 0.34, 0.045, true));
  if (design.id === 'japanese') pendant(kit, 4.6, 6.0, yC, yC - 0.75, 'lantern', 0.26, 4.5);
  else ceilingLight(kit, 4.6, 6.0, yC, 4.5);
  downlight(kit, 2.3, 7.0, yC, 1.5); // over the stair head

  // --- master bedroom: king bed on the west wall, wardrobe wall, tatami nook in the front extension
  const lm = 2.1;
  at(kit, hp + 0.01 + lm / 2, y, masterExtension ? 10.3 : 10.2, FACE.px, () => bed(kit, 1.83, lm));
  at(kit, 1.25, y, Z_LIVING_N + hi + 0.3, FACE.pz, () => wardrobe(kit, 2.4));
  at(kit, X_BATH_W - hi, y + 2.5, 8.8, FACE.nx, () => airCon(kit));
  ceilingLight(kit, 2.0, 10.2, yC, 5.5, 0.3);
  if (masterExtension) {
    if (masterZone === 'open') masterNook(kit, design);
    else {
      if (masterZone === 'study') masterDesk(kit);
      else {
        // Two plain wardrobe runs leave the east side clear to the balcony door.
        at(kit, hp + 0.3, y, 13.4, FACE.px, () => wardrobe(kit, 2.1));
        at(kit, 1.55, y, MASTER_PARTITION.z + hi + 0.3, FACE.pz, () => wardrobe(kit, 1.7));
      }
      ceilingLight(kit, 1.6, 13.55, yC, 3);
    }
  }

  // --- bathrooms 2 and 1: water heaters beside the showers, downlights
  const yB2 = Y_FF + 2.1 + 5 * 0.3; // bathroom 2's raised ceiling (see house.ts)
  at(kit, 4.9, y + 1.5, Z_BATH_SPLIT - hi - 0.008, FACE.nz, () => waterHeater(kit));
  downlight(kit, 5.0, 8.6, yB2, 4);
  at(kit, XE - 0.008, y + 1.5, 11.0, FACE.nx, () => waterHeater(kit));
  downlight(kit, 5.0, 10.85, Y_BATH1_CEIL, 3);

  // Bedside lamps, headboard lights, desk lamps/laptops and the tatami lantern.
  for (const z of [0.95, 2.0, 3.05, 9.1, 10.3, 11.5]) wallOutlet(kit, hp, y + 0.75, z, 'px');
  if (masterExtension) wallOutlet(kit, hp, y + 0.75, 13.0, 'px');
  for (const z of [0.95, 2.0, 3.05]) wallOutlet(kit, XE, y + 0.75, z, 'nx');
  for (const x of [1.3, 1.4, 4.75, 4.85]) wallOutlet(kit, x, y + 0.85, 0.1, 'pz');
  plate(kit, 5.1, y + 1.65, Z_BATH_SPLIT - hi, 'nz', 0.086); // bathroom 2 heater connection
  plate(kit, XE, y + 1.65, 11.25, 'nx', 0.086); // bathroom 1 heater connection
}

function masterDesk(kit: Kit) {
  at(kit, 1.2, Y_FF, Z_MASTER_EXTENSION_FRONT - 0.4, FACE.nz, () => desk(kit, 1.2));
  at(kit, 1.2, Y_FF, Z_MASTER_EXTENSION_FRONT - 1.05, FACE.pz, () => chair(kit));
}

/** Compact furniture stays in the west side of the extension, clear of the balcony door. */
function masterNook(kit: Kit, design: InteriorDesign) {
  const y = Y_FF, yC = Y_FF_CEIL;
  if (design.masterNook === 'tatami') {
    const zFront = Z_MASTER_EXTENSION_FRONT - 0.1;
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
  } else {
    if (design.masterNook === 'reading') {
      at(kit, 0.55, y, 13.45, FACE.px, () => sofa(kit, 0.9, 0.8));
      at(kit, 1.4, y, 13.45, 0, () => table(kit, 0.5, 0.5, 0.45));
    } else {
      masterDesk(kit);
    }
    ceilingLight(kit, 1.3, 13.55, yC, 2.5);
  }
}
