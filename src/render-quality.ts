/** Frame timing for automatic resolution; manual render scales bypass this state. */
export interface RenderQuality {
  pixelRatio: number;
  elapsed: number;
  frames: number;
  cooldown: number;
}

export function initialRenderQuality(devicePixelRatio: number): RenderQuality {
  return { pixelRatio: Math.min(devicePixelRatio, 1.5), elapsed: 0, frames: 0, cooldown: 2 };
}

/** Adjust only after sustained load, with a pause between render-target reallocations. */
export function updateRenderQuality(state: RenderQuality, dt: number, devicePixelRatio: number): RenderQuality {
  if (state.cooldown > 0) return { ...state, cooldown: Math.max(0, state.cooldown - dt) };
  const elapsed = state.elapsed + dt, frames = state.frames + 1;
  if (elapsed < 2) return { ...state, elapsed, frames };
  const frameTime = elapsed / frames;
  const maxRatio = Math.min(devicePixelRatio, 1.5);
  const pixelRatio = frameTime > 1 / 45 ? Math.max(0.5, state.pixelRatio - 0.25)
    : frameTime < 1 / 58 ? Math.min(maxRatio, state.pixelRatio + 0.25) : state.pixelRatio;
  return { pixelRatio, elapsed: 0, frames: 0, cooldown: pixelRatio === state.pixelRatio ? 0 : 3 };
}
