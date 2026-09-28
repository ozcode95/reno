import * as THREE from 'three';
import { buildRearExtension, buildMasterExtension, buildAutoGate, buildLKitchen } from './renovation';
import type { Kit, P2 } from './kit';
import {
  W, T_EXT, T_PARTY, T_INT, Z_FRONT, Z_LOT_REAR, Y_RENOVATED_GF_CEIL, Z_RENOVATED_BED4_REAR, RENOVATED_REAR_DOOR, Y_FF, Y_GF_CEIL, Y_FF_CEIL, Y_WALL_TOP, RISE, STAIR_TREADS,
  Z_STAIR_N, Z_CORE_S, Z_LIVING_N, X_STAIR_E, X_STAIR_W_STRIP, X_WELL_E, X_KITCHEN_OPEN_W, X_KITCHEN_OPEN_E, X_STAIR_FOOT, X_STAIR_TOP, X_BATH_W, Z_BATH_SPLIT,
  Z_EAVE_FRONT, Z_EAVE_REAR, Z_RIDGE, Y_RIDGE, ROOF_THICK, ROOF_PITCH, ROOF_TAN, roofTop, Z_REAR,
  Z_BALCONY_FRONT, Z_BALCONY_NOTCH, Z_MASTER_EXTENSION_FRONT, X_BALCONY_NOTCH, Y_BALCONY,
  X_ROOF_SPLIT, ROOF_DROP, Y_BATH_PARAPET, Y_BATH1_CEIL, stripRoofTop, Z_STRIP_RIDGE, Y_STRIP_RIDGE,
  Y_PORCH, Y_PORCH_GATE, Y_STEP, Z_STEP, X_PILLAR_E, Z_BATH_BOX, Y_PORCH_CEIL, X_PORCH_STRIP, Y_PORCH_STRIP, Y_BATH_BOX,
  X_DOOR_A, X_DOOR_B,
} from '../config';
import {
  wall, skin, lbox, jalousie, doorFrame, hingedDoor, hingedDoorLeaf, type HingedOpts, casement, slidingDoor, surround, railing,
  toilet, basin, shower, floorTrap, plate, wallOutlet, gateLeaf, type Opening,
} from './fixtures';
import { leafMovable, type SwingLeafSpec, type MovableSpec } from '../doors';
import type { MovableSink } from './fixtures';

const he = T_EXT / 2; // 0.1 (front / rear walls)
const hp = T_PARTY / 2; // 0.05 (party walls: inner faces at x = hp and W - hp)
const hi = T_INT / 2; // 0.06
const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
const deg = (d: number) => (d * Math.PI) / 180;

/*
 * Interior door openings (outer edge of the sage steel frame, along the wall), scaled off photos
 * 101339 / 101358 / 101451: bedrooms 0.92 m (leaf ~0.84 m), bathrooms 0.84 m (leaf ~0.76 m).
 * Interior frames have a slim 35 mm face.
 */
const FW = 0.035;
const KITCHEN_TILE_START = W - hp - 1.2;
const REAR_DOOR_A = 3.98, REAR_DOOR_B = KITCHEN_TILE_START;
// bathroom-3 rear window: 1.1 m x 0.65 m, 0.4 m from the inner face of the west bathroom wall (x = 1.51 + hi)
const BATH3_WIN_GAP = 0.4;
const BATH3_WIN = { a: 1.51 + hi + BATH3_WIN_GAP, b: 1.51 + hi + BATH3_WIN_GAP + 1.1, y0: 1.75, y1: 2.4 };
const KITCHEN_WINDOW_A = REAR_DOOR_B + 0.1, KITCHEN_WINDOW_B = KITCHEN_WINDOW_A + 0.7;
const DR = {
  bath3: [0.58, 1.42], bed4: [3.4, 4.32], // ground floor
  bed3: [1.9, 2.82], bed2: [3.12, 4.04], master: [2.9, 3.82], bath2: [4.1, 4.94], bath1: [10.26, 11.1], // first floor
} as const satisfies Record<string, readonly [number, number]>;

/* flat roof above the ensuite (behind the bathroom-box parapet) and the clerestory wall at its back */
// top of the flat roof slab: 0.1 m slab over the ensuite ceiling board (leaves a short parapet upstand)
const Y_FLAT = Math.min(Y_BATH_PARAPET - 0.05, Y_BATH1_CEIL + 0.05 + 0.1);
// the flat roof covers the whole ensuite; its back is the clerestory wall standing on the ensuite /
// bathroom-2 partition, whose jalousies are seen looking up from bathroom 2
const T_CLER = T_INT; // clerestory wall (under the strip eave) thickness
const Z_FLAT_BACK = Z_BATH_SPLIT + T_CLER / 2; // strip-roof eave line = outer face of the clerestory
// bathroom-2 wall tiles: light up to 2.1 m, then five 0.3 m dark courses up to the raised ceiling
const Y_BATH2_HIGH = Y_FF + 2.1 + 5 * 0.3; // 7.2 m, raised ceiling behind the clerestory (under the strip roof)
// clerestory jalousies: two tile courses high, in the top two dark courses, side by side and touching
const JAL_WEST = Math.max(X_ROOF_SPLIT + 0.1, X_BATH_W + hi + 0.04);
const JAL_EAST = 5.9;
const JAL_MID = (JAL_WEST + JAL_EAST) / 2;
const BATH2_JAL: Opening[] = [
  { a: JAL_WEST, b: JAL_MID, y0: Y_BATH2_HIGH - 0.6, y1: Y_BATH2_HIGH },
  { a: JAL_MID, b: JAL_EAST, y0: Y_BATH2_HIGH - 0.6, y1: Y_BATH2_HIGH },
];

/* corner window of the front bathroom box: front pane x0..x1 on the front wall, return pane z0..front on the west side */
const BW_CORNER = { x0: X_BATH_W - hi, x1: 4.4, z0: 11.92, y0: Y_FF + 1.85, y1: Y_FF + 2.35 };

function cornerWindow(kit: Kit) {
  const { x0, x1, z0, y0, y1 } = BW_CORNER;
  const zo = 12.29, xo = x0; // outer faces of the front wall / west side
  const f = 0.04, A = 'aluWhite', G = 'glassFrosted';
  const gz = zo - 0.08, gx = xo + 0.02; // glass planes
  // aluminium frame: head + sill on both panes, outer jambs, slim corner post
  for (const [ya, yb] of [[y1 - f, y1], [y0, y0 + f]]) {
    kit.box(xo, x1, ya, yb, gz - 0.03, gz + 0.03, A);
    kit.box(gx - 0.03, gx + 0.03, ya, yb, z0, gz, A);
  }
  kit.box(x1 - f, x1, y0, y1, gz - 0.03, gz + 0.03, A);
  kit.box(gx - 0.03, gx + 0.03, y0, y1, z0, z0 + f, A);
  kit.box(xo, xo + 0.035, y0, y1, gz - 0.015, gz + 0.02, A);
  kit.box(xo + 0.035, x1 - f, y0 + f, y1 - f, gz - 0.004, gz + 0.004, G);
  kit.box(gx - 0.004, gx + 0.004, y0 + f, y1 - f, z0 + f, gz - 0.015, G);
  // projecting white surround wrapping the corner (head, jambs, bottom, sill)
  const w = 0.08, d = 0.06, s = 0.12;
  kit.box(xo - d, x1 + w, y1, y1 + w, zo, zo + d, 'wallExt');
  kit.box(x1, x1 + w, y0 - w, y1, zo, zo + d, 'wallExt');
  kit.box(xo - d, x1, y0 - w, y0, zo, zo + d, 'wallExt');
  kit.box(xo - d - 0.03, x1 + w + 0.03, y0 - w - 0.04, y0 - w, zo, zo + s, 'wallExt');
  kit.box(xo - d, xo, y1, y1 + w, z0 - w, zo, 'wallExt');
  kit.box(xo - d, xo, y0 - w, y1, z0 - w, z0, 'wallExt');
  kit.box(xo - d, xo, y0 - w, y0, z0, zo, 'wallExt');
  kit.box(xo - s, xo, y0 - w - 0.04, y0 - w, z0 - w - 0.03, zo, 'wallExt');
}

/* hinged leaves of the main unit that swing at runtime (collected while building) */
const movSpecs: MovableSpec[] = [];
type Axis = 'x' | 'z';
function swingDoor(kit: Kit, id: string, label: string, level: 'gf' | 'ff', axis: Axis, c: number, t: number, a: number, b: number, y0: number, h: number, opt: HingedOpts & { open?: boolean }) {
  const { angle: _a, ...leaf } = hingedDoorLeaf(kit, axis, c, t, a, b, y0, h, opt);
  movSpecs.push(leafMovable({ ...leaf, id, label, level, maxAngle: opt.angle, open: opt.open ?? false }));
}
/** sink for the sashes / sliding panels of one window or glass door of the main unit */
function openable(id: string, label: string, level: 'gf' | 'ff'): MovableSink {
  return (p) => movSpecs.push({ ...p, id: `${id}-${p.index}`, label, level });
}

export interface UnitOpts {
  main: boolean;
  renovated?: boolean;
  /** maps logical group → kit group */
  G: (g: 'gf' | 'slab1' | 'ff' | 'ceil2' | 'roof' | 'site') => string;
}

/* ================================================================== */
/*  PARTY WALLS (shared between units, built per party line)           */
/* ================================================================== */

/** top of the surrounding ground plane – side walls run down to it so no gap shows below */
const Y_GROUND = -0.46;

