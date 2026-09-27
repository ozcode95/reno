import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass.js';
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh';

import { Kit } from './builder/kit';
import { MaterialLib } from './builder/materials';
import { buildWorld } from './builder/context';
import { setMaxAnisotropy, canvasToTexture } from './builder/textures';
import { SkyEnvironment, makeInteriorEnv } from './env';
import { sunPosition, sunTimes, fromMYT, mytParts, ymdOf, fmtClock, fmtDate, compass } from './solar';
import { Post } from './post';
import { WalkControls } from './controls/walk';
import { MeasureTool, type Units } from './tools/measure';
import { Annotations } from './tools/annotations';
import { PathTraceMode } from './pathtrace';
import { VIEWS, type ViewPreset } from './views';
import { Openables } from './doors';
import { allOpenables } from './builder/house';
import { SPECS, W, Z_BATH_FRONT, Y_FF_CEIL, Z_FRONT, Z_BALCONY_FRONT } from './config';
import type { Level, Mode } from './main-types';

THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
THREE.Mesh.prototype.raycast = acceleratedRaycast;

const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
const nextFrame = () => new Promise<void>((r) => requestAnimationFrame(() => r()));

/* ------------------------------------------------------------------ */
/*  Loader                                                             */
/* ------------------------------------------------------------------ */
const loaderSteps = 11;
let loaderStep = 0;
async function progress(msg: string) {
  loaderStep++;
  $('loader-msg').textContent = msg;
  $('loader-fill').style.width = `${Math.min(100, (loaderStep / loaderSteps) * 100)}%`;
  await nextFrame();
}

/* ------------------------------------------------------------------ */
/*  Renderer / scene                                                   */
/* ------------------------------------------------------------------ */
const app = $('app');
const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
const baseDPR = Math.min(window.devicePixelRatio, 1.5);
let renderScale = 1;
renderer.setPixelRatio(baseDPR);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.shadowMap.autoUpdate = false;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.7;
renderer.outputColorSpace = THREE.SRGBColorSpace;
app.appendChild(renderer.domElement);

const css2d = new CSS2DRenderer();
css2d.setSize(window.innerWidth, window.innerHeight);
css2d.domElement.classList.add('css2d');
document.body.appendChild(css2d.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.05, 650);
scene.fog = new THREE.Fog(0xc4cdd5, 90, 520);
camera.position.set(3.4, 1.65, 33);

const lib = new MaterialLib();
const env = new SkyEnvironment(scene);
const groups: Record<string, THREE.Group> = {};
let colliders: THREE.Mesh[] = [];

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.zoomToCursor = true;
controls.screenSpacePanning = true;
controls.minDistance = 0.05;
controls.maxDistance = 260;
controls.maxPolarAngle = Math.PI * 0.97;
controls.target.set(3.05, 3.6, 10);

const walk = new WalkControls(camera, renderer.domElement, () => colliders);
const measure = new MeasureTool(camera, () => colliders);
scene.add(measure.group);
const annotations = new Annotations();
annotations.root.visible = false;
scene.add(annotations.root);
let post: Post;
const pt = new PathTraceMode(renderer, scene, camera);
// doors, window sashes and sliding glass panels are separate objects so they can move (front door closed by default)
const doors = new Openables((k) => lib.get(k), (k) => lib.casts(k));
doors.onSettled = () => {
  renderer.shadowMap.needsUpdate = true;
  if (pt.active) pt.rebuild();
};
/** the door leaf under a screen point (walls in front block it), within maxDist */
function doorAt(ndcPt: THREE.Vector2, maxDist = Infinity) {
  const rc = new THREE.Raycaster();
  (rc as unknown as { firstHitOnly: boolean }).firstHitOnly = true;
  rc.setFromCamera(ndcPt, camera);
  rc.far = maxDist;
  const hit = rc.intersectObjects(colliders, false)[0];
  return hit ? doors.leafOf(hit.object) : undefined;
}

/* ------------------------------------------------------------------ */
/*  State                                                              */
/* ------------------------------------------------------------------ */
let mode: Mode = 'orbit';
let level: Level = 'full';
let baseEV = 0;
let autoExposure = true;
let lensMode: 'auto' | number = 'auto';
let focalNow = 24;
let exposureNow = 0.7;
let tween: { p0: THREE.Vector3; p1: THREE.Vector3; t0: THREE.Vector3; t1: THREE.Vector3; start: number; dur: number } | null = null;
let wantShot = false;
const lastPos = new THREE.Vector3(1e9, 0, 0);
const lastQuat = new THREE.Quaternion();
let lastFocal = 0;

