import assert from 'node:assert/strict';
import { after, test } from 'node:test';
import { createServer } from 'vite';
import { MeshBasicMaterial, DoubleSide, Raycaster, Vector3, Vector2, Box2, Box3, PerspectiveCamera, Mesh, BoxGeometry } from 'three';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
after(() => server.close());
const { RENOVATION_PLANS, INTERIOR_STYLES, ORIGINAL_HOUSE } = await server.ssrLoadModule('/src/designs.ts');
const { Kit } = await server.ssrLoadModule('/src/builder/kit.ts');
const { buildWorld } = await server.ssrLoadModule('/src/builder/context.ts');
const { buildAutoGate } = await server.ssrLoadModule('/src/builder/renovation.ts');
const { allOpenables } = await server.ssrLoadModule('/src/builder/house.ts');
const { Openables } = await server.ssrLoadModule('/src/doors.ts');
const { FurnitureDrag } = await server.ssrLoadModule('/src/controls/furniture-drag.ts');
const { interiorLamps } = await server.ssrLoadModule('/src/builder/interior.ts');
const { roomsFor } = await server.ssrLoadModule('/src/tools/annotations.ts');
const { W, Z_FRONT, Z_MASTER_EXTENSION_FRONT, Z_BATH_FRONT, MASTER_PARTITION, T_INT, Y_FF, X_BATH_W, BATH1_WINDOWS, LIVING_WINDOW } = await server.ssrLoadModule('/src/config.ts');
const material = new MeshBasicMaterial({ side: DoubleSide });
after(() => material.dispose());

