import assert from 'node:assert/strict';
import { after, test } from 'node:test';
import { createServer } from 'vite';

const server = await createServer({ server: { middlewareMode: true, ws: false, watch: null }, appType: 'custom' });
after(() => server.close());
const { initialRenderQuality, updateRenderQuality } = await server.ssrLoadModule('/src/render-quality.ts');

function runFrames(state, count, frameTime, devicePixelRatio) {
  return Array.from({ length: count }).reduce(
    quality => updateRenderQuality(quality, frameTime, devicePixelRatio), state,
  );
}

test('sustained slow navigation reduces resolution within its budget without changing input state', () => {
  const initial = initialRenderQuality(2);
  const original = { ...initial };
  const slower = runFrames(initial, 80, 1 / 20, 2);
  assert.ok(slower.pixelRatio < initial.pixelRatio);
  assert.equal(runFrames(slower, 1000, 1 / 20, 2).pixelRatio, 0.5);
  assert.deepEqual(initial, original);
});

test('resolution recovers during smooth navigation and respects the screen density', () => {
  for (const devicePixelRatio of [1, 2]) {
    const reduced = runFrames(initialRenderQuality(devicePixelRatio), 1000, 1 / 20, devicePixelRatio);
    const recovered = runFrames(reduced, 2400, 1 / 60, devicePixelRatio);
    assert.equal(recovered.pixelRatio, Math.min(devicePixelRatio, 1.5));
  }
});

test('an isolated stall does not resize targets and resolution changes have a cooldown', () => {
  const initial = initialRenderQuality(2);
  const warmed = runFrames(initial, 180, 1 / 60, 2);
  const stalled = updateRenderQuality(warmed, 0.15, 2);
  assert.equal(stalled.pixelRatio, initial.pixelRatio);
  const reduced = runFrames(warmed, 60, 1 / 20, 2);
  assert.ok(reduced.cooldown > 0);
  assert.equal(runFrames(reduced, 30, 1 / 20, 2).pixelRatio, reduced.pixelRatio);
});