function refreshColliders() {
  colliders = [];
  const visit = (o: THREE.Object3D) => {
    if (!o.visible) return;
    if (o === measure.group || o === annotations.root) return;
    if ((o as THREE.Mesh).isMesh && (o as THREE.Mesh).geometry.boundsTree) colliders.push(o as THREE.Mesh);
    for (const c of o.children) visit(c);
  };
  visit(scene);
}

function setLevel(l: Level) {
  level = l;
  groups.roof && (groups.roof.visible = l === 'full');
  groups.ceil2 && (groups.ceil2.visible = l === 'full');
  groups.ff && (groups.ff.visible = l !== 'gf');
  groups.slab1 && (groups.slab1.visible = l !== 'gf');
  annotations.groups.ff.visible = l !== 'gf';
  document.querySelectorAll<HTMLButtonElement>('#levels button').forEach((b) => b.classList.toggle('on', b.dataset.v === l));
  refreshColliders();
  renderer.shadowMap.needsUpdate = true;
  if (pt.active) pt.rebuild();
}

function setMode(m: Mode) {
  mode = m;
  document.querySelectorAll<HTMLButtonElement>('#mode button').forEach((b) => b.classList.toggle('on', b.dataset.v === m));
  $('btn-pegman').classList.toggle('active', m === 'walk');
  $('tile-walk').classList.toggle('on', m === 'walk');
  if (m === 'walk') {
    tween = null;
    controls.enabled = false;
    const p = camera.position;
    const inside = p.x > 0 && p.x < W && p.z > -2.6 && p.z < 18.6 && p.y < 7.5;
    if (inside) walk.enable(true);
    else {
      walk.enable(false);
      walk.place(new THREE.Vector3(1.65, 1.45, 16.0), new THREE.Vector3(1.65, 1.35, 11.7));
    }
    document.body.classList.add('walking');
  } else {
    walk.disable();
    controls.enabled = true;
    const dir = new THREE.Vector3();
    camera.getWorldDirection(dir);
    controls.target.copy(camera.position).addScaledVector(dir, 2.5);
    controls.update();
    document.body.classList.remove('walking');
  }
  updateHint();
}

function goToView(v: ViewPreset) {
  if (v.level) setLevel(v.level);
  else if (level !== 'full' && !v.id.startsWith('plan') && !v.id.startsWith('doll')) setLevel('full');
  const p = new THREE.Vector3(...v.pos), t = new THREE.Vector3(...v.target);
  if (mode === 'walk') {
    walk.place(p, t);
    return;
  }
  tween = { p0: camera.position.clone(), p1: p, t0: controls.target.clone(), t1: t, start: performance.now(), dur: 1300 };
}

function updateHint() {
  const h = $('hint');
  if (pt.active) h.textContent = pt.ready ? 'Photoreal mode · keep the camera still to refine · P to exit' : '';
  else if (measure.active) h.textContent = mode === 'walk' ? 'Measure: aim crosshair & click two points · Shift = axis lock · Esc cancel' : 'Measure: click two points · Shift = axis lock · Esc cancel · M to exit';
  else if (mode === 'walk') h.textContent = walk.locked ? 'W A S D to walk · Shift to run · click a door or window to open / close it · Esc to release mouse' : 'Click the view to start walking';
  else h.textContent = 'Drag to orbit · right-drag to pan · scroll to zoom · double-click to focus · W A S D to fly · click a door or window to open / close it';
}

