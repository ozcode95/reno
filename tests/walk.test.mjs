import assert from 'node:assert/strict';
import { after, test } from 'node:test';
import { createServer } from 'vite';
import { BoxGeometry, DoubleSide, Mesh, MeshBasicMaterial, PerspectiveCamera, Vector3 } from 'three';

globalThis.window = new EventTarget();
globalThis.document = new EventTarget();
const server = await createServer({ server: { middlewareMode: true, ws: false, watch: null }, appType: 'custom' });
const { WalkControls } = await server.ssrLoadModule('/src/controls/walk.ts');
after(() => server.close());

function fixture(wall = false) {
  const material = new MeshBasicMaterial({ side: DoubleSide });
  const floor = new Mesh(new BoxGeometry(20, 0.2, 20), material);
  floor.position.y = -0.1;
  const colliders = [floor];
  if (wall) {
    const obstacle = new Mesh(new BoxGeometry(20, 3, 0.1), material);
    obstacle.position.set(0, 1.5, 2);
    colliders.push(obstacle);
  }
  colliders.forEach(mesh => mesh.updateMatrixWorld(true));
  const camera = new PerspectiveCamera();
  const walk = new WalkControls(camera, {}, () => colliders);
  walk.enable(false);
  walk.place(new Vector3(0, 1.6, 4), new Vector3(0, 1.6, 0));
  return { walk, camera, cleanup: () => {
    walk.disable();
    colliders.forEach(mesh => mesh.geometry.dispose());
    material.dispose();
  } };
}

test('joystick supports gentle movement and caps diagonal movement at walking speed', () => {
  const { walk, cleanup } = fixture();
  try {
    walk.setMoveInput(0.5, 0);
    walk.update(0.05);
    assert.ok(Math.abs(walk.feet.z - (4 - 1.45 * 0.05 * 0.5)) < 1e-6);
    const previous = walk.feet.clone();
    walk.setMoveInput(1, 1);
    walk.update(0.05);
    assert.ok(Math.abs(walk.feet.distanceTo(previous) - 1.45 * 0.05) < 1e-6);
    assert.ok(walk.feet.x > previous.x && walk.feet.z < previous.z);
  } finally { cleanup(); }
});

test('joystick movement respects walls and camera pitch limits', () => {
  const { walk, cleanup } = fixture(true);
  try {
    walk.setMoveInput(1, 0);
    for (let frame = 0; frame < 100; frame++) walk.update(0.05);
    assert.ok(walk.feet.z >= 2.05 + walk.radius, 'Stops outside the wall with body clearance');
    assert.ok(walk.feet.z < 3, 'Still approaches the wall');
    walk.look(100, 100000);
    assert.equal(walk.pitch, -1.45);
    assert.ok(walk.yaw < 0);
    walk.look(0, -200000);
    assert.equal(walk.pitch, 1.45);
  } finally { cleanup(); }
});

test('losing focus or leaving Walk clears joystick input', () => {
  const { walk, cleanup } = fixture();
  try {
    walk.setMoveInput(1, 0);
    walk.update(0.05);
    window.dispatchEvent(new Event('blur'));
    const stopped = walk.feet.clone();
    walk.update(0.05);
    assert.deepEqual(walk.feet.toArray(), stopped.toArray());
    walk.setMoveInput(1, 0);
    walk.disable();
    walk.enable(false);
    walk.update(0.05);
    assert.deepEqual(walk.feet.toArray(), stopped.toArray());
  } finally { cleanup(); }
});

test('desktop keyboard movement remains available', () => {
  const { walk, cleanup } = fixture();
  try {
    const down = Object.assign(new Event('keydown'), { code: 'KeyW' });
    window.dispatchEvent(down);
    walk.update(0.05);
    assert.ok(walk.feet.z < 4);
    window.dispatchEvent(Object.assign(new Event('keyup'), { code: 'KeyW' }));
    const stopped = walk.feet.clone();
    walk.update(0.05);
    assert.deepEqual(walk.feet.toArray(), stopped.toArray());
  } finally { cleanup(); }
});