for (const plan of RENOVATION_PLANS) {
  test(`${plan.label}: raised living window has tinted glazing and an operable right casement`, () => {
    const kit = new Kit();
    buildWorld(kit, plan);
    const groups = kit.build(() => material, () => true);
    const moving = new Openables(() => material, () => true);
    const staticMeshes = [...groups.values()].flatMap(group => {
      group.updateMatrixWorld(true);
      return group.children;
    });
    const hit = (x, y, meshes = staticMeshes) => new Raycaster(
      new Vector3(x, y, Z_FRONT - 0.4), new Vector3(0, 0, 1), 0, 0.8,
    ).intersectObjects(meshes)[0];
    try {
      const windows = allOpenables().filter(part => part.id.startsWith('win-living'));
      assert.equal(windows.length, plan.groundFloor ? 1 : 0);
      if (!plan.groundFloor) {
        assert.equal(allOpenables().filter(part => part.id.startsWith('slide-living')).length, 3);
        return;
      }
      const { a, b, y0, y1, openingWidth } = LIVING_WINDOW;
      const paneX = (a + b - openingWidth) / 2, sashX = b - openingWidth / 2;
      const y = (y0 + y1) / 2;
      assert.equal(hit(paneX, 0.85).object.userData.matKey, 'wallInt', 'Raised sill fills the former lower glass');
      assert.equal(hit(b + 0.1, y).object.userData.matKey, 'wallInt', 'Right edge is closed with matching wall');
      assert.equal(hit(paneX, y).object.userData.matKey, 'glassSolar', 'Large picture pane stays tinted');
      assert.equal(hit(sashX, y), undefined, 'Static geometry leaves the casement opening clear');
      const leaf = moving.add(windows[0]);
      assert.equal(leaf.open, false, 'Casement starts closed');
      assert.equal(hit(sashX, y, leaf.meshes).object.userData.matKey, 'glassSolar', 'Closed sash uses the same tint');
      moving.toggle(leaf, true);
      for (let frame = 0; frame < 20; frame++) moving.update(0.1);
      assert.equal(hit(sashX, y, leaf.meshes), undefined, 'Open sash provides ventilation');
      const bounds = new Box3().setFromObject(leaf.pivot);
      assert.ok(bounds.max.z > Z_FRONT + 0.4, 'Sash opens outwards towards the porch');
      assert.ok(bounds.min.x > b - openingWidth, 'Sash swings away from the fixed pane');
      assert.equal(hit(paneX, y).object.userData.matKey, 'glassSolar', 'Picture pane remains fixed when the casement opens');
      moving.toggle(leaf, false);
      for (let frame = 0; frame < 20; frame++) moving.update(0.1);
      assert.equal(hit(sashX, y, leaf.meshes).object.userData.matKey, 'glassSolar', 'Sash closes the opening again');
    } finally {
      for (const mesh of [...staticMeshes, ...moving.meshes]) mesh.geometry.dispose();
      moving.clear();
    }
  });

  test(`${plan.label}: awnings cover the exposed porch and remaining balcony`, () => {
    const kit = new Kit();
    buildWorld(kit, plan);
    const groups = kit.build(() => material, () => true);
    const roof = groups.get('roof');
    roof.updateMatrixWorld(true);
    const awnings = roof.children.filter(mesh => mesh.userData.matKey.startsWith('awning'));
    const covers = (x, z, key, y) => new Raycaster(new Vector3(x, y, z), new Vector3(0, 1, 0))
      .intersectObjects(awnings.filter(mesh => mesh.userData.matKey === key)).length > 0;
    try {
      assert.equal(awnings.length > 0, plan.groundFloor, 'Awnings follow Reno, including with no furniture');
      if (!plan.groundFloor) return;
      for (const [x, z] of [[0.55, 15.7], [0.55, 17.5], [3, 17.5], [5.8, 18.2]]) {
        assert.ok(covers(x, z, 'awningDaylight', 2), `Daylight porch shelter at ${x}, ${z}`);
      }
      for (const [x, z] of [[1.3, 15.3], [3.4, 16.3], [4.4, 12.6], [5.8, 14.5], [5.8, 16.3]]) {
        assert.ok(covers(x, z, 'awningDaylight', Y_FF + 1.8), `Daylight balcony shelter at ${x}, ${z}`);
      }
      assert.equal(covers(2, 13, 'awningDaylight', Y_FF + 1.8), false, 'Canopy avoids the enclosed master extension');
      assert.equal(covers(0.5, 15.5, 'awningDaylight', Y_FF + 1.8), false, 'Canopy follows the balcony notch');
      const balconyRoof = new Raycaster(new Vector3(4.4, Y_FF, 13), new Vector3(0, 1, 0))
        .intersectObjects(awnings.filter(mesh => mesh.userData.matKey === 'awningDaylight'))[0];
      assert.ok(balconyRoof?.point.y > Y_FF + 2.3, 'Canopy clears the master sliding door');
    } finally {
      for (const group of groups.values()) for (const mesh of group.children) mesh.geometry.dispose();
    }
  });

  test(`${plan.label}: ensuite windows match the layout and master finishes have no floor overlap`, () => {
    const kit = new Kit();
    buildWorld(kit, plan);
    const groups = kit.build(() => material, () => true);
    const moving = new Openables(() => material, () => true);
    const staticMeshes = [...groups.values()].flatMap((group) => {
      group.updateMatrixWorld(true);
      return group.children;
    });
    const hits = (origin, direction, distance, meshes = staticMeshes) =>
      new Raycaster(new Vector3(...origin), new Vector3(...direction), 0, distance).intersectObjects(meshes);
    try {
      const windows = allOpenables().filter((part) => part.id.startsWith('win-bath1'));
      assert.equal(windows.length, plan.masterExtension ? 2 : 1);
      for (const spec of windows) moving.add(spec);
      for (const [i, opening] of BATH1_WINDOWS.entries()) {
        if (i === 0 && !plan.masterExtension) continue;
        const origin = [(opening.a + opening.b) / 2, opening.y0 + 0.065, Z_BATH_FRONT - 0.4];
        const direction = [0, 0, 1];
        assert.equal(hits(origin, direction, 0.8).length, 0, 'Wall and bathroom tiles leave the window clear');
        const leaf = moving.get(i === 0 ? 'win-bath1-west-0' : 'win-bath1-0');
        assert.ok(hits(origin, direction, 0.8, leaf.meshes).length > 0, 'Closed sash fills its opening');
        moving.toggle(leaf, true);
        for (let frame = 0; frame < 20; frame++) moving.update(0.1);
        assert.equal(hits(origin, direction, 0.8, leaf.meshes).length, 0, 'Open sash clears the bottom of its opening');
        moving.toggle(leaf, false);
        for (let frame = 0; frame < 20; frame++) moving.update(0.1);
        assert.ok(hits(origin, direction, 0.8, leaf.meshes).length > 0, 'Sash closes again');
      }
      const masterWall = hits([3.4, Y_FF + 2.05, 12.02], [1, 0, 0], 0.7)[0];
      assert.equal(masterWall.object.userData.matKey, plan.masterExtension ? 'wallInt' : 'glassFrosted', 'Corner return is closed only in renovation layouts');
      const bathroomWall = hits([4.3, Y_FF + 2.05, 12.02], [-1, 0, 0], 0.6)[0];
      assert.equal(bathroomWall.object.userData.matKey, plan.masterExtension ? 'bathWall' : 'glassFrosted', 'Bathroom tiles preserve the existing corner opening');
      if (!plan.masterExtension) {
        const cornerFront = hits([4.2, Y_FF + 2.05, Z_BATH_FRONT - 0.4], [0, 0, 1], 0.8)[0];
        assert.equal(cornerFront.object.userData.matKey, 'glassFrosted', 'Existing house retains the front corner pane');
        const unchangedWall = hits([4.7, Y_FF + 2.05, Z_BATH_FRONT - 0.4], [0, 0, 1], 0.8)[0];
        assert.equal(unchangedWall.object.userData.matKey, 'bathWall', 'Existing house has no relocated opening');
      }
      if (plan.masterExtension) {
        for (const z of [11.9, 12.24]) {
          assert.equal(hits([3.4, Y_FF + 0.8, z], [1, 0, 0], 0.7)[0].object.userData.matKey, 'wallInt');
        }
        assert.equal(hits([0.4, Y_FF + 0.8, 13], [-1, 0, 0], 0.5)[0].object.userData.matKey, 'wallInt');
        for (const x of [0.2, 1.75, X_BATH_W - 0.3]) {
          for (const z of [Z_FRONT - 0.11, Z_FRONT - 0.08, Z_FRONT + 0.08, Z_FRONT + 0.11]) {
            const floor = hits([x, Y_FF + 0.2, z], [0, -1, 0], 0.21);
            assert.equal(floor.length, 1, `Exactly one finished floor at ${x}, ${z}`);
            assert.equal(floor[0].object.userData.matKey, 'floorTile');
            assert.ok(Math.abs(floor[0].point.y - Y_FF) < 1e-6, 'Tiles remain level through the former facade');
          }
        }
      }
    } finally {
      for (const mesh of [...staticMeshes, ...moving.meshes]) mesh.geometry.dispose();
      moving.clear();
    }
  });

  test(`${plan.label}: dimensions match the room layout`, () => {
    const rooms = roomsFor(plan);
    assert.equal(rooms.find((r) => r.id === 'master').z1,
      plan.masterZone !== 'open' ? MASTER_PARTITION.z - T_INT / 2 :
        (plan.masterExtension ? Z_MASTER_EXTENSION_FRONT : Z_FRONT) - 0.1);
    assert.equal(rooms.find((r) => r.id === 'yard').level, plan.groundFloor ? 'gf' : 'site');
    if (!plan.masterExtension) {
      assert.deepEqual(rooms.find((r) => r.id === 'balcony'), roomsFor(ORIGINAL_HOUSE).find((r) => r.id === 'balcony'));
    }
    const frontRoom = rooms.find((room) => room.id === 'study' || room.id === 'dressing');
    assert.equal(frontRoom?.id, plan.masterZone === 'open' ? undefined : plan.masterZone);
    if (frontRoom) {
      assert.equal(frontRoom.z0, MASTER_PARTITION.z + T_INT / 2);
      assert.equal(frontRoom.z1, Z_MASTER_EXTENSION_FRONT - 0.1);
    }
  });

  let unfurnishedDoors;
  for (const style of ['none', ...INTERIOR_STYLES.map((design) => design.id)]) {
    test(`${plan.label} / ${style}: valid geometry, consistent doors and furniture within the house`, () => {
      const kit = new Kit();
      buildWorld(kit, plan, style);
      const groups = kit.build(() => material, () => true);
      const doors = allOpenables();
        const furnished = plan.groundFloor && style !== 'none';
      try {
        assert.equal(doors.filter((door) => door.id.startsWith('auto-gate')).length, plan.autoGate ? 2 : 0);
        assert.equal(doors.filter((door) => door.id.startsWith('kitchen-divider')).length, plan.kitchen === 'enclosed' ? 2 : 0);
        assert.equal(doors.some((door) => door.id === 'master-zone'), plan.masterZone !== 'open');
        if (plan.bathroomAccess === 'ensuite') assert.equal(doors.find((door) => door.id === 'bath3').kind, 'hinge');
        // Furniture must never move walls, door openings or window sashes.
        const openings = doors.map(({ build, fold, ...opening }) => ({
          ...opening, ...(fold ? { fold: { pivot: fold.pivot, angle: fold.angle } } : {}),
        }));
        if (style === 'none') unfurnishedDoors = openings;
        else assert.deepEqual(openings, unfurnishedDoors);
        const lamps = interiorLamps();
        assert.equal(groups.has('coffee-table'), furnished, 'Coffee table moves separately from fixed furniture');
        assert.equal(lamps.some((lamp) => lamp.level !== 'site'), furnished);
        assert.equal(lamps.filter((lamp) => lamp.level === 'site' && lamp.pos[1] > 3).length,
          plan.groundFloor ? 4 : 0, 'Porch ceiling lights remain with no furniture');
        if (style === 'none' && plan.groundFloor) {
          // Probe the actual unfurnished walls: concepts must differ before a style is selected.
          const blocked = (level, origin, direction, distance) => {
            const ray = new Raycaster(new Vector3(...origin), new Vector3(...direction), 0, distance);
            groups.get(level).updateMatrixWorld(true);
            return ray.intersectObjects(groups.get(level).children).length > 0;
          };
          assert.equal(blocked('gf', [3.26, 1.4, 2], [0, 0, -1], 0.8), plan.kitchen === 'enclosed', 'Kitchen partition pier');
          assert.equal(blocked('gf', [4, 1.4, 2], [0, 0, -1], 0.8), false, 'Kitchen doorway is cut out');
          assert.equal(blocked('gf', [5.2, 1.4, 4.9], [0, 0, -1], 1), !plan.wideKitchenOpening, 'Dining opening width');
          assert.equal(blocked('gf', [2.2, 1.2, -1.9], [-1, 0, 0], 0.6), plan.bathroomAccess === 'ensuite', 'Old shared bathroom entrance');
          assert.equal(blocked('gf', [0.8, 1.2, 0.2], [0, 0, -1], 0.6), plan.bathroomAccess !== 'ensuite', 'New ensuite entrance');
          assert.equal(blocked('ff', [1.5, 4.8, 11.95], [0, 0, 1], 0.6), plan.masterZone !== 'open', 'Master partition');
          assert.equal(blocked('ff', [3, 4.8, 11.95], [0, 0, 1], 0.6), false, 'Study/dressing doorway is cut out');
          const moving = new Openables(() => material, () => true);
          const passageChecks = [];
          if (plan.kitchen === 'enclosed') passageChecks.push(['kitchen-divider-0', [4, 1.4, 2], [0, 0, -1]]);
          if (plan.masterZone !== 'open') passageChecks.push(['master-zone', [3, 4.8, 11.95], [0, 0, 1]]);
          if (plan.bathroomAccess === 'ensuite') passageChecks.push(['bath3', [0.8, 1.2, 0.2], [0, 0, -1]]);
          for (const [id] of passageChecks) moving.add(doors.find((door) => door.id === id));
          try {
            for (const [id, origin, direction] of passageChecks) {
              const ray = new Raycaster(new Vector3(...origin), new Vector3(...direction), 0, 0.8);
              assert.ok(ray.intersectObjects(moving.meshes).length > 0, `${id} closes its entrance`);
              moving.toggle(moving.get(id), true);
              for (let frame = 0; frame < 40; frame++) moving.update(0.1);
              assert.equal(ray.intersectObjects(moving.meshes).length, 0, `${id} opens a usable entrance`);
            }
          } finally {
            for (const mesh of moving.meshes) mesh.geometry.dispose();
            moving.clear();
          }
        }
        const ffFurniture = groups.get('ff').children.filter((mesh) =>
          mesh.userData.matKey.startsWith('jp') || mesh.userData.matKey.includes('/'));
        assert.equal(ffFurniture.length > 0, furnished);
        if (furnished && plan.masterZone !== 'open') {
          for (const mesh of ffFurniture) {
            const positions = mesh.geometry.getAttribute('position');
            for (let i = 0; i < positions.count; i++) {
              const x = positions.getX(i), z = positions.getZ(i);
              assert.ok(z <= MASTER_PARTITION.z - T_INT / 2 + 0.001 ||
                z >= MASTER_PARTITION.z + T_INT / 2 - 0.001 ||
                (x >= MASTER_PARTITION.a && x <= MASTER_PARTITION.b),
              `${mesh.name} intersects the study/dressing partition`);
            }
          }
        }
        if (furnished && !plan.masterExtension) {
          for (const mesh of ffFurniture) {
            assert.ok(mesh.geometry.boundingBox.max.z <= Z_FRONT - 0.1 + 0.001,
              `${mesh.name} extends into the unrenovated balcony`);
          }
          assert.ok(interiorLamps().filter((lamp) => lamp.level === 'ff').every((lamp) => lamp.pos[2] < Z_FRONT));
        }
        const meshKeys = [...groups.values()].flatMap((group) => group.children.map((mesh) => mesh.userData.matKey));
        assert.equal(meshKeys.includes('awningDaylight'), plan.groundFloor);
        for (const design of INTERIOR_STYLES.filter((design) => design.id !== 'japanese')) {
          assert.equal(meshKeys.some((key) => key.startsWith(`${design.id}/`)), furnished && style === design.id);
        }
        for (const group of groups.values()) {
          for (const mesh of group.children) {
            const { min, max } = mesh.geometry.boundingBox;
            assert.ok([...min, ...max].every(Number.isFinite), `${mesh.name} has invalid bounds`);
          }
        }
      } finally {
        for (const group of groups.values()) for (const mesh of group.children) mesh.geometry.dispose();
      }
    });
  }
}

