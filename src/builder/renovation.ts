import * as THREE from 'three';
import type { Kit } from './kit';
import type { UnitOpts } from './house';
import type { RenovationLayout } from '../designs';
import { wall, skin, casement, slidingDoor, roomSlidingDoor, hingedDoorLeaf, toilet, basin, shower, floorTrap, type MovableSink } from './fixtures';
import { leafMovable, type MovableSpec } from '../doors';
import { W, T_INT, KITCHEN_PARTITION, MASTER_PARTITION, GUEST_ENSUITE_DOOR, Z_LOT_REAR, Z_RENOVATED_BED4_REAR, RENOVATED_REAR_DOOR, RENOVATED_KITCHEN_WINDOW, RENOVATED_BATH3, Z_FRONT, Z_MASTER_EXTENSION_FRONT, X_BATH_W, Y_FF, Y_BALCONY, Y_FF_CEIL, Y_GF_CEIL, Y_RENOVATED_GF_CEIL, EXTENSION_ROOF, MASTER_EXTENSION_ROOF } from '../config';

type Windows = (id: string, label: string, level: 'gf' | 'ff') => MovableSink | undefined;

/** Original low-profile roof, with the main roof's tile material and scale. */
function extensionRoof(kit: Kit, x0: number, x1: number, z0: number, z1: number, ceiling: number, dir: 1 | -1) {
  const eaveZ = dir < 0 ? z0 : z1;
  const low = ceiling + EXTENSION_ROOF.eaveRise, high = ceiling + EXTENSION_ROOF.wallRise;
  const y0 = dir < 0 ? low : high, y1 = dir < 0 ? high : low;
  const scale = Math.hypot(z1 - z0, high - low) / (z1 - z0);
  const previousUV = kit.uvFn;
  kit.uvFn = (p, n, mat) => mat === 'roofTile'
    ? [dir * p[0], Math.abs(p[2] - eaveZ) * scale]
    : previousUV?.(p, n, mat) ?? null;
  kit.prismZY([
    [z0, ceiling], [z1, ceiling], [z1, y1], [z0, y0],
  ], x0, x1, 'wallExt', (_nz, ny) => ny > 0.5 ? 'roofTile' : ny < -0.5 ? 'soffit' : 'wallExt');
  kit.uvFn = previousUV;
  kit.box(x0, x1, ceiling - 0.03, low, eaveZ - 0.02, eaveZ + 0.02, 'fascia');
}

