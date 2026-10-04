/**
 * All dimensions in metres, derived from the architect's plans
 * (S.Y. Ong Architect – Type A, Ground/First floor plans, elevations & section)
 * cross-checked against the site photos.
 *
 * Coordinate system (three.js, Y up):
 *   X : across the lot, 0 = left party-wall centre line (as seen from the street)
 *   Z : front/back, 0 = rear wall centre line, +Z towards the street
 *   Y : height, 0 = ground-floor finished floor level
 */

export const W = 6.096; // lot width (20 ft), party wall centre-to-centre
export const T_EXT = 0.2; // external (front / rear) wall thickness
export const T_PARTY = 0.1; // party (side) wall thickness: 0.05 m each side of the lot line
export const T_INT = 0.12; // internal brick wall thickness

// Z lines
export const Z_REAR = 0;
export const Z_FRONT = 11.74; // ground floor front wall (plan: 11740)
// Raised picture window with a narrow, outward-opening right casement in the renovation.
export const LIVING_WINDOW = { a: 3.15, b: 5.5, y0: 1.05, y1: 2.5, openingWidth: 0.65, frameWidth: 0.035 } as const;
// Raised L-shaped lounge sofa; the chaise follows the east wall, clear of the entrance passage.
export const LIVING_SOFA = { z: 7.6, width: 2.1, depth: 0.94, chaiseDepth: 1.85, legHeight: 0.18 } as const;
export const Z_BATH_FRONT = 12.19; // first floor bath projection (plan: 12190)
export const Z_LOT_REAR = -2.66;
// Renovated bedroom's rear wall (shared with the relocated bathroom) sits under the ceiling beam left
// by the old rear wall (z -0.1..0.1): its bathroom-side face is flush with the beam's south face.
export const Z_RENOVATED_BED4_REAR = -0.1 + 0.12 / 2;
export const RENOVATED_REAR_DOOR = { a: 2.65, b: 3.52 };
// Renovated kitchen window: two-panel slider over the sink, west of the rear wall cabinet.
export const RENOVATED_KITCHEN_WINDOW = { a: 3.72, b: 4.92, y0: 1.1, y1: 2.55 };
// Relocated ground-floor bathroom: shower and WC face east from the west wall;
// the basin and its faucet are on the rear wall.
export const RENOVATED_BATH3 = {
  westX: T_PARTY / 2 + 0.008,
  showerZ: Z_RENOVATED_BED4_REAR - 0.72,
  toiletZ: -1.72,
  basinX: 0.75,
  rearZ: Z_LOT_REAR + 0.108,
} as const;
// Alternative renovation layouts: shared positions for walls, doors, furniture and labels.
export const KITCHEN_PARTITION = { z: 1.6, a: 3.42, b: 5.8, height: 2.35 };
export const MASTER_PARTITION = { z: 12.15, a: 2.72, b: 3.66, height: 2.1 };
export const GUEST_ENSUITE_DOOR = { a: 0.35, b: 1.25, height: 2.1 };
export const Z_LOT_FRONT = 18.7; // 70 ft lot
// Square land base centered on the property, with clearance beyond both ends of the lot.
export const SITE_CONTEXT = {
  margin: 2.2,
  drainWidth: 0.65,
  drainWall: 0.1,
  frontDrainOffset: 0.05,
  rearDrainOffset: 0.1,
  frontPavementWidth: 0.5,
} as const;
export const Z_BALCONY_FRONT = 16.45;
export const Z_BALCONY_NOTCH = 15.02;
// Front wall centre: 100 mm clear of the balcony return pillar's rear face.
export const Z_MASTER_EXTENSION_FRONT = Z_BALCONY_NOTCH - 0.4;
export const X_BALCONY_NOTCH = 0.97;

// Levels
export const Y_GF = 0;
export const Y_FF = 3.6; // Tingkat 1 (+3600)
export const SLAB = 0.15;
export const Y_GF_CEIL = Y_FF - SLAB; // 3.45 slab soffit
// Renovated ground floor: flat plaster ceiling below every beam / dropped section (lowest 2.875 m).
export const Y_RENOVATED_GF_CEIL = 2.85;
export const Y_FF_CEIL = Y_FF + 3.05; // plaster ceiling
export const Y_WALL_TOP = Y_FF + 3.35; // Paras Bumbung (+6950)
export const Y_PORCH = -0.3; // porch floor at the foot of the entrance steps
export const Y_PORCH_GATE = -0.15; // porch floor at the gate (falls towards the floor trap by the steps)
export const Y_ROAD = -0.35;

