import * as THREE from 'three';
import type { Kit } from './kit';
import type { UnitOpts } from './house';
import {
  AWNINGS, MASTER_EXTENSION_ROOF, W, T_EXT, T_INT, T_PARTY, X_BALCONY_NOTCH, X_BATH_W,
  Z_BALCONY_FRONT, Z_MASTER_EXTENSION_FRONT, Y_BALCONY, Y_PORCH_GATE,
} from '../config';

interface Section { x0: number; x1: number; z0: number }
type Canopy = typeof AWNINGS.porch | typeof AWNINGS.balcony;

/** One sloped roof plane across both arms of an L, shedding rain from the open front edge. */
function canopy(kit: Kit, sections: Section[], dimensions: Canopy) {
  const { back, front, high, slope } = dimensions;
  const { frameWidth, frameDepth, panelWidth, panelThickness } = AWNINGS;
  const yAt = (z: number) => high - (z - back) * slope;
  const rafters = new Map<number, number>();
  for (const { x0, x1, z0 } of sections) {
    kit.prismZY([
      [z0, yAt(z0)], [front, yAt(front)],
      [front, yAt(front) + panelThickness], [z0, yAt(z0) + panelThickness],
    ], x0, x1, 'awningDaylight', 'awningDaylight');
    const bays = Math.ceil((x1 - x0) / panelWidth);
    for (let i = 0; i <= bays; i++) {
      const x = i === bays ? x1 : x0 + (x1 - x0) * i / bays;
      rafters.set(x, Math.min(z0, rafters.get(x) ?? z0));
    }
    // Wall ledger and front beam sit below the sheet, leaving its daylight area clear.
    for (const z of [z0, front - frameWidth / 2]) {
      kit.box(x0, x1, yAt(z) - frameDepth, yAt(z), z - frameWidth / 2, z + frameWidth / 2, 'awningFrame');
    }
  }
  for (const [x, z0] of rafters) {
    kit.bar(new THREE.Vector3(x, yAt(z0) - frameDepth / 2, z0),
      new THREE.Vector3(x, yAt(front) - frameDepth / 2, front), frameWidth, frameDepth, 'awningFrame');
  }
  return yAt;
}

/** Structural renovation fittings, independent of the selected furniture style. */
export function buildAwnings(kit: Kit, G: UnitOpts['G']) {
  const west = T_PARTY / 2, east = W - west;
  const masterEast = X_BATH_W - T_INT / 2;
  const masterFront = Z_MASTER_EXTENSION_FRONT + T_EXT / 2;
  kit.group = G('roof');
  const porchY = canopy(kit, [
    { x0: west, x1: X_BALCONY_NOTCH, z0: masterFront },
    { x0: X_BALCONY_NOTCH, x1: east, z0: Z_BALCONY_FRONT },
  ], AWNINGS.porch);
  // Meet the tiled roof at its overhang edges without overlapping coplanar sheets.
  const masterRoofEast = masterEast + MASTER_EXTENSION_ROOF.eastOverhang;
  const balconyY = canopy(kit, [
    { x0: X_BALCONY_NOTCH, x1: masterRoofEast, z0: MASTER_EXTENSION_ROOF.front },
    { x0: masterRoofEast, x1: east, z0: AWNINGS.balcony.back },
  ], AWNINGS.balcony);

  // Porch posts stay at the boundary piers, outside the full-width gate's swing.
  kit.group = G('site');
  const porchPostZ = AWNINGS.porch.front - 0.08;
  for (const x of [0.14, W - 0.14]) {
    kit.box(x - 0.05, x + 0.05, Y_PORCH_GATE, porchY(porchPostZ), porchPostZ - 0.05, porchPostZ + 0.05, 'awningFrame');
  }

  // Mount balcony posts on the existing masonry piers, keeping the glass bays and walkway open.
  kit.group = G('ff');
  const balconyPostZ = Z_BALCONY_FRONT - 0.1;
  for (const x of [X_BALCONY_NOTCH + 0.11, 3.7, east - 0.13]) {
    kit.box(x - 0.04, x + 0.04, Y_BALCONY, balconyY(balconyPostZ), balconyPostZ - 0.04, balconyPostZ + 0.04, 'awningFrame');
  }
}