export function partyWall(kit: Kit, x: number, type: 'west' | 'east', G: UnitOpts['G'], houseSide: 1 | -1 = 1, renovated = false) {
  const x0 = x - hp, x1 = x + hp;
  // face towards the house is interior paint, the other side is the exposed side wall
  const sideInt = houseSide > 0
    ? { px: 'wallInt', nx: 'wallExt', pz: 'wallExt', nz: 'wallExt', py: 'wallExt', ny: 'wallExt' }
    : { px: 'wallExt', nx: 'wallInt', pz: 'wallExt', nz: 'wallExt', py: 'wallExt', ny: 'wallExt' };
  // rear yard
  kit.group = G('site');
  if (!renovated) kit.box(x0, x1, Y_GROUND, 2.0, Z_LOT_REAR - 0.1, -he, 'wallExt');
  // house GF
  kit.group = G('gf');
  // One continuous interior finish through the extension avoids a bright exterior-material strip.
  kit.box(x0, x1, Y_GROUND, Y_FF, renovated ? Z_LOT_REAR - 0.1 : -he, Z_FRONT + he, sideInt);
  // house FF
  kit.group = G('ff');
  const zF = Z_FRONT + he;
  const zKnee = Z_FRONT - ROOF_DROP / ROOF_TAN; // where the lower strip roof soffit meets the wall top
  if (type === 'west') {
    kit.box(x0, x1, Y_FF, Y_WALL_TOP, -he, zF, sideInt);
  } else {
    // under the lower east-strip roof the wall top follows the roof soffit near the front
    const poly: P2[] = [[-he, Y_FF], [zF, Y_FF], [zF, stripRoofTop(zF) - ROOF_THICK], [zKnee, Y_WALL_TOP], [-he, Y_WALL_TOP]];
    const inX = houseSide > 0 ? x1 : x0; // face towards the house
    const outX = houseSide > 0 ? x0 : x1;
    kit.prismZY(poly, Math.min(inX, x), Math.max(inX, x), 'wallInt', 'wallExt');
    kit.prismZY(poly, Math.min(outX, x), Math.max(outX, x), 'wallExt', 'wallExt');
  }
  // porch side: a full-height side wall from the house front, ending in a straight pillar at the line of
  // the balcony notch (under the front end of the west balcony-level wall) – the same on both sides.
  // In front of the pillar the porch is open; on the east a beam carries the privacy wall on to the front
  kit.group = G('site');
  const porchSide = houseSide > 0 ? { px: 'wallPorch', rest: 'wallWhite' } : { nx: 'wallPorch', rest: 'wallWhite' };
  const zPil = Z_BALCONY_NOTCH;
  kit.box(x0, x1, Y_GROUND, Y_PORCH_CEIL, Z_FRONT + he, zPil - 0.48, porchSide);
  kit.box(x0, x1, Y_GROUND, Y_PORCH_CEIL, zPil - 0.48, zPil, 'wallWhite');
  if (type === 'east') kit.box(x0, x1, 3.0, Y_PORCH_CEIL, zPil, Z_BALCONY_FRONT, 'wallWhite');
  // side boundary wall from the pillar to the street, and the boundary pier at the street
  kit.box(x0, x1, Y_GROUND, 1.5, zPil, 18.35, 'wallWhite');
  kit.box(x - 0.22, x + 0.22, Y_GROUND, renovated ? 1.95 : 1.5, 18.35, 18.75, 'wallWhite');
  // balcony level
  kit.group = G('ff');
  if (type === 'west') {
    kit.box(x0, x1, 3.35, renovated ? Y_FF_CEIL : 6.1, Z_FRONT + he, renovated ? Z_MASTER_EXTENSION_FRONT + he : Z_BALCONY_NOTCH, 'wallExt');
  } else {
    kit.box(x0, x1, 3.35, Y_BATH_PARAPET, Z_FRONT + he, 12.29, houseSide > 0 ? { px: 'wallInt', rest: 'wallExt' } : { nx: 'wallInt', rest: 'wallExt' });
    // privacy wall beside the balcony (≈ 1.7 m above the balcony floor)
    kit.box(x0, x1, 3.35, Y_BALCONY + 1.7, 12.29, Z_BALCONY_FRONT, 'wallExt');
  }
  // firewall above the roof
  kit.group = G('roof');
  const zR = Z_EAVE_REAR - 0.02;
  if (type === 'west') {
    const poly: P2[] = [
      [zR, 6.6],
      [Z_EAVE_FRONT + 0.02, 6.6],
      [Z_EAVE_FRONT + 0.02, roofTop(Z_EAVE_FRONT) + 0.3],
      [Z_RIDGE, Y_RIDGE + 0.3],
      [zR, roofTop(Z_EAVE_REAR) + 0.3],
    ];
    kit.prismZY(poly, x0, x1, 'wallExt', 'wallExt');
  } else {
    // follows the lower east-strip roof and ends on the bathroom-box parapet
    const zE = 12.29;
    const poly: P2[] = [
      [zR, stripRoofTop(zR) + 0.3],
      [Z_STRIP_RIDGE, Y_STRIP_RIDGE + 0.3],
      [zE, stripRoofTop(zE) + 0.3],
      [zE, Y_BATH_PARAPET],
      [zF, Y_BATH_PARAPET],
      [zF, stripRoofTop(zF) - ROOF_THICK],
      [zKnee, Y_WALL_TOP],
      [-he, Y_WALL_TOP],
      [-he, 6.6],
      [zR, 6.6],
    ];
    kit.prismZY(poly, x0, x1, 'wallExt', 'wallExt');
  }
}

/* ================================================================== */
/*  UNIT                                                               */
/* ================================================================== */