export function buildRearExtension(kit: Kit, G: UnitOpts['G'], mv: Windows, parts: MovableSpec[], layout: RenovationLayout) {
  const z = Z_LOT_REAR;
  kit.group = G('gf');
  const window = { a: 0.45, b: 1.45, y0: 1.75, y1: 2.4 };
  wall(kit, 'x', z, 0.05, W - 0.05, -0.3, Y_GF_CEIL, 0.2, 'wallInt', 'wallExt', [
    window, { ...RENOVATED_REAR_DOOR, y0: 0, y1: 2.55 },
    RENOVATED_KITCHEN_WINDOW,
  ]);
  casement(kit, 'x', z, window.a, window.b, window.y0, window.y1,
    { panes: 2, glass: 'glassFrosted', hung: 'top', movable: mv('win-bath3', 'Relocated bathroom window', 'gf') });
  const ensuite = layout.bathroomAccess === 'ensuite';
  const suiteDoor = GUEST_ENSUITE_DOOR;
  wall(kit, 'x', Z_RENOVATED_BED4_REAR, 0.05, 1.96, 0, Y_GF_CEIL, T_INT, 'wallInt', 'bathWall',
    ensuite ? [{ a: suiteDoor.a, b: suiteDoor.b, y0: 0, y1: suiteDoor.height }] : []);
  const door = { a: -2.4, b: -1.34 };
  wall(kit, 'z', 1.9, z + 0.1, Z_RENOVATED_BED4_REAR - 0.06, 0, Y_GF_CEIL, T_INT, 'wallInt', 'bathWall',
    ensuite ? [] : [{ ...door, y0: 0, y1: 2.1 }]);
  const floorY = 0;
  kit.box(0.05, 1.84, -0.3, floorY, z + 0.1, Z_RENOVATED_BED4_REAR - 0.06, 'bathFloor');
  if (ensuite) {
    const { angle, ...leaf } = hingedDoorLeaf(kit, 'x', Z_RENOVATED_BED4_REAR, T_INT,
      suiteDoor.a, suiteDoor.b, 0, suiteDoor.height,
      { hingeAtB: false, openTo: 1, angle: Math.PI / 2, mat: 'doorBath', frameW: 0.035 });
    parts.push(leafMovable({ ...leaf, id: 'bath3', label: 'Guest ensuite door', level: 'gf', maxAngle: angle }));
  } else {
    parts.push({ ...roomSlidingDoor(kit, 1.9, door.a, door.b, 1, 'doorBath'), id: 'bath3', label: 'Shared bathroom sliding door', level: 'gf' });
  }
  const bath = RENOVATED_BATH3;
  shower(kit, bath.westX, floorY, bath.showerZ, Math.PI / 2, { waterTap: false });
  toilet(kit, bath.westX, floorY, bath.toiletZ, Math.PI / 2);
  basin(kit, bath.basinX, 0.84, bath.rearZ, 0);
  floorTrap(kit, 0.55, floorY, bath.showerZ - 0.1);
  const kw = RENOVATED_KITCHEN_WINDOW;
  slidingDoor(kit, 'x', z, kw.a, kw.b, kw.y0, kw.y1,
    { panels: 2, glass: 'glass', movable: mv('win-kitchen', 'Kitchen sliding window', 'gf'), group: 'win-kitchen' });
  kit.group = G('slab1');
  kit.box(0.05, W - 0.05, Y_GF_CEIL, Y_GF_CEIL + 0.15, z - 0.1, 0.1, { py: 'concreteLight', rest: 'ceiling' });
  kit.group = G('roof');
  extensionRoof(kit, 0, W, z - 0.22, 0.1, Y_GF_CEIL + 0.15, -1);
  kit.group = G('gf');
}

/** Full-height partitions are part of the selected plan, even without furniture. */
export function buildLayoutPartitions(kit: Kit, G: UnitOpts['G'], mv: Windows, parts: MovableSpec[], layout: RenovationLayout) {
  if (layout.kitchen === 'enclosed') {
    kit.group = G('gf');
    const { z, a, b, height } = KITCHEN_PARTITION;
    wall(kit, 'x', z, 3.1 + T_INT / 2, W - 0.05, 0, Y_RENOVATED_GF_CEIL, T_INT, 'wallInt', 'wallInt',
      [{ a, b, y0: 0, y1: height }]);
    slidingDoor(kit, 'x', z, a, b, 0, height,
      { panels: 2, glass: 'glass', frame: 'aluWhite', movable: mv('kitchen-divider', 'Kitchen sliding partition', 'gf') });
  }
  if (layout.masterExtension && layout.masterZone !== 'open') {
    kit.group = G('ff');
    const { z, a, b, height } = MASTER_PARTITION;
    wall(kit, 'x', z, 0.05, X_BATH_W - T_INT / 2, Y_FF, Y_FF_CEIL, T_INT, 'wallInt', 'wallInt',
      [{ a, b, y0: Y_FF, y1: Y_FF + height }]);
    const { angle, ...leaf } = hingedDoorLeaf(kit, 'x', z, T_INT, a, b, Y_FF, height,
      { hingeAtB: true, openTo: 1, angle: Math.PI / 2, mat: 'doorWood', frameW: 0.035 });
    parts.push(leafMovable({ ...leaf, id: 'master-zone',
      label: layout.masterZone === 'study' ? 'Study door' : 'Dressing room door', level: 'ff', maxAngle: angle }));
  }
}