/*
 * Car porch (photos 101108 / 102754 / 102759 / 102804):
 *  - two 150 mm steps up to the door: a full-width cement step (wall → east pillar),
 *    then the tiled thresholds of the two openings (up to FFL 0)
 *  - a pillar closes the east end of the façade (the step stops against it)
 *  - flat ceiling, no cross beams: only the front edge beam, a dropped strip along the west
 *    wall and a dropped box under the first-floor bathroom projection
 */
export const Y_STEP = -0.15; // top of the first (full-width) step
export const Z_STEP = 12.28; // front edge of the first step
// Rectangular outdoor format based on Niro Granite's Murale range; thickness and grout are model choices.
export const PORCH_TILES = { size: [0.6, 0.3], thickness: 0.02, grout: 0.004 } as const;
export const X_PILLAR_E = 5.6; // west face of the pillar at the east end of the façade
export const Z_BATH_BOX = 12.29; // front face of the first-floor bathroom projection
export const Y_PORCH_CEIL = 3.35; // porch ceiling (balcony slab soffit)
export const X_PORCH_STRIP = 1.17; // east edge of the dropped soffit strip along the west wall
export const Y_PORCH_STRIP = 3.0; // underside of the notch-line beam + notch back wall (level with the front beam)
export const Y_BATH_BOX = 3.15; // underside of the dropped box below the bathroom projection
// main entrance door opening (unequal double leaf, scaled off photos 101057 / 101103 / 101108)
export const X_DOOR_A = 0.9;
export const X_DOOR_B = 2.4;
export const Y_YARD = -0.1;
export const Y_BALCONY = Y_FF - 0.05;

// Shared extension-roof dimensions keep the balcony canopy on the same roof plane.
export const EXTENSION_ROOF = { eaveRise: 0.09, wallRise: 0.27 } as const;
export const MASTER_EXTENSION_ROOF = {
  back: Z_FRONT - 0.1,
  front: Z_MASTER_EXTENSION_FRONT + 0.25,
  ceiling: Y_FF_CEIL + 0.15,
  eastOverhang: 0.12,
} as const;
const balconySlope = (EXTENSION_ROOF.wallRise - EXTENSION_ROOF.eaveRise)
  / (MASTER_EXTENSION_ROOF.front - MASTER_EXTENSION_ROOF.back);
const awningPanelThickness = 0.016;

// Both renovation canopies admit daylight through opal polycarbonate panels.
export const AWNINGS = {
  frameWidth: 0.055,
  frameDepth: 0.1,
  panelWidth: 0.8,
  panelThickness: awningPanelThickness,
  porch: { back: Z_MASTER_EXTENSION_FRONT + T_EXT / 2, front: Z_LOT_FRONT - 0.12,
    high: Y_PORCH_CEIL, slope: Math.tan(5 * Math.PI / 180) },
  balcony: { back: Z_BATH_BOX, front: Z_BALCONY_FRONT + 0.07, slope: balconySlope,
    high: MASTER_EXTENSION_ROOF.ceiling + EXTENSION_ROOF.wallRise
      - (Z_BATH_BOX - MASTER_EXTENSION_ROOF.back) * balconySlope - awningPanelThickness },
} as const;

// Roof
export const ROOF_PITCH = 27 * (Math.PI / 180);
export const ROOF_TAN = Math.tan(ROOF_PITCH);
export const ROOF_THICK = 0.22; // rafter + batten + tile build-up (vertical)
export const Z_RIDGE = (Z_REAR + Z_FRONT) / 2;
export const Z_EAVE_FRONT = 12.45;
export const Z_EAVE_REAR = -0.65;