/* ------------------------------------------------------------------ */
/*  Exposure                                                           */
/* ------------------------------------------------------------------ */
// Metered like a camera: every 0.3 s the scene is rendered into a tiny linear HDR
// target, and the centre-weighted log-average luminance drives the exposure.
// Reference (k = 1) is the sunny front view, metered once at start-up.
const METER_W = 64, METER_H = 40;
const meterRT = new THREE.WebGLRenderTarget(METER_W, METER_H, { type: THREE.FloatType });
const meterBuf = new Float32Array(METER_W * METER_H * 4);
let meterRef = 0;
let meterK = 1;
let meterNext = 0;
let meterPTK = 0;
// downsamples the path tracer's accumulation buffer into the meter target
const meterQuad = new FullScreenQuad(
  new THREE.ShaderMaterial({
    uniforms: { tSrc: { value: null } },
    vertexShader: 'varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }',
    fragmentShader: 'uniform sampler2D tSrc; varying vec2 vUv; void main() { gl_FragColor = vec4(texture2D(tSrc, vUv).rgb, 1.0); }',
    depthTest: false,
    depthWrite: false,
  }),
);
let meterPTNext = 0;
function meterScene(src: THREE.Texture | null = null): number {
  const prev = renderer.getRenderTarget();
  renderer.setRenderTarget(meterRT);
  if (src) {
    (meterQuad.material as THREE.ShaderMaterial).uniforms.tSrc.value = src;
    meterQuad.render(renderer);
  } else {
    renderer.render(scene, camera);
  }
  renderer.setRenderTarget(prev);
  renderer.readRenderTargetPixels(meterRT, 0, 0, METER_W, METER_H, meterBuf);
  let sw = 0, sl = 0;
  for (let y = 0; y < METER_H; y++) {
    for (let x = 0; x < METER_W; x++) {
      const i = (y * METER_W + x) * 4;
      const L = 0.2126 * meterBuf[i] + 0.7152 * meterBuf[i + 1] + 0.0722 * meterBuf[i + 2];
      const dx = (x + 0.5) / METER_W - 0.5, dy = (y + 0.5) / METER_H - 0.5;
      const w = 1 - 1.4 * (dx * dx + dy * dy);
      sw += w;
      sl += w * Math.log(Math.max(Number.isFinite(L) ? L : 0, 1e-3));
    }
  }
  return Math.exp(sl / sw);
}
/** raster only: lifts sky-lit shadows a little, like a phone camera's HDR mode */
const RASTER_SKY_LIFT = 1.35;
function inHouse(p: THREE.Vector3) {
  return p.x > 0.1 && p.x < W - 0.1 && p.z > 0.1 && p.z < Z_BATH_FRONT && p.y < Y_FF_CEIL && p.y > -0.1;
}
function exposureFactor(): number {
  // path tracing is physically darker indoors (light only enters via openings); meter is frozen
  if (pt.active) {
    const tgt = pt.target;
    const now = performance.now();
    if (tgt && pt.samples >= 3 && meterRef > 0) {
      if (now > meterPTNext) {
        meterPTNext = now + 700;
        meterPTK = THREE.MathUtils.clamp(Math.pow(meterRef / meterScene(tgt.texture), 0.9), 0.5, 45);
      }
      return meterPTK;
    }
    return meterPTK > 0 ? meterPTK : meterK * (inHouse(camera.position) && level === 'full' ? 10 : 1.1);
  }
  meterPTK = 0;
  const now = performance.now();
  if (meterRef > 0 && now > meterNext) {
    meterNext = now + 300;
    const L = meterScene();
    // partial adaptation (exponent < 1): shade/interiors still read a bit darker than sun
    meterK = THREE.MathUtils.clamp(Math.pow(meterRef / L, 0.8), 0.5, 4);
  }
  return meterK;
}

/* ------------------------------------------------------------------ */
/*  Lens (focal length, 35 mm equivalent)                              */
/*  Your phone photos were taken with the 0.5× ultra-wide lens, so     */
/*  indoors we default to a similarly wide lens – a normal lens makes  */
/*  a 5.9 m wide room feel much smaller than it really is.             */
/* ------------------------------------------------------------------ */
function wantFocal(p: THREE.Vector3): number {
  if (lensMode !== 'auto') return lensMode;
  const inHouse = p.x > 0.1 && p.x < W - 0.1 && p.z > 0.1 && p.z < Z_BATH_FRONT && p.y < Y_FF_CEIL && p.y > -0.1;
  if (inHouse && level === 'full') return 15;
  const inLot = p.x > -0.3 && p.x < W + 0.3 && p.z > -2.8 && p.z < 19 && p.y < 7;
  if (inLot) return 18;
  return 26;
}
function updateLens(dt: number, snap = false) {
  const want = wantFocal(camera.position);
  const next = snap ? want : focalNow + (want - focalNow) * (1 - Math.exp(-dt * 3.5));
  if (Math.abs(next - focalNow) > 0.005 || snap) {
    focalNow = next;
    camera.setFocalLength(focalNow);
  }
}

/* ------------------------------------------------------------------ */
/*  Sun clock (Malaysia time, UTC+8)                                   */
/*  The house front faces south: north = −Z, east = +X in the scene.   */
/* ------------------------------------------------------------------ */
let sunLive = true;
let sunDate = ymdOf(new Date());
let sunMin = mytParts(new Date()).min;
let sunTimesCache: { ymd: string; t: ReturnType<typeof sunTimes> } | null = null;

function elevationColor(el: number) {
  // night → twilight → day colours for the time-of-day track
  if (el < -8) return '#1f2d4d';
  if (el < -2) return '#4a4f7a';
  if (el < 3) return '#f08c55';
  if (el < 12) return '#ffc46b';
  return '#8ec5ff';
}
function paintDayTrack() {
  const stops: string[] = [];
  for (let m = 0; m <= 1440; m += 30) stops.push(`${elevationColor(sunPosition(fromMYT(sunDate, m)).elevation)} ${((m / 1440) * 100).toFixed(1)}%`);
  $('sun-tod').style.setProperty('--day-grad', `linear-gradient(90deg, ${stops.join(', ')})`);
}