export function buildMasterExtension(kit: Kit, G: UnitOpts['G'], mv: Windows) {
  const east = X_BATH_W - 0.06, south = Z_MASTER_EXTENSION_FRONT;
  kit.group = G('slab1');
  kit.box(0.05, east, Y_BALCONY, Y_FF, Z_FRONT - 0.1, south + 0.1, 'floorTile');
  kit.group = G('ff');
  const picture = { a: 0.4, b: east - 0.35, y0: Y_FF + 1.375, y1: Y_FF + 2.425 };
  wall(kit, 'x', south, 0.05, east, Y_FF, Y_FF_CEIL, 0.2, 'wallExtGrey', 'wallInt', [picture]);
  casement(kit, 'x', south, picture.a, picture.b, picture.y0, picture.y1, {
    panes: 1, hung: 'top', nOff: 0.07, openAngle: Math.PI / 3,
    movable: mv('win-master', 'Master bedroom top-hinged window', 'ff'),
  });
  const a = 12.55, b = south - 0.25;
  wall(kit, 'z', east - 0.1, 12.29, south - 0.1, Y_FF, Y_FF_CEIL, 0.2, 'wallExtGrey', 'wallInt', [{ a, b, y0: Y_FF, y1: Y_FF + 2.3 }]);
  slidingDoor(kit, 'z', east - 0.1, a, b, Y_FF, Y_FF + 2.3,
    { panels: 2, nOff: 0.03, movable: mv('slide-master', 'East-facing master sliding door', 'ff') });
  kit.group = G('ceil2');
  kit.box(0.05, east, Y_FF_CEIL, Y_FF_CEIL + 0.15, Z_FRONT - 0.1, south + 0.1, { py: 'concreteLight', rest: 'ceiling' });
  kit.group = G('roof');
  const { back, front, ceiling, eastOverhang } = MASTER_EXTENSION_ROOF;
  extensionRoof(kit, 0, east + eastOverhang, back, front, ceiling, 1);
  kit.group = G('ff');
}