test('returning to the existing house clears lamps from the last interior', () => {
  const kit = new Kit();
  buildWorld(kit, ORIGINAL_HOUSE);
  assert.deepEqual(interiorLamps(), []);
});

test('automatic gate folds outward into two side stacks and either inner panel controls both sides', () => {
  const kit = new Kit(), specs = [];
  kit.group = 'site';
  buildAutoGate(kit, specs);
  const moving = new Openables(() => material, () => true);
  const [left, right] = specs.map(spec => moving.add(spec));
  const bounds = leaf => new Box3().setFromObject(leaf.pivot);
  const advance = frames => { for (let i = 0; i < frames; i++) moving.update(0.1); };
  const ray = x => new Raycaster(new Vector3(x, 1.78, 20), new Vector3(0, 0, -1), 0, 4);
  try {
    assert.equal(specs.length, 2);
    assert.ok(left.foldPivot && right.foldPivot, 'Each side has a second hinged panel');
    const closed = [bounds(left), bounds(right)];
    assert.ok(Math.abs(closed[0].min.x - 0.25) < 0.001);
    assert.ok(Math.abs(closed[0].max.x - (W / 2 - 0.015)) < 0.001);
    assert.ok(Math.abs(closed[1].max.x - (W - 0.25)) < 0.001);
    for (const x of [1.1, 4.9]) assert.ok(ray(x).intersectObjects(moving.meshes).length > 0);

    const innerHit = ray(2.9).intersectObjects(moving.meshes)[0];
    assert.ok(left.foldPivot.getObjectById(innerHit.object.id), 'The inner panel can be raycast');
    moving.toggle(moving.leafOf(innerHit.object));
    advance(20);
    for (const leaf of [left, right]) {
      assert.equal(leaf.open, true);
      const box = bounds(leaf);
      assert.ok(box.max.x - box.min.x < 0.25, 'Folded panels form a narrow side stack');
      assert.ok(box.max.z - box.min.z < 1.5, 'The gate projects only half a leaf outward');
      assert.ok(box.min.z > 18.55 && box.max.z > 19.9, 'Both stacks fold toward the road');
      assert.ok(box.min.x > 0.22 && box.max.x < W - 0.22, 'Stacks clear both pillars');
      assert.ok(Math.abs(box.min.y + 0.1) < 0.001 && Math.abs(box.max.y - 1.8) < 0.001);
    }
    assert.ok(bounds(left).max.x < 0.5 && bounds(right).min.x > W - 0.5);
    for (const x of [1.1, 4.9]) assert.equal(ray(x).intersectObjects(moving.meshes).length, 0, 'Driveway is clear');

    moving.toggle(right, false);
    advance(5);
    assert.equal(left.open, false);
    assert.ok(left.t > 0 && left.t < 1, 'The gate is partway closed');
    const partial = bounds(left);
    moving.toggle(left, true);
    assert.ok(bounds(left).min.distanceTo(partial.min) < 0.001, 'Reversing does not jump the panels');
    advance(20);
    assert.ok(bounds(left).max.x < 0.5 && bounds(right).min.x > W - 0.5);

    moving.toggle(moving.leafOf(right.foldPivot.children[0].children[0]), false);
    advance(20);
    for (const [i, leaf] of [left, right].entries()) {
      assert.equal(leaf.open, false);
      const box = bounds(leaf);
      assert.ok(box.min.distanceTo(closed[i].min) < 0.001 && box.max.distanceTo(closed[i].max) < 0.001,
        'Both panels return to their original closed positions');
    }
  } finally {
    for (const mesh of moving.meshes) mesh.geometry.dispose();
    moving.clear();
  }
});