export function buildUnit(kit: Kit, o: UnitOpts) {
  const { main, G } = o;
  const renovated = main && !!o.renovated;
  const rearZ = renovated ? Z_LOT_REAR : 0;
  const rearDoorA = renovated ? RENOVATED_REAR_DOOR.a : REAR_DOOR_A;
  const rearDoorB = renovated ? RENOVATED_REAR_DOOR.b : REAR_DOOR_B;
  if (main) movSpecs.length = 0;
  const mv = (id: string, label: string, level: 'gf' | 'ff') => (main ? openable(id, label, level) : undefined);

  /* ---------------- Ground floor exterior walls ---------------- */
  kit.group = G('gf');
  const gfRearOpen: Opening[] = [
    { a: 0.25, b: 1.3, y0: 0.9, y1: 2.1 }, // bedroom 4: leaves a short wall pier against the bathroom-3 wall
    BATH3_WIN,
    { a: REAR_DOOR_A, b: REAR_DOOR_B, y0: 0, y1: 2.55 },
    { a: KITCHEN_WINDOW_A, b: KITCHEN_WINDOW_B, y0: 1.1, y1: 2.55 },
  ];
  if (renovated) {
    kit.box(1.51, W - hp, Y_GF_CEIL - 0.3, Y_FF, -he, he, 'wallInt');
    buildRearExtension(kit, G, mv, movSpecs);
  } else wall(kit, 'x', 0, hp, W - hp, -0.15, Y_FF, T_EXT, 'wallInt', 'wallExt', gfRearOpen, 'wallInt');
  const gfFrontOpen: Opening[] = [
    { a: X_DOOR_A, b: X_DOOR_B, y0: 0, y1: 2.4 },
    { a: 3.1, b: 5.3, y0: 0, y1: 2.4 },
  ];
  wall(kit, 'x', Z_FRONT, hp, W - hp, -0.15, Y_FF, T_EXT, 'wallPorch', 'wallInt', gfFrontOpen, 'wallInt');
  // tiled thresholds = the second entrance step (riser tiled down to the first step)
  for (const o of gfFrontOpen) kit.box(o.a, o.b, Y_STEP, 0.004, Z_FRONT - he, Z_FRONT + he + 0.012, 'floorTile');
  kit.box(rearDoorA, rearDoorB, -0.02, 0.004, rearZ - he, rearZ + he, 'floorTile');
  // first entrance step: full width, from the west wall to the pillar at the east end of the façade
  kit.box(hp, X_PILLAR_E, -0.45, Y_STEP, Z_FRONT + he, Z_STEP, 'concreteLight');
  kit.box(X_PILLAR_E, W - hp, -0.45, Y_PORCH_CEIL, Z_FRONT + he, Z_BATH_BOX, 'wallPorch', 'nz');
  // exterior sills at rear
  for (const w of (renovated ? [] : [gfRearOpen[0], gfRearOpen[1], gfRearOpen[3]])) {
    lbox(kit, 'x', 0, w.a - 0.04, w.b + 0.04, w.y0 - 0.05, w.y0, -he - 0.045, -he, 'wallExt');
  }

  // windows / doors in exterior walls
  if (!renovated) casement(kit, 'x', 0, 0.25, 1.3, 0.9, 2.1, { panes: 2, nOff: -0.03, movable: mv('win-bed4', 'Bedroom 4 window', 'gf') });
  if (!renovated) casement(kit, 'x', 0, BATH3_WIN.a, BATH3_WIN.b, BATH3_WIN.y0, BATH3_WIN.y1, { panes: 2, nOff: -0.03, glass: 'glassFrosted', hung: 'top', movable: mv('win-bath3', 'Bathroom 3 window', 'gf') });
  if (!renovated) casement(kit, 'x', rearZ, KITCHEN_WINDOW_A, KITCHEN_WINDOW_B, 1.1, 2.55, { panes: 1, nOff: -0.03, flip: true, movable: mv('win-kitchen', 'Kitchen window', 'gf') });
  slidingDoor(kit, 'x', Z_FRONT, 3.1, 5.3, 0, 2.4, { panels: 3, nOff: 0.04, movable: mv('slide-living', 'Living room sliding door', 'gf'), group: 'slide-living' });
  // main door frame (unequal double leaf). The leaves are separate, swinging objects: see mainDoorLeaves()
  doorFrame(kit, 'x', Z_FRONT, T_EXT, X_DOOR_A, X_DOOR_B, 0, 2.4);
  // rear kitchen door with fanlight (opens out to yard)
  const rearOpt: HingedOpts = { hingeAtB: true, openTo: -1, angle: deg(100), mat: 'doorRear', knob: 'lever', transom: 2.55, frameW: FW };
  if (main) swingDoor(kit, 'rear', 'Kitchen back door', 'gf', 'x', rearZ, T_EXT, rearDoorA, rearDoorB, 0, 2.1, rearOpt);
  else hingedDoor(kit, 'x', 0, T_EXT, rearDoorA, rearDoorB, 0, 2.1, { ...rearOpt, angle: 0 });
  lbox(kit, 'x', rearZ, rearDoorA + FW, rearDoorB - FW, 2.1 + FW, 2.55 - FW, -0.004, 0.004, 'glass');

  // porch façade details: meter box + surface conduit. The conduit runs below the notch-line beam
  // (underside Y_PORCH_STRIP) on the west, then wraps across the east pillar (west face → front face)
  const yC = Y_PORCH_STRIP - 0.07, zC = Z_FRONT + he + 0.02;
  const xP = X_PILLAR_E - 0.02, zP = Z_BATH_BOX + 0.02;
  lbox(kit, 'x', Z_FRONT, 2.6, 2.86, 1.42, 1.8, he, he + 0.11, 'plasticGrey');
  lbox(kit, 'x', Z_FRONT, 2.64, 2.82, 1.47, 1.62, he + 0.11, he + 0.115, 'glass');
  kit.rod(V(0.3, yC, zC), V(xP, yC, zC), 0.012, 'black');
  kit.rod(V(2.73, 1.8, zC), V(2.73, yC, zC), 0.012, 'black');
  kit.rod(V(xP, yC, zC), V(xP, yC, zP), 0.012, 'black'); // along the pillar's west face
  kit.rod(V(xP, yC, zP), V(W, yC, zP), 0.012, 'black'); // across the pillar's front face
  for (let x = 0.5; x < X_PILLAR_E - 0.1; x += 0.6) lbox(kit, 'x', Z_FRONT, x - 0.015, x + 0.015, yC - 0.03, yC + 0.03, he, he + 0.04, 'black');
  // saddle clips on the pillar
  kit.box(X_PILLAR_E - 0.04, X_PILLAR_E, yC - 0.03, yC + 0.03, (zC + zP) / 2 - 0.015, (zC + zP) / 2 + 0.015, 'black');
  kit.box((X_PILLAR_E + W) / 2 - 0.015, (X_PILLAR_E + W) / 2 + 0.015, yC - 0.03, yC + 0.03, Z_BATH_BOX, Z_BATH_BOX + 0.04, 'black');

  if (main) buildGroundInterior(kit, renovated);

  /* ---------------- First floor slab & balcony slab ---------------- */
  kit.group = G('slab1');
  const slab = (x0: number, x1: number, z0: number, z1: number, top: string, bottom = 'ceiling', y0 = Y_GF_CEIL, y1 = Y_FF) =>
    kit.box(x0, x1, y0, y1, z0, z1, { py: top, ny: bottom, rest: 'ceiling' });
  if (renovated) {
    // Flat plaster ceiling across the ground floor, hiding the beams and old dropped sections. Solid
    // down to the slab so its edge beside the open stair hall reads as a plastered bulkhead.
    // Kept with the slab so the ground-floor plan / cutaway views stay open from above.
    const pc = (x0: number, x1: number, z0: number, z1: number) => kit.box(x0, x1, Y_RENOVATED_GF_CEIL, Y_GF_CEIL, z0, z1, 'ceiling');
    pc(hp, W - hp, Z_LOT_REAR + he, Z_STAIR_N + hi); // extension, bathroom, bedroom 4, kitchen
    pc(X_STAIR_E - T_INT, W - hp, Z_STAIR_N + hi, Z_LIVING_N - hi); // dining (stair hall stays open)
    pc(hp, W - hp, Z_LIVING_N - hi, Z_FRONT - he); // living room
  }
  if (main) {
    slab(hp, W - hp, he, Z_STAIR_N + hi, 'floorTile');
    slab(X_WELL_E, W - hp, Z_STAIR_N + hi, Z_CORE_S + hi, 'floorTile');
    slab(X_STAIR_TOP, W - hp, Z_CORE_S + hi, Z_LIVING_N - hi, 'floorTile');
    slab(hp, X_BATH_W + hi, Z_LIVING_N - hi, Z_FRONT - he, 'floorTile');
    slab(X_BATH_W + hi, W - hp, Z_LIVING_N - hi, Z_BATH_SPLIT, 'bathFloor');
    slab(X_BATH_W + hi, W - hp, Z_BATH_SPLIT, Z_FRONT + he, 'bathFloor');
  }
  slab(X_BATH_W - hi, W - hp, Z_FRONT + he, 12.29, 'bathFloor', 'soffit', 3.35, Y_FF);
  const bal = (x0: number, x1: number, z0: number, z1: number) => kit.box(x0, x1, 3.35, Y_BALCONY, z0, z1, { py: 'balconyTile', ny: 'soffit', rest: 'wallExt' });
  if (renovated) {
    bal(hp, X_BALCONY_NOTCH, Z_FRONT + he, Z_MASTER_EXTENSION_FRONT + he);
    bal(X_BALCONY_NOTCH, X_BATH_W - hi, Z_FRONT + he, Z_BALCONY_NOTCH);
  } else bal(hp, X_BATH_W - hi, Z_FRONT + he, Z_BALCONY_NOTCH);
  bal(X_BALCONY_NOTCH, X_BATH_W - hi, Z_BALCONY_NOTCH, Z_BALCONY_FRONT);
  bal(X_BATH_W - hi, W - hp, 12.29, Z_BALCONY_FRONT);
  // porch ceiling (photos 101108 / 102754): flat soffit – the front edge beam (full width east of the
  // balcony notch), one slim beam running from the house front out to the front beam along the notch line
  // (the ceiling between it and the west wall stays at soffit height), the beam under the notch's back
  // wall, and a dropped box under the bathroom projection, from the east pillar to the master side
  kit.box(X_BALCONY_NOTCH, W - hp, 3.0, Y_PORCH_CEIL, Z_BALCONY_FRONT - 0.2, Z_BALCONY_FRONT, 'wallExt');
  // vertical faces are painted like the rest of the exterior (same white as the slab edge above)
  kit.box(X_BALCONY_NOTCH, X_PORCH_STRIP, Y_PORCH_STRIP, Y_PORCH_CEIL, Z_FRONT + he, Z_BALCONY_FRONT - 0.2, { ny: 'soffit', rest: 'wallExt' }, 'py');
  kit.box(X_BATH_W - hi, X_PILLAR_E, Y_BATH_BOX, Y_PORCH_CEIL, Z_FRONT + he, Z_BATH_BOX, { ny: 'soffit', rest: 'wallExt' }, 'py nz px');

  /* ---------------- First floor exterior walls ---------------- */
  kit.group = G('ff');
  const ffRearOpen: Opening[] = [
    { a: 0.95, b: 2.1, y0: Y_FF + 0.9, y1: Y_FF + 2.1 },
    { a: 4.0, b: 5.15, y0: Y_FF + 0.9, y1: Y_FF + 2.1 },
  ];
  wall(kit, 'x', 0, hp, W - hp, Y_FF, Y_WALL_TOP, T_EXT, 'wallInt', 'wallExt', ffRearOpen, 'wallInt');
  ffRearOpen.forEach((w, i) => {
    casement(kit, 'x', 0, w.a, w.b, w.y0, w.y1, { panes: 2, nOff: -0.03, movable: mv(`win-ff-rear${i}`, i === 0 ? 'Bedroom 3 window' : 'Bedroom 2 window', 'ff') });
    lbox(kit, 'x', 0, w.a - 0.04, w.b + 0.04, w.y0 - 0.05, w.y0, -he - 0.045, -he, 'wallExt');
  });
  if (renovated) buildMasterExtension(kit, G, mv);
  else {
  // master bedroom front (grey feature wall)
  const mWin: Opening = { a: 0.45, b: 0.95, y0: Y_FF + 1.25, y1: Y_FF + 2.3 };
  const mSlide: Opening = { a: 1.4, b: 3.2, y0: Y_FF, y1: Y_FF + 2.3 }; // shifted 0.3 m west (right, seen from inside)
  wall(kit, 'x', Z_FRONT, hp, X_BATH_W - hi, Y_FF, Y_WALL_TOP, T_EXT, 'wallExtGrey', 'wallInt', [mWin, mSlide], 'wallExt');
  casement(kit, 'x', Z_FRONT, mWin.a, mWin.b, mWin.y0, mWin.y1, { panes: 1, nOff: 0.03, movable: mv('win-master', 'Master bedroom window', 'ff') });
  slidingDoor(kit, 'x', Z_FRONT, mSlide.a, mSlide.b, mSlide.y0, mSlide.y1, { panels: 2, nOff: 0.03, movable: mv('slide-master', 'Master bedroom sliding door', 'ff') });
  surround(kit, 'x', Z_FRONT, he, 1, mWin.a, mWin.b, mWin.y0, mWin.y1, { w: 0.07 });
  surround(kit, 'x', Z_FRONT, he, 1, mSlide.a, mSlide.b, mSlide.y0 + 0.07, mSlide.y1, { w: 0.07 });
  }
  // bath projection (white box): a corner window wrapping its west corner (photos 101103 / 101057) + one small window
  const bw1: Opening = { a: BW_CORNER.x0, b: BW_CORNER.x1, y0: BW_CORNER.y0, y1: BW_CORNER.y1 };
  const bw2: Opening = { a: 5.15, b: 5.7, y0: Y_FF + 1.85, y1: Y_FF + 2.35 };
  wall(kit, 'x', 12.19, X_BATH_W - hi, W - hp, 3.35, Y_BATH1_CEIL, T_EXT, 'wallExt', 'wallInt', [bw1, bw2], 'wallExt');
  // parapet above the ensuite ceiling – hides the lower strip roof behind it
  kit.box(X_BATH_W - hi, W - hp, Y_BATH1_CEIL, Y_BATH_PARAPET, 12.09, 12.29, 'wallExt');
  // under the main roof's eave the box wall runs up to the soffit
  kit.box(X_BATH_W - hi, X_ROOF_SPLIT, Y_BATH_PARAPET, roofTop(12.29) - ROOF_THICK, 12.09, 12.29, 'wallExt');
  // west side of the box (faces the balcony), cut by the return pane of the corner window
  {
    const zF = Z_FRONT + he, { z0: cz0, y0: cy0, y1: cy1 } = BW_CORNER;
    const sx0 = X_BATH_W - hi, sx1 = X_BATH_W + hi;
    kit.prismZY([[zF, 3.35], [12.29, 3.35], [12.29, cy0], [zF, cy0]], sx0, sx1, 'wallExt', 'wallExt');
    kit.prismZY([[zF, cy0], [cz0, cy0], [cz0, cy1], [zF, cy1]], sx0, sx1, 'wallExt', 'wallExt');
    kit.prismZY([[zF, cy1], [12.29, cy1], [12.29, 6.67], [zF, 6.9]], sx0, sx1, 'wallExt', 'wallExt');
  }
  cornerWindow(kit);
  // clerestory under the strip-roof eave, facing the flat roof: two side-by-side jalousie windows
  // (front elevation shows the louvres above the bathroom box); seen from bathroom 2 looking up
  {
    const zc = Z_FLAT_BACK - T_CLER / 2;
    const yTop = stripRoofTop(Z_FLAT_BACK) - ROOF_THICK + 0.02;
    const jal = BATH2_JAL;
    // spans the whole bathroom width so the raised ceiling void is closed (west part hides under the main roof)
    wall(kit, 'x', zc, X_BATH_W - hi, W - hp, Y_BATH1_CEIL + 0.05, yTop, T_CLER, 'wallExt', 'wallInt', jal, 'wallExt');
    for (const j of jal) jalousie(kit, 'x', zc, j.a, j.b, j.y0, j.y1, { nOff: 0.02, out: 1 });
    if (main) {
      // bathroom-2 walls (landing side, west side) carried up to its raised ceiling
      kit.box(X_BATH_W + hi, W - hp, Y_FF_CEIL, Y_BATH2_HIGH, Z_LIVING_N - hi, Z_LIVING_N + hi, 'wallInt');
      kit.box(X_BATH_W - hi, X_BATH_W + hi, Y_FF_CEIL, Y_BATH2_HIGH, Z_LIVING_N - hi, Z_BATH_SPLIT + hi, 'wallInt');
    }
  }
  for (const w of [bw2]) {
    casement(kit, 'x', 12.19, w.a, w.b, w.y0, w.y1, { panes: 1, nOff: 0.02, glass: 'glassFrosted', hung: 'top', movable: mv('win-bath1', 'Bathroom 1 window', 'ff') });
    surround(kit, 'x', 12.19, he, 1, w.a, w.b, w.y0, w.y1, { w: 0.08, depth: 0.06, sill: 0.12 });
  }

  /* ---------------- Balcony parapets & glass (measured off photos 101103 / 101556) ---------------- */
  // front: corner post, 3 wide glass panels between 0.22 m posts, then a short solid block to the east wall
  const zf = Z_BALCONY_FRONT, xn = X_BALCONY_NOTCH, zn = Z_BALCONY_NOTCH;
  const PW = 0.22, X_SOLID = 4.9, yG0 = Y_BALCONY + 0.17, yG1 = Y_BALCONY + 1.08, yP = Y_BALCONY + 1.17;
  const posts = [xn, 2.28, 3.59];
  kit.box(xn, X_SOLID, Y_BALCONY, Y_BALCONY + 0.15, zf - 0.18, zf, 'wallExt'); // upstand
  for (const p of posts) kit.box(p, p + PW, Y_BALCONY, yP, zf - 0.2, zf, 'wallExt');
  const bays: [number, number][] = [[posts[0] + PW, posts[1]], [posts[1] + PW, posts[2]], [posts[2] + PW, X_SOLID]];
  for (const [a, b] of bays) {
    kit.box(a + 0.01, b - 0.01, yG0, yG1, zf - 0.096, zf - 0.084, 'glassRail');
    for (const cx of [a + 0.2, b - 0.2]) kit.box(cx - 0.03, cx + 0.03, Y_BALCONY + 0.15, Y_BALCONY + 0.23, zf - 0.11, zf - 0.07, 'chrome');
  }
  kit.box(X_SOLID, W - hp, Y_BALCONY, Y_BALCONY + 1.1, zf - 0.18, zf, 'wallExt');
  // Renovated side railing meets the bedroom facade without the old return pier.
  const returnStart = renovated ? Z_MASTER_EXTENSION_FRONT + he : zn;
  if (!renovated) {
    kit.box(xn, xn + PW, Y_BALCONY, yP, zn - 0.2, zn, 'wallExt');
    kit.box(hp, xn, Y_PORCH_STRIP, Y_BALCONY + 1.1, zn - 0.15, zn, 'wallExt');
  }
  kit.box(xn, xn + 0.15, Y_BALCONY, Y_BALCONY + 0.15, returnStart, zf - 0.2, 'wallExt');
  kit.box(xn + 0.069, xn + 0.081, yG0, yG1, returnStart + 0.01, zf - 0.21, 'glassRail');
  for (const cz of [returnStart + 0.22, zf - 0.42]) kit.box(xn + 0.045, xn + 0.105, Y_BALCONY + 0.15, Y_BALCONY + 0.23, cz - 0.03, cz + 0.03, 'chrome');
  if (renovated) {
    for (const y of [yG0 + 0.12, yG1 - 0.12]) {
      kit.box(xn + 0.045, xn + 0.105, y - 0.025, y + 0.025, returnStart, returnStart + 0.045, 'chrome');
    }
  }
  floorTrap(kit, 5.6, Y_BALCONY, 16.1);

  if (main) buildFirstInterior(kit, G);

  /* ---------------- FF ceiling ---------------- */
  if (main) {
    kit.group = G('ceil2');
    kit.box(hp, W - hp, Y_FF_CEIL, Y_FF_CEIL + 0.05, he, Z_LIVING_N + hi, 'ceiling');
    kit.box(hp, X_BATH_W + hi, Y_FF_CEIL, Y_FF_CEIL + 0.05, Z_LIVING_N + hi, Z_BATH_SPLIT, 'ceiling');
    // bathroom 2 rises under the strip roof, up to the clerestory with the jalousies
    kit.box(X_BATH_W + hi, W - hp, Y_BATH2_HIGH, Y_BATH2_HIGH + 0.05, Z_LIVING_N + hi, Z_BATH_SPLIT - hi, 'ceiling');
    kit.box(hp, X_BATH_W, Y_FF_CEIL, Y_FF_CEIL + 0.05, Z_BATH_SPLIT, Z_FRONT - he, 'ceiling');
    // ensuite sits under the lower strip roof → lower ceiling
    kit.box(X_BATH_W, W - hp, Y_BATH1_CEIL, Y_BATH1_CEIL + 0.05, Z_BATH_SPLIT, 12.09, 'ceiling');
  }

  /* ---------------- Roof ---------------- */
  kit.group = G('roof');
  buildRoof(kit);

  /* ---------------- Site: porch, gate, rear yard ---------------- */
  kit.group = G('site');
  // porch slab: falls 150 mm from the gate towards the floor trap at the foot of the steps
  kit.prismZY([
    [Z_FRONT + he, -0.45], [18.75, -0.45], [18.75, Y_PORCH_GATE], [Z_STEP, Y_PORCH], [Z_FRONT + he, Y_PORCH],
  ], hp, W - hp, 'concreteLight', (_nz, ny) => (ny > 0.5 ? 'concretePorch' : 'concreteLight'));
  if (renovated) buildAutoGate(kit, movSpecs);
  else {
  // front boundary (measured off photos 101057 / 101103): side pier (party wall) – low wall –
  // gate pillar – double swing gate – gate pillar – low wall – side pier
  const GX0 = 1.04, GX1 = 4.29, GM = (GX0 + GX1) / 2, ZG = 18.6;
  const P_TOP = 1.28, LOW_TOP = 1.1;
  kit.box(0.61, GX0, -0.2, P_TOP, 18.4, 18.78, 'wallWhite'); // "45" pillar
  kit.box(GX1, 4.66, -0.2, P_TOP, 18.4, 18.78, 'wallWhite');
  kit.box(0.22, 0.61, -0.2, LOW_TOP, 18.55, 18.72, 'wallWhite');
  kit.box(4.66, W - 0.22, -0.2, LOW_TOP, 18.55, 18.72, 'wallWhite');
  gateLeaf(kit, GX0 + 0.03, GM - 0.005, ZG, -0.12, 1.22);
  gateLeaf(kit, GM + 0.005, GX1 - 0.03, ZG, -0.12, 1.22);
  kit.box(GM - 0.03, GM + 0.03, 0.5, 0.62, ZG - 0.04, ZG + 0.04, 'galv'); // latch
  for (const [hx, y] of [[GX0 + 0.015, 0.05], [GX0 + 0.015, 0.95], [GX1 - 0.015, 0.05], [GX1 - 0.015, 0.95]] as [number, number][]) {
    kit.box(hx - 0.02, hx + 0.02, y, y + 0.1, ZG - 0.03, ZG + 0.03, 'galv'); // hinges
  }
  // rear yard floor, low wall + railing, rear gate
  kit.box(hp, W - hp, -0.45, -0.1, Z_LOT_REAR + 0.1, -he, 'concrete');
  kit.box(hp, 4.0, Y_GROUND, 0.5, Z_LOT_REAR - 0.1, Z_LOT_REAR + 0.1, 'wallExt');
  kit.box(4.9, W - hp, Y_GROUND, 0.5, Z_LOT_REAR - 0.1, Z_LOT_REAR + 0.1, 'wallExt');
  for (const [a, b] of [[hp, 4.0], [4.9, W - hp]] as [number, number][]) {
    kit.box(a, b, 0.5, 0.54, Z_LOT_REAR - 0.02, Z_LOT_REAR + 0.02, 'railBlack');
    kit.box(a, b, 1.46, 1.5, Z_LOT_REAR - 0.02, Z_LOT_REAR + 0.02, 'railBlack');
    const n = Math.round((b - a) / 0.12);
    for (let i = 1; i < n; i++) {
      const x = a + ((b - a) * i) / n;
      kit.box(x - 0.01, x + 0.01, 0.54, 1.46, Z_LOT_REAR - 0.01, Z_LOT_REAR + 0.01, 'railBlack');
    }
  }
  gateLeaf(kit, 4.02, 4.88, Z_LOT_REAR, -0.08, 1.55, 'railBlack');
  kit.box(4.0, 5.0, -0.1, -0.01, -0.6, -he, 'concreteLight');
  // house number + stainless letter slot on the "45" pillar, door-bell switch on the right pillar
  if (main) {
    const pc = (0.61 + GX0) / 2;
    kit.box(pc - 0.1, pc + 0.1, 1.13, 1.24, 18.78, 18.786, 'plaque45');
    kit.box(pc - 0.13, pc + 0.13, 0.94, 1.07, 18.78, 18.792, 'chrome');
    kit.box(pc - 0.1, pc + 0.1, 1.0, 1.015, 18.792, 18.794, 'black');
    kit.box(4.44, 4.52, 1.04, 1.11, 18.78, 18.79, 'plasticWhite');
  }
  }
}