function applySunClock(force = false) {
  const d = fromMYT(sunDate, sunMin);
  const p = sunPosition(d);
  const dAz = Math.abs(((p.azimuth - env.azimuthDeg + 540) % 360) - 180);
  if (force || dAz > 0.2 || Math.abs(p.elevation - env.elevationDeg) > 0.2) {
    env.setSun(p.azimuth, p.elevation);
    renderer.shadowMap.needsUpdate = true;
    pt.environmentChanged();
  }
  // --- readouts
  const clock = fmtClock(sunMin);
  $('sun-time').textContent = clock;
  $('sun-date-label').textContent = `${fmtDate(d)} · ${sunLive ? 'now' : 'custom time'}`;
  $('live-dot').classList.toggle('on', sunLive);
  $<HTMLInputElement>('sun-tod').value = String(sunMin);
  $<HTMLInputElement>('sun-date').value = sunDate;
  $('btn-live').classList.toggle('on', sunLive);
  const up = p.elevation > -0.27;
  $('sun-pos-short').textContent = up ? `Sun ${p.azimuth.toFixed(0)}° ${compass(p.azimuth)} · ${p.elevation.toFixed(0)}° high · ${fmtDate(d)}` : `Sun below horizon · ${fmtDate(d)}`;
  $('sun-pos').innerHTML = up
    ? `☀️ <b>${p.azimuth.toFixed(0)}° ${compass(p.azimuth)}</b> · <b>${p.elevation.toFixed(1)}°</b> above the horizon`
    : `🌙 Sun is below the horizon (${p.elevation.toFixed(0)}°)`;
  // front façade faces south (bearing 180°)
  const front = Math.cos((p.azimuth - 180) * THREE.MathUtils.DEG2RAD);
  $('sun-face').innerHTML = !up
    ? 'No direct sunlight'
    : p.elevation > 75
      ? 'Sun almost overhead – short shadows all round'
      : front > 0.05
        ? 'Sun on the <b>front (south)</b> façade – car porch side'
        : front < -0.05
          ? 'Sun on the <b>back (north)</b> façade – kitchen / yard side'
          : `Sun from the ${p.azimuth < 180 ? 'east' : 'west'}, grazing the front and back`;
  if (sunTimesCache?.ymd !== sunDate) sunTimesCache = { ymd: sunDate, t: sunTimes(sunDate) };
  const t = sunTimesCache.t;
  $('sun-times').innerHTML = `🌅 Sunrise <b>${fmtClock(t.rise)}</b> · Solar noon <b>${fmtClock(t.noon)}</b> · 🌇 Sunset <b>${fmtClock(t.set)}</b>`;
}

function tickLiveSun() {
  if (!sunLive) return;
  const now = new Date();
  const ymd = ymdOf(now);
  if (ymd !== sunDate) {
    sunDate = ymd;
    paintDayTrack();
  }
  sunMin = mytParts(now).min;
  applySunClock();
}

/* ------------------------------------------------------------------ */
/*  Map-style camera helpers                                           */
/* ------------------------------------------------------------------ */
/** compass bearing the camera looks towards (0 = north / −Z, 90 = east / +X) */
function cameraBearing() {
  const f = new THREE.Vector3();
  camera.getWorldDirection(f);
  return (Math.atan2(f.x, -f.z) * 180) / Math.PI;
}
let lastBearing = 999;
function updateCompass() {
  const b = cameraBearing();
  if (Math.abs(b - lastBearing) < 0.1) return;
  lastBearing = b;
  $('compass-needle').setAttribute('transform', `rotate(${-b} 20 20)`);
}
function faceNorth() {
  if (mode !== 'orbit') return;
  const off = camera.position.clone().sub(controls.target);
  const r = Math.hypot(off.x, off.z);
  // camera south of the target, looking north
  const p1 = controls.target.clone().add(new THREE.Vector3(0, off.y, Math.max(r, 0.01)));
  tween = { p0: camera.position.clone(), p1, t0: controls.target.clone(), t1: controls.target.clone(), start: performance.now(), dur: 700 };
}
function zoomBy(f: number) {
  if (mode !== 'orbit') return;
  const off = camera.position.clone().sub(controls.target);
  const len = THREE.MathUtils.clamp(off.length() * f, controls.minDistance + 0.2, controls.maxDistance);
  const p1 = controls.target.clone().add(off.setLength(len));
  tween = { p0: camera.position.clone(), p1, t0: controls.target.clone(), t1: controls.target.clone(), start: performance.now(), dur: 350 };
}