/** top-of-tile height at a given z */
export function roofTop(z: number): number {
  const d = Math.abs(z - Z_RIDGE);
  return Y_WALL_TOP + ROOF_THICK + (Z_RIDGE - d) * ROOF_TAN;
}
export const Y_RIDGE = roofTop(Z_RIDGE);

/*
 * The roof is split across the width (front/rear elevation, section and photos):
 * the main gable covers x < X_ROOF_SPLIT; the east strip above the bathrooms has a
 * lower roof whose rear slope matches the main roof but whose front slope sits
 * ROOF_DROP lower and dies behind the bathroom-box parapet (ridge ≈ 0.33 m lower).
 */
export const X_ROOF_SPLIT = 3.94; // align the main roof edge with the master/ensuite wall
export const ROOF_DROP = 0.65;
export const Y_BATH_PARAPET = 6.5; // top of the bathroom box front wall
export const Y_BATH1_CEIL = Y_FF + 2.1 + 2 * 0.3; // ensuite ceiling: light tiles to 2.1 m + two 0.3 m dark courses
/** top-of-tile height of the lower east-strip roof at a given z */
export function stripRoofTop(z: number): number {
  const base = Y_WALL_TOP + ROOF_THICK;
  return Math.min(base + (z - Z_REAR) * ROOF_TAN, base + (Z_FRONT - z) * ROOF_TAN - ROOF_DROP);
}
export const Z_STRIP_RIDGE = (Z_REAR + Z_FRONT) / 2 - ROOF_DROP / (2 * ROOF_TAN);
export const Y_STRIP_RIDGE = stripRoofTop(Z_STRIP_RIDGE);

// Stair
// Photo reconstruction (101157/101200/101312): eight straight treads before the corner.
// Count turning steps, the half landing and the rise onto the first floor separately.
export const STAIR_TREADS = { lower: 8, middle: 3, upper: 6 } as const;
export const RISERS = STAIR_TREADS.lower + 2 + STAIR_TREADS.middle + 1 + STAIR_TREADS.upper + 1;
export const RISE = Y_FF / RISERS; // 21 equal risers, about 171 mm

// Named interior wall lines
export const Z_STAIR_N = 4.44; // bedroom-4 south wall / first-floor bedroom wall
export const Z_CORE_S = 6.5; // line between flight 2 and the half landing / flight 3 (no GF wall here)
export const Z_LIVING_N = 7.58; // living back wall / master bedroom north wall
export const X_STAIR_E = 3.16;
export const X_STAIR_W_STRIP = 1.15; // east edge of winders / flight 2
export const X_WELL_E = 1.72; // first-floor slab edge / guard along the stair well (plan)
// photo 101153 floor tiles (0.6 m) counted from the east wall: the kitchen opening is ≈ 1.6 tiles wide and
// its east jamb ≈ 2.8 tiles from the east wall; the stair foot stops ≈ 0.08 m short of the pier end (plan: 3.27)
export const X_STAIR_FOOT = 3.28; // first riser of flight 1
export const X_KITCHEN_OPEN_W = 3.36; // end of the stair back wall (short pier past the stair foot)
export const X_KITCHEN_OPEN_E = 4.3; // dining -> kitchen opening
export const X_STAIR_TOP = 2.76; // top riser of flight 3 = first-floor slab edge (plan)
export const X_BATH_W = 3.94; // first floor bathrooms west wall
export const Z_BATH_SPLIT = 9.63;

// Renovated ensuite windows share the outside wall; the master-facing return stays solid.
export const BATH1_WINDOWS = [
  { a: 4.35, b: 4.9, y0: Y_FF + 1.85, y1: Y_FF + 2.35 },
  { a: 5.15, b: 5.7, y0: Y_FF + 1.85, y1: Y_FF + 2.35 },
];

export interface RoomInfo {
  id: string;
  name: string;
  malay: string;
  level: 'gf' | 'ff' | 'site';
  x0: number;
  x1: number;
  z0: number;
  z1: number;
  y: number;
  labelOffset?: [number, number];
}

const hi = T_INT / 2;
const he = T_EXT / 2;
const hp = T_PARTY / 2;