/* ================================================================== */
/*  MAIN DOOR LEAVES (built separately so they can swing)              */
/* ================================================================== */

/** every openable part of the main unit (doors, window sashes, sliding glass panels); call after buildUnit */
export function allOpenables(): MovableSpec[] {
  return [...mainDoorLeaves().map(leafMovable), ...movSpecs];
}

/** unequal double leaf of the entrance door, both opening inwards; closed by default */
export function mainDoorLeaves(): SwingLeafSpec[] {
  const f = 0.045, gap = 0.004;
  const a = X_DOOR_A + f + gap, b = X_DOOR_B - f - gap; // hinge lines
  const wMain = 0.9; // active leaf (lever); the narrow leaf takes the rest
  const common = { height: 2.345, y0: 0.006, mat: 'doorMain', thick: 0.045, swing: [0, -1] as [number, number], maxAngle: deg(84), level: 'gf' as const };
  return [
    { ...common, id: 'main', label: 'Front door', hinge: [a, Z_FRONT], dir: [1, 0], width: wMain, knob: 'lever' },
    { ...common, id: 'side', label: 'Front door (narrow leaf)', hinge: [b, Z_FRONT], dir: [-1, 0], width: b - a - wMain - 0.007, knob: 'none' },
  ];
}

/* ================================================================== */
/*  GROUND FLOOR INTERIOR                                              */
/* ================================================================== */

/** single large-rocker switch on a wall plate, optionally with a red indicator on the rocker's lower edge */
function bigSwitch(kit: Kit, xf: number, y: number, z: number, normal: 'px' | 'nx' | 'pz' | 'nz', led = false) {
  plate(kit, xf, y, z, normal);
  const onX = normal === 'px' || normal === 'nx';
  const sg = normal === 'px' || normal === 'pz' ? 1 : -1;
  const d = sg * 0.021;
  const rocker = onX ? new THREE.BoxGeometry(0.012, 0.052, 0.06) : new THREE.BoxGeometry(0.06, 0.052, 0.012);
  const rockerTransform = (onX ? new THREE.Matrix4().makeRotationZ(-0.12 * sg) : new THREE.Matrix4().makeRotationX(0.12))
    .setPosition(xf + (onX ? d : 0), y, z + (onX ? 0 : d));
  kit.geom(rocker, 'plasticWhite', rockerTransform);
  rocker.dispose();
  if (led) {
    const o = sg * 0.0065;
    const indicator = onX ? new THREE.BoxGeometry(0.001, 0.003, 0.008) : new THREE.BoxGeometry(0.008, 0.003, 0.001);
    kit.geom(indicator, 'switchIndicatorRed', rockerTransform.clone()
      .multiply(new THREE.Matrix4().makeTranslation(onX ? o : 0, -0.016, onX ? 0 : o)));
    indicator.dispose();
  }
}

/** Multi-gang switch with narrow rockers side by side on any wall face. */
function gangSwitch(kit: Kit, x: number, y: number, zf: number, normal: 'px' | 'nx' | 'pz' | 'nz', buttons = 3) {
  plate(kit, x, y, zf, normal);
  const rotY = { pz: 0, px: Math.PI / 2, nz: Math.PI, nx: -Math.PI / 2 }[normal];
  const transform = new THREE.Matrix4().makeRotationY(rotY).setPosition(x, y, zf);
  for (let i = 0; i < buttons; i++) {
    const rocker = new THREE.BoxGeometry(0.019, 0.052, 0.012);
    kit.geom(rocker, 'plasticWhite', transform.clone().multiply(new THREE.Matrix4().makeRotationX(0.12)
      .setPosition((i - (buttons - 1) / 2) * 0.022, 0, 0.021)));
    rocker.dispose();
  }
}