/* ------------------------------------------------------------------ */
/*  UI wiring                                                          */
/* ------------------------------------------------------------------ */
function initUI() {
  const ui = $('ui');
  ui.classList.remove('hidden');
  // floating cards (Google-Maps style): house info (☰), sun & time (expandable), view details ("More")
  const infoCard = $('info-card'), sunCard = $('sun-card'), detailsCard = $('details-card');
  const setInfo = (open: boolean) => {
    infoCard.classList.toggle('open', open);
    $('btn-menu').classList.toggle('on', open);
    if (open) sunCard.classList.remove('open');
  };
  const setSunCard = (open: boolean) => {
    sunCard.classList.toggle('open', open);
    if (open) setInfo(false);
  };
  const setDetails = (open: boolean) => {
    detailsCard.classList.toggle('open', open);
    $('tile-more').classList.toggle('on', open);
  };
  $('btn-menu').onclick = () => setInfo(!infoCard.classList.contains('open'));
  $('sun-summary').onclick = () => setSunCard(!sunCard.classList.contains('open'));
  $('tile-more').onclick = () => setDetails(!detailsCard.classList.contains('open'));
  document.querySelectorAll<HTMLButtonElement>('[data-close]').forEach(
    (b) => (b.onclick = () => (b.dataset.close === 'info-card' ? setInfo(false) : setDetails(false))),
  );
  // clicking into the 3D view dismisses the pop-up cards
  renderer.domElement.addEventListener('pointerdown', () => {
    setInfo(false);
    setDetails(false);
  });
  $('tile-walk').onclick = () => setMode(mode === 'orbit' ? 'walk' : 'orbit');

  document.querySelectorAll<HTMLButtonElement>('#mode button').forEach((b) => (b.onclick = () => setMode(b.dataset.v as Mode)));
  document.querySelectorAll<HTMLButtonElement>('#levels button').forEach((b) => (b.onclick = () => setLevel(b.dataset.v as Level)));
  $('btn-pegman').onclick = () => setMode(mode === 'orbit' ? 'walk' : 'orbit');
  $('btn-compass').onclick = faceNorth;
  $('btn-zoomin').onclick = () => zoomBy(0.7);
  $('btn-zoomout').onclick = () => zoomBy(1 / 0.7);

  const sel = $<HTMLSelectElement>('views');
  sel.innerHTML = '<option value="">Go to…</option>';
  const byGroup = new Map<string, ViewPreset[]>();
  for (const v of VIEWS) byGroup.set(v.group, [...(byGroup.get(v.group) ?? []), v]);
  for (const [g, vs] of byGroup) {
    const og = document.createElement('optgroup');
    og.label = g;
    for (const v of vs) {
      const o = document.createElement('option');
      o.value = v.id;
      o.textContent = v.label;
      og.appendChild(o);
    }
    sel.appendChild(og);
  }
  sel.onchange = () => {
    const v = VIEWS.find((x) => x.id === sel.value);
    if (v) goToView(v);
    sel.value = '';
    sel.blur();
  };

  // return keyboard focus to the 3D view after using a dropdown (so W/A/S/D and 1/2/3 keep working)
  document.querySelectorAll('select').forEach((s) => s.addEventListener('change', () => s.blur()));

  const dims = $<HTMLInputElement>('chk-dims');
  dims.onchange = () => {
    annotations.root.visible = dims.checked && !pt.active;
    $('chip-dims').classList.toggle('on', dims.checked);
    $('tile-dims').classList.toggle('on', dims.checked);
  };
  $('tile-dims').onclick = () => $('chip-dims').click();
  $('chip-dims').onclick = () => {
    dims.checked = !dims.checked;
    dims.dispatchEvent(new Event('change'));
  };

  const mBtn = $('btn-measure');
  const setMeasure = (on: boolean) => {
    measure.setActive(on);
    mBtn.classList.toggle('active', on);
    document.body.classList.toggle('measuring', on);
    updateHint();
  };
  mBtn.onclick = () => setMeasure(!measure.active);
  $('btn-measure-close').onclick = () => setMeasure(false);
  $('btn-undo').onclick = () => measure.undo();
  $('btn-clear').onclick = () => measure.clear();
  document.querySelectorAll<HTMLButtonElement>('#units button').forEach(
    (b) =>
      (b.onclick = () => {
        measure.units = b.dataset.v as Units;
        measure.refreshUnits();
        annotations.units = measure.units === 'imperial' ? 'imperial' : 'metric';
        annotations.rebuild();
        annotations.groups.ff.visible = level !== 'gf';
        document.querySelectorAll<HTMLButtonElement>('#units button').forEach((x) => x.classList.toggle('on', x === b));
      }),
  );

  // --- sun clock (Malaysia time)
  const tod = $<HTMLInputElement>('sun-tod');
  tod.oninput = () => {
    sunLive = false;
    sunMin = Number(tod.value);
    applySunClock();
  };
  const dateIn = $<HTMLInputElement>('sun-date');
  dateIn.onchange = () => {
    if (!dateIn.value) return;
    sunLive = false;
    sunDate = dateIn.value;
    paintDayTrack();
    applySunClock();
  };
  $('btn-live').onclick = () => {
    sunLive = true;
    tickLiveSun();
    applySunClock();
  };
  setInterval(tickLiveSun, 15000);

  $<HTMLInputElement>('sunk').oninput = (e) => {
    env.sunScale = Number((e.target as HTMLInputElement).value);
    env.updateSun();
    pt.environmentChanged();
  };
  $<HTMLInputElement>('exposure').oninput = (e) => (baseEV = Number((e.target as HTMLInputElement).value));
  $<HTMLInputElement>('chk-autoexp').onchange = (e) => (autoExposure = (e.target as HTMLInputElement).checked);
  const ao = $<HTMLInputElement>('chk-ao');
  ao.onchange = () => {
    post.setAO(ao.checked);
    $('tile-ao').classList.toggle('on', ao.checked);
  };
  $('tile-ao').classList.toggle('on', ao.checked);
  $('tile-ao').onclick = () => {
    ao.checked = !ao.checked;
    ao.dispatchEvent(new Event('change'));
  };
  $<HTMLSelectElement>('tone').onchange = (e) => {
    const v = (e.target as HTMLSelectElement).value;
    renderer.toneMapping = v === 'agx' ? THREE.AgXToneMapping : v === 'neutral' ? THREE.NeutralToneMapping : THREE.ACESFilmicToneMapping;
  };
  $<HTMLSelectElement>('lens').onchange = (e) => {
    const v = (e.target as HTMLSelectElement).value;
    lensMode = v === 'auto' ? 'auto' : Number(v);
  };
  $<HTMLSelectElement>('scale').onchange = (e) => {
    renderScale = Number((e.target as HTMLSelectElement).value);
    onResize();
  };

  const ptBtn = $('btn-pt');
  const togglePT = async () => {
    if (pt.active) {
      pt.disable();
      ptBtn.classList.remove('active');
      lib.setEnvScaled(true);
      env.setSkyBase(RASTER_SKY_LIFT);
      measure.group.visible = true;
      annotations.root.visible = dims.checked;
      $('pt-status').textContent = '';
    } else {
      ptBtn.classList.add('active');
      measure.group.visible = false;
      annotations.root.visible = false;
      lib.setEnvScaled(false);
      env.setSkyBase(1); // path tracing: physically based sky light
      await pt.enable();
    }
    updateHint();
  };
  ptBtn.onclick = togglePT;
  pt.onStatus = (s) => {
    $('pt-status').textContent = s;
    updateHint();
  };
  $('btn-shot').onclick = () => (wantShot = true);

  const specs = $('specs');
  specs.innerHTML = SPECS.map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join('');

  // keyboard shortcuts
  window.addEventListener('keydown', (e) => {
    if ((e.target as HTMLElement)?.tagName === 'INPUT' || (e.target as HTMLElement)?.tagName === 'SELECT') return;
    switch (e.code) {
      case 'KeyV': setMode(mode === 'orbit' ? 'walk' : 'orbit'); break;
      case 'KeyM': setMeasure(!measure.active); break;
      case 'KeyL': $('chip-dims').click(); break;
      case 'KeyN': faceNorth(); break;
      case 'KeyT': setSunCard(!sunCard.classList.contains('open')); break;
      case 'Escape': setInfo(false); setDetails(false); break;
      case 'Digit1': setLevel('full'); break;
      case 'Digit2': setLevel('noroof'); break;
      case 'Digit3': setLevel('gf'); break;
      case 'KeyP': togglePT(); break;
      case 'KeyH': ui.classList.toggle('hidden'); break;
      case 'KeyZ': if (e.ctrlKey) measure.undo(); break;
    }
  });
}