export const ROOMS: RoomInfo[] = [
  // Ground floor
  { id: 'living', name: 'Living Room', malay: 'Ruang Tamu', level: 'gf', x0: hp, x1: W - hp, z0: Z_LIVING_N + hi, z1: Z_FRONT - he, y: 0 },
  { id: 'dining', name: 'Dining', malay: 'Ruang Makan', level: 'gf', x0: X_STAIR_E, x1: W - hp, z0: Z_STAIR_N + hi, z1: Z_LIVING_N + hi, y: 0 },
  { id: 'kitchen', name: 'Kitchen', malay: 'Dapur', level: 'gf', x0: 3.1 + hi, x1: W - hp, z0: he, z1: Z_STAIR_N - hi, y: 0, labelOffset: [0.2, 0.6] },
  { id: 'bed4', name: 'Bedroom 4', malay: 'Bilik Tidur 4', level: 'gf', x0: hp, x1: 3.1 - hi, z0: 1.53 + hi, z1: Z_STAIR_N - hi, y: 0 },
  { id: 'bath3', name: 'Bathroom 3', malay: 'Bilik Mandi 3', level: 'gf', x0: 1.51 + hi, x1: 3.98 - hi, z0: he, z1: 1.53 - hi, y: 0 },
  { id: 'porch', name: 'Car Porch', malay: 'Anjung Kereta', level: 'site', x0: hp, x1: W - hp, z0: Z_FRONT + he, z1: Z_LOT_FRONT, y: -0.15 },
  { id: 'yard', name: 'Rear Yard', malay: 'Laman Belakang', level: 'site', x0: hp, x1: W - hp, z0: Z_LOT_REAR + 0.1, z1: -he, y: -0.1 },
  // First floor
  { id: 'bed3', name: 'Bedroom 3', malay: 'Bilik Tidur 3', level: 'ff', x0: hp, x1: 3.04 - hi, z0: he, z1: Z_STAIR_N - hi, y: Y_FF },
  { id: 'bed2', name: 'Bedroom 2', malay: 'Bilik Tidur 2', level: 'ff', x0: 3.04 + hi, x1: W - hp, z0: he, z1: Z_STAIR_N - hi, y: Y_FF },
  { id: 'family', name: 'Family Hall', malay: 'Ruang Keluarga', level: 'ff', x0: X_WELL_E, x1: W - hp, z0: Z_STAIR_N + hi, z1: Z_LIVING_N - hi, y: Y_FF, labelOffset: [0.7, 0] },
  { id: 'master', name: 'Master Bedroom', malay: 'Bilik Tidur Utama', level: 'ff', x0: hp, x1: X_BATH_W - hi, z0: Z_LIVING_N + hi, z1: Z_FRONT - he, y: Y_FF },
  { id: 'bath2', name: 'Bathroom 2', malay: 'Bilik Mandi 2', level: 'ff', x0: X_BATH_W + hi, x1: W - hp, z0: Z_LIVING_N + hi, z1: Z_BATH_SPLIT - hi, y: Y_FF },
  { id: 'bath1', name: 'Bathroom 1 (ensuite)', malay: 'Bilik Mandi 1', level: 'ff', x0: X_BATH_W + hi, x1: W - hp, z0: Z_BATH_SPLIT + hi, z1: Z_BATH_FRONT - he, y: Y_FF },
  { id: 'balcony', name: 'Balcony', malay: 'Balkoni', level: 'ff', x0: hp, x1: W - hp, z0: Z_FRONT + he, z1: Z_BALCONY_FRONT - 0.2, y: Y_BALCONY, labelOffset: [0.3, 0.4] },
];

export const SPECS: [string, string][] = [
  ['Orientation', 'Front (street side) faces south'],
  ['Lot size', '20′ × 70′ (6.10 m × 21.34 m)'],
  ['Ground floor (internal length)', '11.74 m'],
  ['First floor (internal length)', '12.19 m'],
  ['Floor to floor (GF → FF)', '3.60 m'],
  ['FF floor to roof beam', '3.35 m'],
  ['Plinth above road', '0.20 m'],
  ['Porch → front door', '2 steps × 150 mm'],
  ['Car porch depth', '≈ 6.9 m'],
  ['Balcony depth', '≈ 4.6 m'],
  ['Bedrooms / Bathrooms', '4 / 3'],
];