function buildGroundInterior(kit: Kit, renovated = false) {
  const H = Y_GF_CEIL;
  const WI = 'wallInt';
  const bathEast = 3.88; // shorten the partition beside the rear kitchen door by 10 cm
  // floors
  const floor = (x0: number, x1: number, z0: number, z1: number, mat: string, top = 0) => kit.box(x0, x1, -0.3, top, z0, z1, { py: mat, rest: 'concreteLight' });
  if (renovated) {
    // Continuous tile surface across the former bathroom and rear-wall boundaries.
    floor(hp, W - hp, Z_LOT_REAR + he, Z_FRONT - he, 'floorTile');
  } else {
    floor(1.51 + hi, bathEast - hi, he, 1.53 - hi, 'bathFloor', -0.015);
    floor(hp, 1.51 + hi, he, 1.53 - hi, 'floorTile');
    floor(bathEast - hi, W - hp, he, 1.53 - hi, 'floorTile');
    floor(hp, W - hp, 1.53 - hi, Z_FRONT - he, 'floorTile');
  }

  // internal walls
  const bedroomSideWindow: Opening = { a: 0.3, b: 2.5, y0: 1.0, y1: 2.2 };
  if (renovated) {
    // Close the old window wall; the larger slider faces the kitchen on the east side.
    wall(kit, 'x', Z_RENOVATED_BED4_REAR, 1.96, 3.1 + hi, 0, H, T_INT, WI, WI);
    slidingDoor(kit, 'z', 3.1, bedroomSideWindow.a, bedroomSideWindow.b, bedroomSideWindow.y0, bedroomSideWindow.y1,
      { panels: 2, glass: 'glass', nOff: 0.03, movable: openable('win-bed4', 'Bedroom 4 sliding window', 'gf'), group: 'win-bed4' });
    lbox(kit, 'z', 3.1, bedroomSideWindow.a - 0.04, bedroomSideWindow.b + 0.04,
      bedroomSideWindow.y0 - 0.05, bedroomSideWindow.y0, hi, hi + 0.045, 'wallInt');
  } else {
  wall(kit, 'z', 1.51, he, 1.53 + hi, 0, H, T_INT, WI, WI);
  wall(kit, 'x', 1.53, 1.51 - hi, bathEast + hi, 0, H, T_INT, WI, WI);
  wall(kit, 'z', bathEast, he, 1.53 - hi, 0, H, T_INT, WI, WI, [{ a: DR.bath3[0], b: DR.bath3[1], y0: 0, y1: 2.1 }]);
  }
  wall(kit, 'z', 3.1, renovated ? Z_RENOVATED_BED4_REAR + hi : 1.53 + hi, Z_STAIR_N - hi, 0, H, T_INT, WI, WI,
    [...(renovated ? [bedroomSideWindow] : []), { a: DR.bed4[0], b: DR.bed4[1], y0: 0, y1: 2.1 }]);
  // stair back wall runs on past the foot of flight 1 as a short pier, then the kitchen opening (photos 101153 / 101157)
  wall(kit, 'x', Z_STAIR_N, hp, X_KITCHEN_OPEN_W, 0, H, T_INT, WI, WI);
  wall(kit, 'x', Z_STAIR_N, X_KITCHEN_OPEN_E, W - hp, 0, H, T_INT, WI, WI);
  // no wall at Z_CORE_S: the space under flight 2 / landing / flight 3 is open (plan + photos)
  wall(kit, 'x', Z_LIVING_N, hp, X_STAIR_E, 0, H, T_INT, WI, WI);
  // ceiling beams: over the opening from the dining into the living room only (photos 101803 / 101813)
  // (same thickness as the wall below, so it runs on flush from the wall end)
  const brickCourse = 0.075; // brick plus mortar; used for the requested beam drops
  kit.box(X_STAIR_E, X_BATH_W - hi, H - 0.3 - 2 * brickCourse, H, Z_LIVING_N - hi, Z_LIVING_N + hi, WI);
  // dropped ceiling below the first-floor bathrooms (sunken bath slabs): the living-room ceiling steps
  // down 0.575 m east of the bathroom wall line, from the living back wall to the front wall
  kit.box(X_BATH_W - hi, W - hp, H - 0.5 - brickCourse, H, Z_LIVING_N - hi, Z_FRONT - he, 'ceiling');
  // beams are as thick as the walls they continue, with faces flush to them: the Z_STAIR_N beam lines up
  // with the bedroom-4 wall, the stair-edge beam's east face with the end of the living back wall
  kit.box(X_KITCHEN_OPEN_W, X_KITCHEN_OPEN_E, H - 0.3, H, Z_STAIR_N - hi, Z_STAIR_N + hi, WI);
  kit.box(X_STAIR_E - T_INT, X_STAIR_E, H - 0.3, H, Z_STAIR_N + hi, Z_LIVING_N + hi, WI);

  if (!renovated) {
  // bathroom 3 tiles
  const bx0 = 1.51 + hi, bx1 = bathEast - hi, bz0 = he, bz1 = 1.53 - hi;
  const bathSkins = (y0: number, y1: number, mat: string) => {
    skin(kit, 'x', 0, he, 1, bx0, bx1, y0, y1, mat, [BATH3_WIN]);
    skin(kit, 'x', 1.53, hi, -1, bx0, bx1, y0, y1, mat);
    skin(kit, 'z', 1.51, hi, 1, bz0, bz1, y0, y1, mat);
    skin(kit, 'z', bathEast, hi, -1, bz0, bz1, y0, y1, mat, [{ a: DR.bath3[0], b: DR.bath3[1], y0: 0, y1: 2.1 }]);
  };
  bathSkins(-0.015, 2.1, 'bathWall');
  // dark band = two 0.3 m tile courses, then a dropped ceiling (bulkhead fills up to the slab soffit)
  const bathCeil = 2.1 + 2 * 0.3;
  bathSkins(2.1, bathCeil, 'bathWallDark');
  kit.box(bx0, bx1, bathCeil, H, bz0, bz1, 'ceiling');
  }
  // bedroom 4 dropped ceiling at 3.0 m
  const bed4Ceil = 3.0;
  if (!renovated) kit.box(hp, 3.1 - hi, bed4Ceil, H, 1.53 + hi, Z_STAIR_N - hi, 'ceiling');
  // ...including the window alcove beside the bathroom, up to the rear wall
  if (!renovated) kit.box(hp, 1.51 - hi, bed4Ceil, H, he, 1.53 + hi, 'ceiling');
  if (!renovated) {
  const bz0 = he, bx0 = 1.51 + hi;
  // WC 0.1 m clear of the basin rim (basin half-width ≈ 0.25 m, cistern half-width 0.2 m)
  const basinX = 3.45;
  toilet(kit, basinX - 0.25 - 0.1 - 0.2, -0.015, bz0 + 0.008, 0);
  basin(kit, basinX, 0.84, bz0 + 0.008, 0);
  // on the rear wall, centred in the strip between the west wall and the window
  shower(kit, bx0 + BATH3_WIN_GAP / 2, -0.015, bz0 + 0.008, 0);
  floorTrap(kit, 1.95, -0.015, 0.85);

  }
  if (renovated) buildLKitchen(kit);
  else {
  // Kitchen: rear backsplash and a metal sink, clear of the untiled side wall.
  const backsplashStart = KITCHEN_TILE_START; // two full 600 mm tiles across
  const previousUV = kit.uvFn;
  kit.uvFn = (p, n, mat) => mat === 'kitchenTile' ? [p[0] - backsplashStart, p[1]] : previousUV?.(p, n, mat) ?? null;
  skin(kit, 'x', 0, he, 1, backsplashStart, W - hp, 0, 1.5, 'kitchenTile', [{ a: KITCHEN_WINDOW_A, b: KITCHEN_WINDOW_B, y0: 1.1, y1: 2.55 }]);
  kit.uvFn = previousUV;
  const sx0 = backsplashStart, sx1 = W - hp - 0.03, sz0 = he + 0.008, sz1 = 0.66;
  const top = 0.86;
  const tapX = (KITCHEN_WINDOW_A + KITCHEN_WINDOW_B) / 2;
  // stainless sink bowl
  const kx1 = tapX + 0.05, kx0 = kx1 - 0.34, kz0 = 0.2, kz1 = 0.54, d = 0.19;
  // Four strips leave the bowl open, with no tiled slab or floor-standing leg.
  kit.box(sx0, kx0, top, top + 0.006, sz0, sz1, 'stainless');
  kit.box(kx1, sx1, top, top + 0.006, sz0, sz1, 'stainless');
  kit.box(kx0, kx1, top, top + 0.006, sz0, kz0, 'stainless');
  kit.box(kx0, kx1, top, top + 0.006, kz1, sz1, 'stainless');
  kit.box(kx0, kx1, top - d, top - d + 0.006, kz0, kz1, 'stainless');
  kit.box(kx0 - 0.004, kx0, top - d, top + 0.006, kz0, kz1, 'stainless');
  kit.box(kx1, kx1 + 0.004, top - d, top + 0.006, kz0, kz1, 'stainless');
  kit.box(kx0, kx1, top - d, top + 0.006, kz0 - 0.004, kz0, 'stainless');
  kit.box(kx0, kx1, top - d, top + 0.006, kz1, kz1 + 0.004, 'stainless');
  kit.rod(V(tapX, top, 0.14), V(tapX, top + 0.28, 0.14), 0.013, 'chrome');
  kit.rod(V(tapX, top + 0.28, 0.14), V(tapX, top + 0.28, 0.36), 0.011, 'chrome');
  kit.rod(V(tapX, top + 0.28, 0.36), V(tapX, top + 0.22, 0.36), 0.011, 'chrome');
  kit.box(tapX - 0.03, tapX + 0.03, top + 0.06, top + 0.075, 0.1, 0.2, 'chrome');
  }

  // doors (open like in the photos)
  if (!renovated) swingDoor(kit, 'bath3', 'Bathroom 3 door', 'gf', 'z', bathEast, T_INT, ...DR.bath3, 0, 2.1, { hingeAtB: true, openTo: -1, angle: deg(80), mat: 'doorBath', frameW: FW });
  swingDoor(kit, 'bed4', 'Bedroom 4 door', 'gf', 'z', 3.1, T_INT, ...DR.bed4, 0, 2.1, { hingeAtB: true, openTo: -1, angle: deg(78), mat: 'doorWood', frameW: FW });

  // electrical
  lbox(kit, 'x', Z_FRONT, 2.6, 2.9, 1.72, 2.12, -he - 0.09, -he, 'plasticWhite'); // DB box
  // Five switches below the DB box inside the entrance; the other side of the door is bare.
  for (let i = 0; i < 5; i++) {
    const x = 2.75 + (i - 2) * 0.092;
    plate(kit, x, 1.6, Z_FRONT - he, 'nz');
    // Viewed from inside facing the front wall, increasing x runs to the left.
    const single = i >= 3;
    const buttons = single ? 1 : 3;
    for (let button = 0; button < buttons; button++) {
      const bx = x + (button - (buttons - 1) / 2) * 0.022;
      const rocker = new THREE.BoxGeometry(single ? 0.06 : 0.019, 0.052, 0.012);
      const rockerTransform = new THREE.Matrix4()
        .makeRotationX(0.12)
        .setPosition(bx, 1.6, Z_FRONT - he - 0.021);
      kit.geom(rocker, 'plasticWhite', rockerTransform);
      rocker.dispose();
      if (single) {
        // Small indicator inset on the lower face, following the rocker's tilt.
        const indicator = new THREE.BoxGeometry(0.008, 0.003, 0.001);
        kit.geom(indicator, 'switchIndicatorRed', rockerTransform.clone()
          .multiply(new THREE.Matrix4().makeTranslation(0, -0.016, -0.0065)));
        indicator.dispose();
      }
    }
  }
  // Switched UK socket on the living-room back wall, near the party-wall corner.
  wallOutlet(kit, hp + 0.45, 0.3, Z_LIVING_N + hi, 'pz');
  // Facing the wall beside the glass door: fibre, TV, then UK power, left to right.
  wallOutlet(kit, W - hp, 0.3, 9.9 - 0.184, 'nx', 'fibre');
  wallOutlet(kit, W - hp, 0.3, 9.9 - 0.092, 'nx', 'tv');
  wallOutlet(kit, W - hp, 0.3, 9.9, 'nx');
  wallOutlet(kit, W - hp, 2.6, 9.9, 'nx'); // high air-conditioner socket
  // One low UK socket midway between the former dining and living outlets.
  wallOutlet(kit, W - hp, 0.3, (6.2 + Z_LIVING_N + 0.45) / 2, 'nx');
  // Low socket on the dining-facing wall beside the kitchen opening (marked spot 3).
  wallOutlet(kit, W - hp - 0.45, 0.3, Z_STAIR_N + hi, 'pz');
  // Right of the bathroom-3 door (seen from outside): two switches, each one large rocker;
  // the one nearer the rear wall has a red indicator.
  if (!renovated) bigSwitch(kit, bathEast + hi, 1.35, 0.446, 'px');
  if (!renovated) bigSwitch(kit, bathEast + hi, 1.35, 0.354, 'px', true);
  // Bedroom 4, beside the door: two large-rocker switches, aircon socket high up, low UK socket
  bigSwitch(kit, 3.1 - hi, 1.35, 3.204, 'nx');
  bigSwitch(kit, 3.1 - hi, 1.35, 3.296, 'nx');
  wallOutlet(kit, 3.1 - hi, 2.4, 3.25 - 0.5, 'nx'); // air-conditioner socket, 0.5 m left of the switches
  wallOutlet(kit, 3.1 - hi, 0.3, 2.2, 'nx'); // low UK socket (was a blank plate)
  // stair-foot switch: on the bedroom-4 wall face just above the first treads (photo 101157)
  const stairSwitchX = X_KITCHEN_OPEN_W - 0.18;
  plate(kit, stairSwitchX, 1.35, Z_STAIR_N + hi, 'pz', 0.086); // inward from the pier edge
  // One large rocker, centred on the plate, with no indicator.
  const stairSwitch = new THREE.BoxGeometry(0.06, 0.052, 0.012);
  kit.geom(stairSwitch, 'plasticWhite', new THREE.Matrix4()
    .makeRotationX(0.12)
    .setPosition(stairSwitchX, 1.35, Z_STAIR_N + hi + 0.021));
  stairSwitch.dispose();
  // Three UK sockets near the dining-end edge of the kitchen side wall.
  for (let i = 0; i < 3; i++) {
    wallOutlet(kit, W - hp, 1.2, Z_STAIR_N - hi - 0.15 - (2 - i) * 0.092, 'nx');
  }

  buildStairs(kit);
}

