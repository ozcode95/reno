import type { Kit, P2 } from './kit';
import { buildUnit, partyWall, type UnitOpts } from './house';
import { buildInterior } from './interior';
import { ORIGINAL_HOUSE, interiorMaterials, type InteriorStyle, type RenovationLayout } from '../designs';
import { W, Z_LOT_FRONT, Z_LOT_REAR, RENOVATED_REAR_DOOR, SITE_CONTEXT } from '../config';

/** `interior` furnishes the renovated layout only; it is ignored without the renovation */
export function buildWorld(kit: Kit, renovation: RenovationLayout = ORIGINAL_HOUSE, interior: InteriorStyle = 'none') {
  // ---- the house (No. 45) on its own lot
  const mainG: UnitOpts['G'] = (g) => g;
  kit.setTransform(null);
  const style = renovation.groundFloor ? interior : 'none';
  kit.remap = interiorMaterials(style);
  buildUnit(kit, { main: true, G: mainG, renovation });
  partyWall(kit, 0, 'west', mainG, 1, renovation);
  partyWall(kit, W, 'east', mainG, -1, renovation);
  buildGround(kit, renovation);
  buildInterior(kit, style, renovation);
  kit.remap = {};
}

/** Square land base with roads and recessed drains along the front and rear boundaries. */
function buildGround(kit: Kit, renovation: RenovationLayout) {
  kit.group = 'context';
  const half = (Math.max(W, Z_LOT_FRONT - Z_LOT_REAR) + 2 * SITE_CONTEXT.margin) / 2;
  const centerX = W / 2, centerZ = (Z_LOT_FRONT + Z_LOT_REAR) / 2;
  const x0 = centerX - half, x1 = centerX + half;
  const rear = centerZ - half, front = centerZ + half;
  const rearDrainEnd = Z_LOT_REAR - SITE_CONTEXT.rearDrainOffset;
  const frontDrainStart = Z_LOT_FRONT + SITE_CONTEXT.frontDrainOffset;
  const channels = [
    { z0: rearDrainEnd - SITE_CONTEXT.drainWidth, z1: rearDrainEnd, towardsHouse: 1 },
    { z0: frontDrainStart, z1: frontDrainStart + SITE_CONTEXT.drainWidth, towardsHouse: -1 },
  ] as const;

  // Cut the channels into the top while keeping one connected square foundation beneath them.
  const profile: P2[] = [[rear, -1.2], [front, -1.2], [front, -0.46]];
  for (let i = channels.length - 1; i >= 0; i--) {
    const { z0, z1 } = channels[i];
    profile.push([z1, -0.46], [z1, -1], [z0, -1], [z0, -0.46]);
  }
  profile.push([rear, -0.46]);
  kit.prismZY(profile, x0, x1, 'ground', 'ground');

  for (const { z0, z1, towardsHouse } of channels) buildDrain(kit, x0, x1, z0, z1, towardsHouse);
  const [backDrain, frontDrain] = channels;
  const roadStart = frontDrain.z1 + SITE_CONTEXT.frontPavementWidth;
  kit.box(x0, x1, -0.4, -0.25, frontDrain.z1, roadStart, 'concreteLight');
  kit.box(x0, x1, -0.5, -0.35, roadStart, front, 'asphalt');
  kit.box(x0, x1, -0.5, -0.3, rear, backDrain.z0, 'asphalt');

  // Crossings follow the active front gate and rear access, above the open drain channels.
  kit.box(renovation.autoGate ? 0.22 : 0.85, renovation.autoGate ? W - 0.22 : 4.48,
    -0.32, -0.17, frontDrain.z0 + 0.08, frontDrain.z1 - 0.08, 'concreteLight');
  const rearAccess = renovation.groundFloor ? RENOVATED_REAR_DOOR : { a: 4.02, b: 4.88 };
  kit.box(rearAccess.a - 0.08, rearAccess.b + 0.08, -0.32, -0.1,
    backDrain.z0 + 0.08, Z_LOT_REAR + 0.1, 'concreteLight');
}

/** Shared open U-drain, with the taller lip facing the property. */
function buildDrain(kit: Kit, x0: number, x1: number, z0: number, z1: number, towardsHouse: 1 | -1) {
  const wall = SITE_CONTEXT.drainWall;
  kit.box(x0, x1, -1, -0.92, z0, z1, 'drainDark');
  kit.box(x0, x1, -0.92, towardsHouse < 0 ? -0.2 : -0.25, z0, z0 + wall, 'concreteLight');
  kit.box(x0, x1, -0.92, towardsHouse > 0 ? -0.2 : -0.25, z1 - wall, z1, 'concreteLight');
}
