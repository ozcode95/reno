import type { Kit } from './kit';
import { buildUnit, partyWall, type UnitOpts } from './house';
import { buildInterior, type InteriorStyle } from './interior';

/** `interior` furnishes the renovated layout only; it is ignored without the renovation */
export function buildWorld(kit: Kit, renovated = false, interior: InteriorStyle = 'none') {
  // ---- the house (No. 45) on its own lot
  const mainG: UnitOpts['G'] = (g) => g;
  kit.setTransform(null);
  kit.remap = {};
  buildUnit(kit, { main: true, G: mainG, renovated });
  partyWall(kit, 0, 'west', mainG, 1, renovated);
  partyWall(kit, 6.096, 'east', mainG, -1, renovated);
  buildStreet(kit, renovated);
  if (renovated && interior !== 'none') buildInterior(kit, interior);
}

/** minimal, quiet context: ground, front drain + road, back lane */
function buildStreet(kit: Kit, renovated: boolean) {
  kit.group = 'context';
  const X0 = -40, X1 = 46;
  // front U-drain with the driveway crossing slab
  kit.box(X0, X1, -1.0, -0.92, 18.75, 19.4, 'drainDark');
  kit.box(X0, X1, -0.92, -0.2, 18.75, 18.85, 'concreteLight');
  kit.box(X0, X1, -0.92, -0.25, 19.3, 19.4, 'concreteLight');
  kit.box(renovated ? 0.22 : 0.85, renovated ? 5.876 : 4.48, -0.32, -0.17, 18.83, 19.32, 'concreteLight'); // driveway crossing slab (gate opening)
  kit.box(X0, X1, -0.4, -0.25, 19.4, 19.9, 'concreteLight');
  // road with centre line
  kit.box(X0, X1, -0.5, -0.35, 19.9, 27.1, 'asphalt');
  for (let x = X0; x < X1; x += 9) kit.box(x, x + 3, -0.35, -0.346, 23.44, 23.56, 'paintLine');
  kit.box(X0, X1, -0.4, -0.25, 27.1, 27.6, 'concreteLight');
  // back lane
  kit.box(X0, X1, -0.45, -0.3, -12.5, -2.76, 'asphalt');
  // ground
  for (const [z0, z1] of [[-300, 18.75], [19.4, 300]]) kit.box(-300, 300, -1.2, -0.46, z0, z1, 'ground', 'ny');
}