/* ================================================================== */
/*  STAIRS (3-flight U stair with winders)                             */
/* ================================================================== */

function buildStairs(kit: Kit) {
  // Layout from the plans (WA0004 GF + FF) and photos 101157 / 101200 / 101312:
  //   flight 1 (rear band, rising west): 8 treads; riser 9 onto the corner winders
  //   2 winders in the rear-west corner (9, 10), flight 2 (west strip, rising +z): 3 treads (11-13)
  //   half landing (14) in the front-west corner, flight 3 (front band, rising east): 6 treads (15-20)
  //   riser 21 onto the first floor. Open well between flight 2 and flight 3.
  const h = RISE;
  const WI = 'wallInt';
  const T = 'stairTile';
  // Stair tiles are laid tread by tread, not continued from the floor grid (photos 101312 / 101325):
  // on every tread the 600 mm tile starts at the nosing, with one joint on the flight's centre line,
  // and each riser has its own strip tile starting at the tread below.
  const tileUV = (across: (p: number[]) => number, treadV: (p: number[]) => number, riserV: (p: number[]) => number) =>
    (p: number[], n: number[], mat: string): [number, number] | null => {
      if (mat !== T) return null;
      return n[1] > 0.5 ? [across(p), treadV(p)] : [across(p), riserV(p)];
    };
  const w2 = 0.16; // waist
  // --- flight 1
  const x1t = X_STAIR_W_STRIP;
  const n1 = STAIR_TREADS.lower;
  const x1b = X_STAIR_FOOT; // first riser; stops just short of the end of the stair back wall (photos 101153 / 101157)
  const g1 = (x1b - x1t) / n1; // ≈ 0.266 m
  const zA = Z_STAIR_N + hi, zB = 5.52;
  const p1: P2[] = [[x1b, 0]];
  for (let i = 1; i <= n1; i++) {
    p1.push([x1b - (i - 1) * g1, i * h]);
    p1.push([x1b - i * g1, i * h]);
  }
  const ys = (x: number) => (h * (x1b - x)) / g1 - w2;
  p1.push([x1t, ys(x1t)]);
  p1.push([x1b - (w2 * g1) / h, 0]);
  {
    const cz = (zA + zB) / 2;
    kit.uvFn = tileUV(
      (p) => p[2] - cz,
      (p) => x1b - (Math.round(p[1] / h) - 1) * g1 - p[0], // tread i: nosing at x1b - (i-1) g1
      (p) => p[1] - Math.round((x1b - p[0]) / g1) * h, // riser at x1b - (i-1) g1 rises from (i-1) h
    );
    kit.prismXY(p1, zA, zB, WI, (nx, ny) => (ny > 0.5 || nx > 0.5 ? T : WI));
  }

  // --- corner winders: flat soffit over the lower flight, then a short sloping
  // transition into flight 2. A single low box left a two-riser vertical drop at zW.
  const P: P2 = [x1t, zB];
  const zW = 5.75; // first riser of flight 2
  const regions: { poly: P2[]; n: number }[] = [
    { poly: [P, [x1t, zA], [hp, zA]], n: n1 + 1 },
    { poly: [P, [hp, zA], [hp, zW], [x1t, zW]], n: n1 + 2 },
  ];
  for (const r of regions) {
    const top = r.n * h;
    kit.uvFn = tileUV((p) => p[0] - (hp + x1t) / 2, (p) => p[2] - zA, (p) => p[1] - (top - h));
    const soffit = ys(x1t);
    if (r.n === n1 + 1) {
      kit.prismXZ(r.poly, soffit, top - h, WI, WI, WI);
      kit.prismXZ(r.poly, top - h, top, T, WI, T);
    } else {
      // Split where the underside changes pitch, keeping the winder's tiled top level.
      const flat: P2[] = [P, [hp, zA], [hp, zB]];
      kit.prismXZ(flat, soffit, top - h, WI, WI, WI);
      kit.prismXZ(flat, top - h, top, T, WI, T);
      kit.prismZY([
        [zB, top], [zW, top], [zW, top - w2], [zB, soffit],
      ], hp, x1t, WI, (_nz, ny) => ny > 0.5 ? T : WI);
    }
  }
  // --- flight 2 (3 treads, rising +z) + half landing as one waist slab, profile in (z, y)
  const zL = Z_LIVING_N - hi;
  const zCore = Z_CORE_S + hi;
  const n2 = STAIR_TREADS.middle;
  const g2 = (zCore - zW) / n2;
  const s2 = n1 + 3; // first tread of flight 2
  const landN = s2 + n2; // half landing = riser 14
  const landT = w2; // same underside elevation where the landing meets flight 3
  const waist2 = (z: number) => h * (s2 - 1 + (z - zW) / g2) - w2;
  const zSoffit = zW + ((landN * h - landT + w2) / h - (s2 - 1)) * g2;
  const p2: P2[] = [];
  for (let k = 0; k < n2; k++) {
    p2.push([zW + k * g2, (s2 + k) * h]);
    p2.push([zW + (k + 1) * g2, (s2 + k) * h]);
  }
  p2.push([zCore, landN * h], [zL, landN * h], [zL, landN * h - landT], [zSoffit, landN * h - landT], [zW, waist2(zW)]);
  {
    const cx = (hp + x1t) / 2;
    kit.uvFn = tileUV(
      (p) => p[0] - cx,
      (p) => p[2] - (zW + (Math.round(p[1] / h) - s2) * g2), // tread s2+k: nosing at zW + k g2 (landing: zCore)
      (p) => p[1] - (s2 - 1 + Math.round((p[2] - zW) / g2)) * h,
    );
    kit.prismZY(p2, hp, x1t, WI, (nz, ny) => (ny > 0.5 || nz < -0.5 ? T : WI));
  }

  // --- flight 3 (front band, 6 treads rising east to the first floor)
  const x3 = X_STAIR_W_STRIP;
  const n3 = STAIR_TREADS.upper;
  const xTop = X_STAIR_TOP;
  const g3 = (xTop - x3) / n3;
  const p3: P2[] = [[x3, landN * h]];
  for (let k = 1; k <= n3; k++) {
    p3.push([x3 + (k - 1) * g3, (landN + k) * h]);
    p3.push([x3 + k * g3, (landN + k) * h]);
  }
  p3.push([xTop, Y_FF]);
  const ys3 = (x: number) => landN * h + (h * (x - x3)) / g3 - w2;
  p3.push([xTop, ys3(xTop)]);
  p3.push([x3, ys3(x3)]);
  {
    const cz = (zCore + zL) / 2;
    kit.uvFn = tileUV(
      (p) => p[2] - cz,
      (p) => p[0] - (x3 + (Math.round(p[1] / h) - landN - 1) * g3), // tread landN+k: nosing at x3 + (k-1) g3
      (p) => p[1] - (landN + Math.round((p[0] - x3) / g3)) * h,
    );
    kit.prismXY(p3, zCore, zL, WI, (nx, ny) => (ny > 0.5 || nx < -0.5 ? T : WI));
  }
  kit.uvFn = null;

  // --- balustrades (sage steel, as photographed: 101157 / 101312 / 101325)
  // Each flight's rail runs straight at its own pitch; turns are detailed below. Balusters run from a
  // bottom rail up to a second rail just under the handrail.
  const HR = 0.9; // handrail height above the nosing line
  const opt = { height: HR, balFrom: 0.12, balTo: 0.78, rails: [0.12, 0.78], posts: false };
  const pitch1 = (x: number) => h + ((x1b - x) / g1) * h;
  const pitch2 = (z: number) => s2 * h + ((z - zW) / g2) * h;
  const zr = zB - 0.035; // flight-1 rail line
  const xr = x1t - 0.035; // flight-2 rail line
  const elbow = 0.1; // short level legs on either side of each right-angle turn
  const post = (x: number, z: number, y0: number, yRail: number) => kit.bar(V(x, y0, z), V(x, yRail + 0.02, z), 0.05, 0.05, 'steelRail');
  // flight 1: foot post with the handrail running level over it and past it (photo 101312), then up to
  // the winder-corner post
  const xFootPost = x1b - 0.03;
  const footRailY = pitch1(xFootPost) + HR;
  post(xFootPost, zr, h - 0.02, footRailY);
  kit.bar(V(xFootPost, footRailY, zr), V(x1b + 0.1, footRailY, zr), 0.045, 0.04, 'steelRail');
  kit.box(x1b + 0.1, x1b + 0.105, footRailY - 0.02, footRailY + 0.02, zr - 0.0225, zr + 0.0225, 'steelRail'); // end cap
  // The broad intermediate upright is fixed to tread 5 (photos 101157 / 101200).
  // Split the infill at the post while keeping both panels on the same nosing pitch.
  const midTread = 5;
  const xMidPost = x1b - (midTread - 1) * g1 - 0.03;
  post(xMidPost, zr, midTread * h - 0.02, pitch1(xMidPost) + HR);
  railing(kit, [V(xFootPost, pitch1(xFootPost), zr), V(xMidPost, pitch1(xMidPost), zr), V(xr + elbow, pitch1(xr + elbow), zr)], opt);
  // Photo 101325: the level connector wraps around the corner between two separated
  // raking panels. Its corner post ends under the handrail; the upper panel's end
  // upright forms the vertical rise AFTER the elbow, not at a crossing with a dead-end spur.
  const turn = (a: THREE.Vector3, corner: THREE.Vector3, b: THREE.Vector3, cornerFloor: number, upperFloor: number) => {
    for (const [dy, w, t] of [[HR, 0.045, 0.04], [0.78, 0.03, 0.022], [0.12, 0.03, 0.022]] as const) {
      // The bottom member clears the rising corner treads; only the two upper
      // members make the level elbow seen in the photo.
      const cornerY = dy === 0.12 ? Math.max(a.y + dy, cornerFloor + 0.08) : a.y + dy;
      const endY = dy === 0.12 ? Math.max(cornerY, upperFloor + 0.08) : cornerY;
      kit.bar(V(a.x, a.y + dy, a.z), V(corner.x, cornerY, corner.z), w, t, 'steelRail');
      kit.bar(V(corner.x, cornerY, corner.z), V(b.x, endY, b.z), w, t, 'steelRail');
    }
    post(corner.x, corner.z, cornerFloor - 0.02, a.y + HR);
    // Full end upright joins all three incoming rails to the upper panel, including
    // its bottom rail; a handrail-only vertical left the lower connections dangling.
    post(b.x, b.z, upperFloor - 0.02, b.y + HR);
  };
  // Winder corner: westward -> southward. Both uprights stand on winder 10.
  turn(V(xr + elbow, pitch1(xr + elbow), zr), V(xr, 0, zr),
    V(xr, pitch2(zr + elbow), zr + elbow), (n1 + 2) * h, (n1 + 2) * h);
  // flight 3 + first-floor guard (FF plan WA0004, photos 101325 / 101339 / 101358):
  //  - the level guard stands on the slab edge: along the well (x = X_WELL_E), then east beside flight 3
  //    to just past the top riser, where a short return turns onto the stair-top newel (connected)
  //  - the flight's raking balustrade runs on the tread edge ~0.1 m in front of the level guard, from the
  //    landing newel up to that stair-top newel, whose cap is level with the guard's top rail
  const R = 'steelRail';
  const GH = 1.0, GM = 0.88, GB = 0.1; // level guard: top rail, rail the balusters stop at, bottom rail
  const zG = zCore - 0.04; // level guard line (slab edge)
  const zR = zCore + 0.06; // raking balustrade line (on the flight-3 treads)
  // flight 2: winder corner -> half-landing corner post
  railing(kit, [V(xr, pitch2(zr + elbow), zr + elbow), V(xr, pitch2(zR - elbow), zR - elbow)], opt);
  const pitch3 = (x: number) => (landN + 1) * h + ((x - x3) / g3) * h;
  // Half landing: southward -> eastward; the outgoing upright stands on tread 15.
  turn(V(xr, pitch2(zR - elbow), zR - elbow), V(xr, 0, zR),
    V(xr + elbow, pitch3(xr + elbow), zR), landN * h, (landN + 1) * h);
  const xC = xTop + 0.04; // stair-top newel (on the first floor, at the head of flight 3)
  // One straight rake from the landing connection to the upstairs newel.
  // Both endpoints set the pitch; there is no extra bend over the last tread.
  railing(kit, [V(xr + elbow, pitch3(xr + elbow), zR), V(xC, Y_FF + GH - HR, zR)], opt);
  const newel = (x: number, z: number, y0: number, w = 0.06) => {
    kit.bar(V(x, y0, z), V(x, Y_FF + GH + 0.02, z), w, w, R);
    kit.box(x - w / 2 - 0.015, x + w / 2 + 0.015, Y_FF + GH + 0.02, Y_FF + GH + 0.035, z - w / 2 - 0.015, z + w / 2 + 0.015, R);
  };
  newel(xC, zR, Y_FF - 0.02);
  // level guard: wall -> well corner -> beside flight 3 -> return onto the stair-top newel
  const xG = X_WELL_E + 0.04, zG0 = Z_STAIR_N + hi + 0.02;
  railing(kit, [V(xG, Y_FF, zG0), V(xG, Y_FF, zG), V(xC, Y_FF, zG), V(xC, Y_FF, zR - 0.03)], {
    height: GH, balFrom: GB, balTo: GM, rails: [GB, GM], spacing: 0.115, posts: false,
  });
  for (const z of [zG0 + 0.01, (zG0 + zG) / 2]) kit.bar(V(xG, Y_FF - 0.02, z), V(xG, Y_FF + GH + 0.02, z), 0.05, 0.05, R); // wall end + mid post
  newel(xG, zG, Y_FF - 0.02, 0.05); // well corner
  newel(xC, zG, Y_FF - 0.02, 0.05); // guard end, beside the stair-top newel
}