export function buildAutoGate(kit: Kit, parts: MovableSpec[]) {
  const z = 18.6, y0 = -0.1, y1 = 1.8;
  const frame = 0.055, divider = 0.04;
  const outerMeshWidth = 0.5, centerMeshWidth = 0.4;
  const foldGap = 0.015, foldOffset = -0.06;
  const panel = (k: Kit, a: number, b: number, meshAtStart: boolean, meshWidth: number) => {
    for (const x of [a, b - frame]) k.box(x, x + frame, y0, y1, z - 0.045, z + 0.045, 'railBlack');
    for (const y of [y0, y1 - frame]) k.box(a, b, y, y + frame, z - 0.045, z + 0.045, 'railBlack');
    const meshA = meshAtStart ? a + frame : b - frame - meshWidth, meshB = meshA + meshWidth;
    const dividerX = meshAtStart ? meshB : meshA - divider;
    const slatA = meshAtStart ? meshB + divider : a + frame;
    const slatB = meshAtStart ? b - frame : dividerX;
    const slatWidth = 0.032, slatPitch = 0.055;
    const slatCount = Math.floor((slatB - slatA + slatPitch - slatWidth) / slatPitch);
    const slatStart = (slatA + slatB - ((slatCount - 1) * slatPitch + slatWidth)) / 2;
    for (let i = 0; i < slatCount; i++) {
      const x = slatStart + i * slatPitch;
      k.box(x, x + slatWidth, y0 + frame, y1 - frame, z - 0.035, z + 0.035, 'railBlack');
    }
    // Fine wire mesh: 20 mm pitch with 3 mm wires (17 mm clear holes).
    const pitch = 0.02, wire = 0.003;
    for (let x = meshA; x + wire <= meshB; x += pitch)
      k.box(x, x + wire, y0 + frame, y1 - frame, z - wire / 2, z + wire / 2, 'railBlack');
    for (let y = y0 + frame; y + wire <= y1 - frame; y += pitch)
      k.box(meshA, meshB, y, y + wire, z - wire / 2, z + wire / 2, 'railBlack');
    k.box(dividerX, dividerX + divider, y0, y1, z - 0.04, z + 0.04, 'railBlack');
  };
  // The party-wall builder supplies the two outer piers. No centre pillars.
  kit.box(-0.1, 0.1, 1.13, 1.24, 18.75, 18.76, 'plaque45');
  for (const side of [0, 1]) {
    const a = side === 0 ? 0.25 : W / 2 + 0.015;
    const b = side === 0 ? W / 2 - 0.015 : W - 0.25;
    const middle = (a + b) / 2, left = side === 0;
    const hinge = left ? a + frame / 2 : b - frame / 2;
    const angle = left ? -Math.PI / 2 : Math.PI / 2;
    // Keep the operator fixed while the two panels on each side fold together.
    kit.box(hinge - 0.06, hinge + 0.06, y0, y0 + 0.23, z - 0.19, z - 0.06, 'railBlack');
    parts.push({ id: `auto-gate-${side}`, label: 'Full-width folding automatic gate', level: 'site', index: side,
      kind: 'hinge', pivot: [hinge, z], angle,
      build: (k) => {
        panel(k, left ? a : middle + foldGap / 2, left ? middle - foldGap / 2 : b, left, outerMeshWidth);
        for (const y of [y0 + 0.2, (y0 + y1) / 2, y1 - 0.2]) {
          k.rod(new THREE.Vector3(middle, y - 0.045, z + foldOffset),
            new THREE.Vector3(middle, y + 0.045, z + foldOffset), 0.018, 'railBlack', 12);
        }
      },
      fold: {
        // Offset the joint towards the porch so the outward-folded panels have a clear gap.
        pivot: [middle, z + foldOffset], angle: -2 * angle,
        build: (k) => panel(k, left ? middle + foldGap / 2 : a, left ? b : middle - foldGap / 2, !left, centerMeshWidth),
      },
    });
  }
}

/**
 * L-shaped kitchen in the renovated rear extension: one leg along the new rear wall (sink under the
 * kitchen window), the other along the east party wall (hob + chimney hood), with wall cabinets above.
 */