/* ------------------------------------------------------------------ */
/*  Pointer handling (measure, focus, walk lock)                      */
/* ------------------------------------------------------------------ */
const ndc = new THREE.Vector2();
let downAt: [number, number] | null = null;
function toNDC(e: PointerEvent | MouseEvent) {
  const r = renderer.domElement.getBoundingClientRect();
  ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  return ndc;
}
renderer.domElement.addEventListener('pointerdown', (e) => (downAt = [e.clientX, e.clientY]));
renderer.domElement.addEventListener('pointermove', (e) => {
  if (mode === 'orbit' && measure.active) measure.hover(toNDC(e));
  // hand cursor over a door
  const over = mode === 'orbit' && !measure.active && e.buttons === 0 && !!doorAt(toNDC(e));
  renderer.domElement.style.cursor = over ? 'pointer' : '';
});
renderer.domElement.addEventListener('pointerup', (e) => {
  const moved = downAt ? Math.hypot(e.clientX - downAt[0], e.clientY - downAt[1]) : 99;
  downAt = null;
  if (moved > 5 || e.button !== 0) return;
  if (mode === 'walk') {
    if (!walk.locked) walk.lock();
    else if (measure.active) measure.click(new THREE.Vector2(0, 0));
    else doors.toggle(doorAt(new THREE.Vector2(0, 0), 3));
    return;
  }
  if (measure.active) measure.click(toNDC(e));
  else if (e.detail <= 1) doors.toggle(doorAt(toNDC(e)));
});
renderer.domElement.addEventListener('dblclick', (e) => {
  if (mode !== 'orbit' || measure.active) return;
  const rc = new THREE.Raycaster();
  (rc as unknown as { firstHitOnly: boolean }).firstHitOnly = true;
  rc.setFromCamera(toNDC(e), camera);
  const hit = rc.intersectObjects(colliders, false)[0];
  if (!hit) return;
  const off = camera.position.clone().sub(controls.target);
  const t1 = hit.point.clone();
  const dist = Math.min(off.length(), Math.max(1.5, hit.distance * 0.6));
  const p1 = t1.clone().add(off.normalize().multiplyScalar(dist));
  tween = { p0: camera.position.clone(), p1, t0: controls.target.clone(), t1, start: performance.now(), dur: 800 };
});
walk.onLockChange = () => updateHint();