/* ================================================================== */
/*  FIRST FLOOR INTERIOR                                               */
/* ================================================================== */

function buildFirstInterior(kit: Kit, G: UnitOpts['G']) {
  kit.group = G('ff');
  const y0 = Y_FF, y1 = Y_FF_CEIL;
  const WI = 'wallInt';
  const dh = Y_FF + 2.1;
  wall(kit, 'z', 3.04, he, Z_STAIR_N - hi, y0, y1, T_INT, WI, WI);
  wall(kit, 'x', Z_STAIR_N, hp, W - hp, y0, y1, T_INT, WI, WI, [
    { a: DR.bed3[0], b: DR.bed3[1], y0, y1: dh },
    { a: DR.bed2[0], b: DR.bed2[1], y0, y1: dh },
  ]);
  wall(kit, 'x', Z_LIVING_N, hp, W - hp, y0, y1, T_INT, WI, WI, [
    { a: DR.master[0], b: DR.master[1], y0, y1: dh },
    { a: DR.bath2[0], b: DR.bath2[1], y0, y1: dh },
  ]);
  wall(kit, 'z', X_BATH_W, Z_LIVING_N + hi, Z_FRONT + he, y0, y1, T_INT, WI, WI, [{ a: DR.bath1[0], b: DR.bath1[1], y0, y1: dh }]);
  wall(kit, 'x', Z_BATH_SPLIT, X_BATH_W + hi, W - hp, y0, y1, T_INT, WI, WI);

  // stair guard around the void: built with the stair balustrade (buildStairs), as one piece

  // bathroom tiles
  const tileRoom = (x0: number, x1: number, z0: number, z1: number, walls: { axis: 'x' | 'z'; c: number; face: number; side: 1 | -1; a0: number; a1: number; open?: Opening[] }[], top = y1) => {
    for (const [ya, yb, m] of [[Y_FF, Y_FF + 2.1, 'bathWall'], [Y_FF + 2.1, top, 'bathWallDark']] as [number, number, string][]) {
      for (const w of walls) skin(kit, w.axis, w.c, w.face, w.side, w.a0, w.a1, ya, yb, m, w.open ?? []);
    }
    void x0; void x1; void z0; void z1;
  };
  const b2 = { x0: X_BATH_W + hi, x1: W - hp, z0: Z_LIVING_N + hi, z1: Z_BATH_SPLIT - hi };
  tileRoom(b2.x0, b2.x1, b2.z0, b2.z1, [
    { axis: 'x', c: Z_LIVING_N, face: hi, side: 1, a0: b2.x0, a1: b2.x1, open: [{ a: DR.bath2[0], b: DR.bath2[1], y0, y1: dh }] },
    { axis: 'x', c: Z_BATH_SPLIT, face: hi, side: -1, a0: b2.x0, a1: b2.x1, open: BATH2_JAL },
    { axis: 'z', c: X_BATH_W, face: hi, side: 1, a0: b2.z0, a1: b2.z1 },
    { axis: 'z', c: W, face: hp, side: -1, a0: b2.z0, a1: b2.z1 },
  ], Y_BATH2_HIGH);
  const b1 = { x0: X_BATH_W + hi, x1: W - hp, z0: Z_BATH_SPLIT + hi, z1: 12.19 - he };
  tileRoom(b1.x0, b1.x1, b1.z0, b1.z1, [
    { axis: 'x', c: Z_BATH_SPLIT, face: hi, side: 1, a0: b1.x0, a1: b1.x1 },
    { axis: 'x', c: 12.19, face: he, side: -1, a0: b1.x0, a1: b1.x1, open: [{ a: BW_CORNER.x0, b: BW_CORNER.x1, y0: BW_CORNER.y0, y1: BW_CORNER.y1 }, { a: 5.15, b: 5.7, y0: Y_FF + 1.85, y1: Y_FF + 2.35 }] },
    { axis: 'z', c: X_BATH_W, face: hi, side: 1, a0: b1.z0, a1: b1.z1, open: [{ a: DR.bath1[0], b: DR.bath1[1], y0, y1: dh }, { a: BW_CORNER.z0, b: 12.29, y0: BW_CORNER.y0, y1: BW_CORNER.y1 }] },
    { axis: 'z', c: W, face: hp, side: -1, a0: b1.z0, a1: b1.z1 },
  ], Y_BATH1_CEIL);
  // sanitary ware
  toilet(kit, 5.3, Y_FF, b2.z1 - 0.008, Math.PI);
  basin(kit, b2.x1 - 0.008, Y_FF + 0.84, 8.15, -Math.PI / 2);
  shower(kit, 4.45, Y_FF, b2.z1 - 0.008, Math.PI);
  floorTrap(kit, 4.5, Y_FF, 9.2);
  toilet(kit, 5.3, Y_FF, b1.z0 + 0.008, 0);
  basin(kit, 4.5, Y_FF + 0.84, b1.z0 + 0.008, 0);
  shower(kit, b1.x1 - 0.008, Y_FF, 11.45, -Math.PI / 2);
  floorTrap(kit, 5.55, Y_FF, 11.4);

  // doors
  swingDoor(kit, 'bed3', 'Bedroom 3 door', 'ff', 'x', Z_STAIR_N, T_INT, ...DR.bed3, Y_FF, 2.1, { hingeAtB: true, openTo: -1, angle: deg(82), mat: 'doorWood', frameW: FW });
  swingDoor(kit, 'bed2', 'Bedroom 2 door', 'ff', 'x', Z_STAIR_N, T_INT, ...DR.bed2, Y_FF, 2.1, { hingeAtB: false, openTo: -1, angle: deg(82), mat: 'doorWood', frameW: FW });
  swingDoor(kit, 'master', 'Master bedroom door', 'ff', 'x', Z_LIVING_N, T_INT, ...DR.master, Y_FF, 2.1, { hingeAtB: true, openTo: 1, angle: deg(80), mat: 'doorWood', frameW: FW });
  swingDoor(kit, 'bath2', 'Bathroom 2 door', 'ff', 'x', Z_LIVING_N, T_INT, ...DR.bath2, Y_FF, 2.1, { hingeAtB: false, openTo: 1, angle: deg(70), mat: 'doorBath', frameW: FW });
  swingDoor(kit, 'bath1', 'Bathroom 1 door', 'ff', 'z', X_BATH_W, T_INT, ...DR.bath1, Y_FF, 2.1, { hingeAtB: true, openTo: 1, angle: deg(72), mat: 'doorBath', frameW: FW });

  // electrical
  const s = 1.35 + Y_FF, so = 0.3 + Y_FF;
  // bedroom 3, beside the door's latch side (right of the door seen from inside): 3-gang switch and a
  // single large-rocker switch at eye level, a UK socket below them, slightly right, 0.5 m above the floor
  gangSwitch(kit, 1.636, Y_FF + 1.5, Z_STAIR_N - hi, 'nz');
  bigSwitch(kit, 1.544, Y_FF + 1.5, Z_STAIR_N - hi, 'nz');
  wallOutlet(kit, 1.49, Y_FF + 0.5, Z_STAIR_N - hi, 'nz');
  // bedroom 2: mirror of bedroom 3 about the door (latch side = left of the door seen from inside)
  gangSwitch(kit, 4.304, Y_FF + 1.5, Z_STAIR_N - hi, 'nz');
  bigSwitch(kit, 4.396, Y_FF + 1.5, Z_STAIR_N - hi, 'nz');
  wallOutlet(kit, 4.45, Y_FF + 0.5, Z_STAIR_N - hi, 'nz');
  // Master bedroom label 1: three-button and single-button plates beside the entry.
  gangSwitch(kit, DR.master[0] - 0.25, s, Z_LIVING_N + hi, 'pz');
  bigSwitch(kit, DR.master[0] - 0.158, s, Z_LIVING_N + hi, 'pz');
  // Labels 2 and 3: high air-conditioner socket and switch pair before the ensuite door.
  wallOutlet(kit, X_BATH_W - hi, Y_FF + 2.4, 8.8, 'nx');
  gangSwitch(kit, X_BATH_W - hi, s, DR.bath1[0] - 0.3, 'nx');
  bigSwitch(kit, X_BATH_W - hi, s, DR.bath1[0] - 0.208, 'nx');
  // left of the bathroom-2 door (seen from the hall): two large-rocker switches
  bigSwitch(kit, 5.114, s, Z_LIVING_N - hi, 'nz');
  bigSwitch(kit, 5.206, s, Z_LIVING_N - hi, 'nz');
  wallOutlet(kit, 3.04 - hi, Y_FF + 2.4, he + 1.5, 'nx'); // bedroom 3 air-conditioner socket, 1.5 m from the rear (window) wall
  wallOutlet(kit, 3.04 + hi, Y_FF + 2.4, he + 1.5, 'px'); // bedroom 2 air-conditioner socket, mirror of bedroom 3
  wallOutlet(kit, X_BATH_W - hi, Y_FF + 0.5, 9.35, 'nx'); // master bedroom label 4
  // fuse box on the outside (family-hall face) of bedroom 2's wall, east of its door;
  // low UK 3-pin socket to the right (east) of it
  wallOutlet(kit, 5.45, so, Z_STAIR_N + hi, 'pz');
  lbox(kit, 'x', Z_STAIR_N, 4.8, 5.15, Y_FF + 1.7, Y_FF + 2.0, hi, hi + 0.08, 'plasticWhite');
}