export function buildLKitchen(kit: Kit) {
  const windowA = RENOVATED_KITCHEN_WINDOW.a, windowB = RENOVATED_KITCHEN_WINDOW.b;
  const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
  const zR = Z_LOT_REAR + 0.1; // inner face of the rear wall
  const xE = W - 0.05; // inner face of the east party wall
  const xA = RENOVATED_REAR_DOOR.b + 0.1; // clear of the back-door frame
  const zEnd = 0.35; // end of the east leg
  const D = 0.6, F = 0.58, C = 0.56; // worktop depth, door-front plane, carcass front
  const plinth = 0.1, top = 0.9, wt = 0.03, gap = 0.003;
  const CAB = 'cabinet', TOP = 'worktop';

  // --- tiled splashback between worktop and wall cabinets
  const previousUV = kit.uvFn;
  kit.uvFn = (p, n, mat) => mat === 'kitchenTile'
    ? (Math.abs(n[0]) > 0.5 ? [p[2] - zR, p[1] - top] : [xE - p[0], p[1] - top])
    : previousUV?.(p, n, mat) ?? null;
  skin(kit, 'x', Z_LOT_REAR, 0.1, 1, xA, xE, top, 1.5, 'kitchenTile', [{ a: windowA, b: windowB, y0: 1.1, y1: 2.55 }]);
  skin(kit, 'z', W, 0.05, -1, zR + 0.008, zEnd, top, 1.5, 'kitchenTile');
  kit.uvFn = previousUV;

  // --- carcasses and plinths
  kit.box(xA, xE, plinth, top - wt, zR, zR + C, CAB); // rear leg (incl. blind corner)
  kit.box(xE - C, xE, plinth, top - wt, zR + C, zEnd, CAB); // east leg
  kit.box(xA + 0.02, xE, 0, plinth, zR, zR + C - 0.05, 'black');
  kit.box(xE - C + 0.05, xE, 0, plinth, zR + C - 0.05, zEnd - 0.02, 'black');

  // --- fronts: 'd' = door, 'dd' = pair of doors, 'k' = three-drawer stack
  const bar = (along: 'x' | 'z', s: number, y: number, len = 0.16) => along === 'x'
    ? kit.box(s - len / 2, s + len / 2, y - 0.006, y + 0.006, zR + F, zR + F + 0.022, 'stainless')
    : kit.box(xE - F - 0.022, xE - F, y - 0.006, y + 0.006, s - len / 2, s + len / 2, 'stainless');
  const panel = (along: 'x' | 'z', s0: number, s1: number, y0: number, y1: number) => along === 'x'
    ? kit.box(s0 + gap, s1 - gap, y0 + gap, y1 - gap, zR + C, zR + F, CAB)
    : kit.box(xE - F, xE - C, y0 + gap, y1 - gap, s0 + gap, s1 - gap, CAB);
  const fronts = (along: 'x' | 'z', s0: number, layout: [number, 'd' | 'dd' | 'k'][]) => {
    const y0 = plinth, y1 = top - wt;
    let s = s0;
    for (const [w, kind] of layout) {
      const s1 = s + w, mid = (s + s1) / 2;
      if (kind === 'k') {
        const ys = [y0, y0 + 0.3, y0 + 0.55, y1];
        for (let i = 0; i < 3; i++) {
          panel(along, s, s1, ys[i], ys[i + 1]);
          bar(along, mid, ys[i + 1] - 0.05, 0.3);
        }
      } else if (kind === 'dd') {
        panel(along, s, mid, y0, y1);
        panel(along, mid, s1, y0, y1);
        // vertical pulls either side of the meeting stiles
        for (const d of [-0.03, 0.03]) {
          if (along === 'x') kit.box(mid + d - 0.006, mid + d + 0.006, y1 - 0.22, y1 - 0.06, zR + F, zR + F + 0.022, 'stainless');
          else kit.box(xE - F - 0.022, xE - F, y1 - 0.22, y1 - 0.06, mid + d - 0.006, mid + d + 0.006, 'stainless');
        }
      } else {
        panel(along, s, s1, y0, y1);
        const hs = along === 'x' ? s1 - 0.04 : s + 0.04;
        if (along === 'x') kit.box(hs - 0.006, hs + 0.006, y1 - 0.22, y1 - 0.06, zR + F, zR + F + 0.022, 'stainless');
        else kit.box(xE - F - 0.022, xE - F, y1 - 0.22, y1 - 0.06, hs - 0.006, hs + 0.006, 'stainless');
      }
      s = s1;
    }
  };
  const rearRun = xE - F - xA;
  const sinkCab = 1.4; // double doors under the sink
  fronts('x', xA, [[sinkCab, 'dd'], [rearRun - sinkCab, 'k']]);
  const eastRun = zEnd - (zR + F);
  fronts('z', zR + F, [[0.6, 'd'], [0.6, 'k'], [eastRun - 1.2, 'dd']]);

  // --- worktop with a cut-out for the sink bowl under the window
  // large single-bowl sink (twice the width of the original bowl), centred under the window
  const tapX = (windowA + windowB) / 2;
  const kx0 = tapX - 0.48, kx1 = tapX + 0.48, kz0 = zR + 0.12, kz1 = zR + 0.5, d = 0.2;
  kit.box(xA, kx0, top - wt, top, zR, zR + D, TOP);
  kit.box(kx1, xE, top - wt, top, zR, zR + D, TOP);
  kit.box(kx0, kx1, top - wt, top, zR, kz0, TOP);
  kit.box(kx0, kx1, top - wt, top, kz1, zR + D, TOP);
  kit.box(kx0, kx1, top - wt - d, top - wt - d + 0.004, kz0, kz1, 'stainless');
  kit.box(kx0 - 0.004, kx0, top - wt - d, top - wt, kz0, kz1, 'stainless');
  kit.box(kx1, kx1 + 0.004, top - wt - d, top - wt, kz0, kz1, 'stainless');
  kit.box(kx0, kx1, top - wt - d, top - wt, kz0 - 0.004, kz0, 'stainless');
  kit.box(kx0, kx1, top - wt - d, top - wt, kz1, kz1 + 0.004, 'stainless');
  kit.rod(V(tapX, top - wt - d, (kz0 + kz1) / 2), V(tapX, top - wt - d + 0.005, (kz0 + kz1) / 2), 0.035, 'chrome'); // waste
  const tz = zR + 0.06;
  kit.rod(V(tapX, top, tz), V(tapX, top + 0.32, tz), 0.014, 'chrome');
  kit.rod(V(tapX, top + 0.32, tz), V(tapX, top + 0.32, zR + 0.28), 0.011, 'chrome');
  kit.rod(V(tapX, top + 0.32, zR + 0.28), V(tapX, top + 0.25, zR + 0.28), 0.011, 'chrome');
  kit.box(tapX + 0.02, tapX + 0.03, top + 0.18, top + 0.2, tz - 0.01, tz + 0.08, 'chrome'); // lever

  // --- induction hob on the east leg, chimney hood above
  const hobZ = zR + F + 0.9;
  kit.box(xE - 0.55, xE - 0.05, top, top + 0.006, hobZ - 0.3, hobZ + 0.3, 'glassDark');
  for (const [dx, dz, r] of [[-0.14, -0.14, 0.09], [-0.14, 0.14, 0.08], [0.14, -0.14, 0.08], [0.14, 0.14, 0.1]] as const) {
    const x = xE - 0.3 + dx, z = hobZ + dz;
    kit.rod(V(x, top + 0.006, z), V(x, top + 0.0068, z), r, 'plasticGrey', 24);
    kit.rod(V(x, top + 0.006, z), V(x, top + 0.0072, z), r - 0.004, 'glassDark', 24);
  }
  kit.box(xE - 0.5, xE, 1.55, 1.62, hobZ - 0.3, hobZ + 0.3, 'stainless');
  kit.box(xE - 0.3, xE, 1.62, 1.72, hobZ - 0.2, hobZ + 0.2, 'stainless');
  kit.box(xE - 0.26, xE, 1.72, Y_GF_CEIL, hobZ - 0.13, hobZ + 0.13, 'stainless');

  // --- tall wall cabinets on the east wall, one either side of the hood
  const wy0 = 1.5, wy1 = 2.4, wd = 0.35;
  const eastWallCab = (e0: number, e1: number) => {
    kit.box(xE - wd + 0.018, xE, wy0, wy1, e0, e1, CAB);
    const eMid = (e0 + e1) / 2;
    kit.box(xE - wd, xE - wd + 0.018, wy0 + gap, wy1 - gap, e0 + gap, eMid - gap, CAB);
    kit.box(xE - wd, xE - wd + 0.018, wy0 + gap, wy1 - gap, eMid + gap, e1 - gap, CAB);
    for (const z of [eMid - 0.03, eMid + 0.03]) kit.box(xE - wd - 0.022, xE - wd, wy0 + 0.05, wy0 + 0.2, z - 0.006, z + 0.006, 'stainless');
  };
  eastWallCab(zR, hobZ - 0.4); // corner side of the hood
  eastWallCab(hobZ + 0.4, zEnd); // dining side of the hood
}