test('coffee table drags on the floor, respects clearance, retains its position and cannot be picked through obstacles', () => {
  const kit = new Kit();
  buildWorld(kit, RENOVATION_PLANS[1], 'japanese');
  const groups = kit.build(() => material, () => true);
  const table = groups.get('coffee-table');
  const camera = new PerspectiveCamera(50, 1, 0.05, 100);
  camera.position.set(4.45, 5, 9.85);
  camera.up.set(0, 0, -1);
  camera.lookAt(4.45, 0, 9.85);
  camera.updateMatrixWorld(true);
  const tableTop = new Box3().setFromObject(table).max.y;
  const ndc = (x, z) => {
    const point = new Vector3(x, tableTop, z).project(camera);
    return new Vector2(point.x, point.y);
  };
  const area = new Box2(new Vector2(3, 8.5), new Vector2(6, 11));
  let targets = table.children;
  const drag = new FurnitureDrag(camera, () => targets);
  const blocker = new Mesh(new BoxGeometry(2, 0.1, 2), material);
  try {
    drag.setObject(table, area);
    assert.ok(drag.begin(ndc(4.45, 9.85), 7));
    assert.equal(drag.pointerId, 7);
    assert.equal(drag.begin(ndc(4.45, 9.85), 8), false, 'A second pointer cannot restart the drag');
    assert.ok(drag.move(ndc(10, 17)));
    let box = new Box3().setFromObject(table);
    assert.ok(Math.abs(box.max.x - area.max.x) < 0.001);
    assert.ok(Math.abs(box.max.z - area.max.y) < 0.001);
    assert.equal(table.position.y, 0, 'The table stays on the floor');
    assert.ok(drag.move(ndc(-5, 0)));
    box = new Box3().setFromObject(table);
    assert.ok(Math.abs(box.min.x - area.min.x) < 0.001);
    assert.ok(Math.abs(box.min.z - area.min.y) < 0.001);
    assert.ok(drag.end());
    assert.equal(drag.active, false);
    const position = table.position.clone();
    drag.setObject(null, area);
    assert.equal(drag.begin(ndc(4.45, 9.85), 9), false);
    drag.setObject(table, area);
    assert.ok(table.position.distanceTo(position) < 0.001);
    assert.equal(drag.move(ndc(4.45, 9.85)), false, 'Released pointers cannot move furniture');
    const center = box.getCenter(new Vector3());
    blocker.position.set(center.x, 1, center.z);
    blocker.updateMatrixWorld(true);
    targets = [...table.children, blocker];
    assert.equal(drag.begin(ndc(center.x, center.z), 10), false, 'A closer obstacle blocks selection');
  } finally {
    blocker.geometry.dispose();
    for (const group of groups.values()) for (const mesh of group.children) mesh.geometry.dispose();
  }
});