/* ================================================================== */
/*  ROOF                                                               */
/* ================================================================== */

function buildRoof(kit: Kit) {
  const t = ROOF_THICK, c = Math.cos(ROOF_PITCH), s = Math.sin(ROOF_PITCH);
  const xa = hp, xm = X_ROOF_SPLIT, xb = W - hp;
  const base = Y_WALL_TOP + t;
  const rearY = (z: number) => base + (z - Z_REAR) * ROOF_TAN;
  const frontY = (z: number) => base + (Z_FRONT - z) * ROOF_TAN;
  const stripFrontY = (z: number) => frontY(z) - ROOF_DROP;

  /** tiled plane z0..z1 (tile-top height fy); dir +1 faces the street, -1 the rear; tile v measured from zUV */
  const plane = (x0: number, x1: number, z0: number, z1: number, fy: (z: number) => number, dir: 1 | -1, zUV: number) => {
    const y0 = fy(z0), y1 = fy(z1);
    const v0 = Math.abs(z0 - zUV) / c, v1 = Math.abs(z1 - zUV) / c;
    const uA = dir > 0 ? x0 : -x0, uB = dir > 0 ? x1 : -x1;
    kit.quad([x0, y0, z0], [x1, y0, z0], [x1, y1, z1], [x0, y1, z1], 'roofTile', [0, c, dir * s], [[uA, v0], [uB, v0], [uB, v1], [uA, v1]]);
    kit.quad([x0, y0 - t, z0], [x1, y0 - t, z0], [x1, y1 - t, z1], [x0, y1 - t, z1], 'soffit', [0, -c, -dir * s]);
  };
  const eave = (x0: number, x1: number, zE: number, dir: 1 | -1) => {
    const yE = dir > 0 ? frontY(zE) : rearY(zE);
    kit.quad([x0, yE - t, zE], [x1, yE - t, zE], [x1, yE, zE], [x0, yE, zE], 'fascia', [0, 0, dir]);
    const z1 = zE + dir * 0.025;
    kit.box(x0, x1, yE - 0.28, yE - 0.01, Math.min(zE, z1), Math.max(zE, z1), 'fascia'); // fascia board
    kit.box(x0, x1, yE - 0.02, yE + 0.03, Math.min(zE, zE - dir * 0.05), Math.max(zE, zE - dir * 0.05), 'roofRidge'); // tile nose
  };
  const ridge = (x0: number, x1: number, y: number, z: number) => {
    const g = new THREE.CylinderGeometry(0.13, 0.13, x1 - x0, 20, 1);
    g.rotateZ(Math.PI / 2);
    g.scale(1, 0.72, 1);
    kit.geom(g, 'roofRidge', new THREE.Matrix4().makeTranslation((x0 + x1) / 2, y - 0.02, z));
    g.dispose();
    for (let x = x0 + 0.42; x < x1 - 0.05; x += 0.42) {
      const r = new THREE.TorusGeometry(0.131, 0.008, 6, 20, Math.PI);
      r.rotateY(Math.PI / 2);
      r.scale(1, 0.72, 1);
      kit.geom(r, 'roofRidge', new THREE.Matrix4().makeTranslation(x, y - 0.02, z));
      r.dispose();
    }
  };

  // rear slope: one plane across the full width up to the strip ridge; the main roof continues to its ridge
  plane(xa, xb, Z_EAVE_REAR, Z_STRIP_RIDGE, rearY, -1, Z_EAVE_REAR);
  plane(xa, xm, Z_STRIP_RIDGE, Z_RIDGE, rearY, -1, Z_EAVE_REAR);
  eave(xa, xb, Z_EAVE_REAR, -1);
  // main front slope (master-bedroom side) with its eave overhanging the front wall
  plane(xa, xm, Z_RIDGE, Z_EAVE_FRONT, frontY, 1, Z_EAVE_FRONT);
  eave(xa, xm, Z_EAVE_FRONT, 1);
  ridge(xa, xm, Y_RIDGE, Z_RIDGE);
  // lower east strip above the bathrooms: behind the bathroom-box parapet there is a small flat roof
  // first, the strip's front slope stops (with its own eave) at the back of that flat area
  const yFlat = Y_FLAT;
  const zSF = Z_FLAT_BACK; // strip eave line = back of the flat area
  // the strip roof overhangs the clerestory (jalousie) wall by a wide, thin eave
  const zSE = zSF + 0.6, tO = 0.08;
  plane(xm, xb, Z_STRIP_RIDGE, zSF, stripFrontY, 1, zSE);
  {
    // overhang: tiles continue, but the slab under them is thin
    const y0 = stripFrontY(zSF), y1 = stripFrontY(zSE);
    const v0 = (zSE - zSF) / c;
    kit.quad([xm, y0, zSF], [xb, y0, zSF], [xb, y1, zSE], [xm, y1, zSE], 'roofTile', [0, c, s], [[xm, v0], [xb, v0], [xb, 0], [xm, 0]]);
    kit.quad([xm, y0 - tO, zSF], [xb, y0 - tO, zSF], [xb, y1 - tO, zSE], [xm, y1 - tO, zSE], 'soffit', [0, -c, -s]);
    // where the full-depth roof meets the thin eave, above the wall
    kit.quad([xm, y0 - t, zSF], [xb, y0 - t, zSF], [xb, y0 - tO, zSF], [xm, y0 - tO, zSF], 'wallExt', [0, 0, 1]);
    // slim fascia + tile nose
    kit.quad([xm, y1 - tO, zSE], [xb, y1 - tO, zSE], [xb, y1, zSE], [xm, y1, zSE], 'fascia', [0, 0, 1]);
    kit.box(xm, xb, y1 - 0.13, y1 - 0.01, zSE, zSE + 0.02, 'fascia');
    kit.box(xm, xb, y1 - 0.02, y1 + 0.03, zSE - 0.05, zSE, 'roofRidge');
  }
  ridge(xm, xb, Y_STRIP_RIDGE, Z_STRIP_RIDGE);
  kit.box(xm, xb, Y_BATH1_CEIL + 0.05, yFlat, zSF - T_CLER, 12.09, { py: 'concreteLight', rest: 'soffit' });
  // white step wall where the high main roof overlooks the strip roof / flat roof
  const zq = Z_FRONT / 2 + (t - ROOF_DROP) / (2 * ROOF_TAN); // main soffit meets the strip tiles
  kit.prismZY([
    [zq, rearY(zq) - t],
    [Z_RIDGE, Y_RIDGE - t],
    [12.29, frontY(12.29) - t],
    [12.29, yFlat],
    [zSF, yFlat],
    [zSF, stripFrontY(zSF)],
  ], xm - 0.1, xm, 'wallExt', 'wallExt');
  // verge board along the main roof's east edge
  const vb = t + 0.06;
  kit.prismZY([
    [Z_STRIP_RIDGE, Y_STRIP_RIDGE],
    [Z_RIDGE, Y_RIDGE],
    [Z_EAVE_FRONT, frontY(Z_EAVE_FRONT)],
    [Z_EAVE_FRONT, frontY(Z_EAVE_FRONT) - vb],
    [Z_RIDGE, Y_RIDGE - vb],
    [Z_STRIP_RIDGE, Y_STRIP_RIDGE - vb],
  ], xm, xm + 0.03, 'fascia', 'fascia');
}