/* ------------------------------------------------------------------ */
/*  Orbit-mode keyboard flying                                         */
/* ------------------------------------------------------------------ */
const flyKeys = new Set<string>();
window.addEventListener('keydown', (e) => {
  const tag = (e.target as HTMLElement)?.tagName;
  if (tag === 'INPUT' || tag === 'SELECT') return;
  flyKeys.add(e.code);
});
window.addEventListener('keyup', (e) => flyKeys.delete(e.code));
window.addEventListener('blur', () => flyKeys.clear());
function orbitFly(dt: number) {
  if (mode !== 'orbit') return;
  const f = (flyKeys.has('KeyW') ? 1 : 0) - (flyKeys.has('KeyS') ? 1 : 0);
  const s = (flyKeys.has('KeyD') ? 1 : 0) - (flyKeys.has('KeyA') ? 1 : 0);
  const u = (flyKeys.has('KeyE') ? 1 : 0) - (flyKeys.has('KeyQ') ? 1 : 0);
  if (!f && !s && !u) return;
  tween = null;
  const dist = camera.position.distanceTo(controls.target);
  const speed = THREE.MathUtils.clamp(dist * 0.9, 1.2, 25) * (flyKeys.has('ShiftLeft') ? 2.5 : 1);
  const fwd = new THREE.Vector3();
  camera.getWorldDirection(fwd);
  fwd.y = 0;
  fwd.normalize();
  const right = new THREE.Vector3().crossVectors(fwd, camera.up).normalize();
  const mv = fwd.multiplyScalar(f).addScaledVector(right, s).addScaledVector(camera.up, u).multiplyScalar(speed * dt);
  camera.position.add(mv);
  controls.target.add(mv);
}

/* ------------------------------------------------------------------ */
/*  Resize                                                             */
/* ------------------------------------------------------------------ */
function onResize() {
  const w = window.innerWidth, h = window.innerHeight;
  renderer.setPixelRatio(baseDPR * renderScale);
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.setFocalLength(focalNow);
  post?.setSize(w, h);
  css2d.setSize(w, h);
  measure.setResolution(w, h);
  pt.cameraMoved();
}
window.addEventListener('resize', onResize);

/* ------------------------------------------------------------------ */
/*  Main loop                                                          */
/* ------------------------------------------------------------------ */
const clock = new THREE.Clock();
function loop() {
  requestAnimationFrame(loop);
  const dt = clock.getDelta();

  if (tween) {
    const t = Math.min(1, (performance.now() - tween.start) / tween.dur);
    const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    camera.position.lerpVectors(tween.p0, tween.p1, e);
    controls.target.lerpVectors(tween.t0, tween.t1, e);
    if (t >= 1) tween = null;
  }
  if (mode === 'orbit') {
    orbitFly(dt);
    controls.update();
  } else {
    walk.update(dt);
    if (measure.active) measure.hover(new THREE.Vector2(0, 0));
  }
  measure.update();
  updateLens(dt);
  updateCompass();
  if (doors.update(dt)) renderer.shadowMap.needsUpdate = true;

  // exposure (eye adaptation)
  const tm = renderer.toneMapping;
  const target = tm === THREE.AgXToneMapping ? 1.0 : tm === THREE.NeutralToneMapping ? 0.85 : 0.62;
  const k = autoExposure ? exposureFactor() : 1;
  const want = target * Math.pow(2, baseEV) * k;
  exposureNow += (want - exposureNow) * (1 - Math.exp(-dt * 2.2));
  renderer.toneMappingExposure = exposureNow;

  camera.updateMatrixWorld();
  // tolerance based: damped controls produce endless micro-moves that would reset path tracing
  if (camera.position.distanceToSquared(lastPos) > 1e-8 || camera.quaternion.angleTo(lastQuat) > 1e-5 || Math.abs(focalNow - lastFocal) > 0.02) {
    lastPos.copy(camera.position);
    lastQuat.copy(camera.quaternion);
    lastFocal = focalNow;
    pt.cameraMoved();
  }

  if (pt.active && pt.ready) {
    pt.render();
    $('pt-status').textContent = `${pt.samples} samples`;
  } else {
    post.render(dt);
  }
  css2d.render(scene, camera);

  if (wantShot) {
    wantShot = false;
    const a = document.createElement('a');
    a.href = renderer.domElement.toDataURL('image/png');
    a.download = `house45-${Date.now()}.png`;
    a.click();
  }
}

/* ------------------------------------------------------------------ */
/*  Boot                                                               */
/* ------------------------------------------------------------------ */
async function boot() {
  try {
    setMaxAnisotropy(renderer.capabilities.getMaxAnisotropy());
    await lib.init(progress);

    // house number plaque
    const c = document.createElement('canvas');
    c.width = 256;
    c.height = 154;
    const ctx = c.getContext('2d')!;
    const grd = ctx.createLinearGradient(0, 0, 256, 154);
    grd.addColorStop(0, '#d9dcde');
    grd.addColorStop(1, '#a9aeb2');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 256, 154);
    ctx.fillStyle = '#222';
    ctx.font = '700 110px "Segoe UI", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('45', 128, 82);
    const plaqueTex = canvasToTexture(c);
    // plaque box face uses world UVs – remap so the texture fits the 0.2 × 0.12 m face
    plaqueTex.repeat.set(1 / 0.2, 1 / 0.12);
    plaqueTex.offset.set(0.5, -1.2 / 0.12);
    plaqueTex.updateMatrix();
    lib.setInteriorEnv(makeInteriorEnv(renderer));
    lib.register('plaque45', new THREE.MeshStandardMaterial({ map: plaqueTex, metalness: 0.5, roughness: 0.35 }));

    await progress('Building walls, stairs & roof…');
    const kit = new Kit();
    buildWorld(kit);
    await progress('Merging geometry…');
    const built = kit.build((k) => lib.get(k), (k) => lib.casts(k));
    for (const name of ['gf', 'slab1', 'ff', 'ceil2', 'roof', 'site', 'context']) {
      const g = built.get(name) ?? new THREE.Group();
      g.name = name;
      groups[name] = g;
      scene.add(g);
    }
    // every door / window / sliding panel opens; each part lives in its floor's group so it hides with that level
    for (const s of allOpenables()) groups[s.level ?? 'gf'].add(doors.add(s).pivot);
    await progress('Indexing geometry for measuring & collisions…');
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh && m.parent && groups[m.parent.name]) m.geometry.computeBoundsTree();
    });
    for (const m of doors.meshes) m.geometry.computeBoundsTree();
    // the far ground plane should not receive/cast expensive shadows beyond the map
    await progress('Loading sky (HDRI)…');
    await env.load(`${import.meta.env.BASE_URL}hdri/sky_2k.hdr`);
    env.onSkyLevel = (k) => lib.setSkyLevel(k);
    env.setSkyBase(RASTER_SKY_LIFT);
    // reference daylight (HDRI's own sun elevation) for exposure calibration below
    env.setSun(215, env.hdriElevation);

    post = new Post(renderer, scene, camera);
    onResize();
    refreshColliders();
    initUI();
    setLevel('full');
    renderer.shadowMap.needsUpdate = true;
    await progress('Ready');
    $('loader').classList.add('done');
    updateHint();
    const hero = VIEWS.find((v) => v.id === 'front-34')!;
    // calibrate the exposure meter on the sunny hero view
    const p0 = camera.position.clone(), t0 = controls.target.clone();
    camera.position.set(...hero.pos);
    camera.lookAt(...hero.target);
    camera.updateMatrixWorld();
    meterRef = meterScene();
    // now switch the sun to the Malaysia clock
    paintDayTrack();
    tickLiveSun();
    applySunClock(true);
    camera.position.copy(p0);
    controls.target.copy(t0);
    controls.update();
    goToView(hero);
    if (import.meta.env.DEV) (window as unknown as Record<string, unknown>).__house = { scene, camera, renderer, controls, env, lib, groups, doors, setLevel, setMode, goToView, VIEWS, measure, walk, meter: () => ({ meterRef, meterK, L: meterScene() }) };
    clock.getDelta();
    loop();
  } catch (err) {
    console.error(err);
    $('loader-msg').textContent = `Failed to start: ${(err as Error).message}`;
  }
}

boot();
