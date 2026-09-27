import * as THREE from 'three';
import { HDRLoader } from 'three/examples/jsm/loaders/HDRLoader.js';

/**
 * A small procedural "room" environment used for interior surfaces in the
 * real-time renderer: warm-neutral bounce light from beige floor & white walls
 * plus two bright openings (for believable reflections on the polished tiles).
 */
export function makeInteriorEnv(renderer: THREE.WebGLRenderer): THREE.Texture {
  const scene = new THREE.Scene();
  const lin = (r: number, g: number, b: number) => new THREE.MeshBasicMaterial({ color: new THREE.Color().setRGB(r, g, b, THREE.LinearSRGBColorSpace), side: THREE.BackSide });
  const wall = lin(0.8, 0.78, 0.74);
  const mats = [wall, wall, lin(0.9, 0.89, 0.87), lin(0.5, 0.46, 0.41), wall, wall];
  const room = new THREE.Mesh(new THREE.BoxGeometry(8, 3.4, 12), mats);
  room.position.y = 0.2;
  scene.add(room);
  const glow = (w: number, h: number, x: number, y: number, z: number, ry: number, k: number) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color().setRGB(4.2 * k, 4.5 * k, 5.0 * k, THREE.LinearSRGBColorSpace), side: THREE.DoubleSide }));
    m.position.set(x, y, z);
    m.rotation.y = ry;
    scene.add(m);
  };
  glow(3.2, 2.2, 0.8, -0.1, 5.95, Math.PI, 1);
  glow(1.4, 1.3, -1.8, 0.2, -5.95, 0, 0.8);
  glow(1.2, 1.5, 3.95, 0.1, -1.0, -Math.PI / 2, 0.5);
  const pm = new THREE.PMREMGenerator(renderer);
  const rt = pm.fromScene(scene, 0.03);
  pm.dispose();
  scene.traverse((o) => {
    const m = o as THREE.Mesh;
    if (m.isMesh) m.geometry.dispose();
  });
  return rt.texture;
}

/**
 * Loads an equirectangular HDRI, detects the sun, removes it from the map
 * (so image based lighting doesn't leak light into shadowed areas) and
 * re-creates it as a shadow casting DirectionalLight with the exact energy
 * and colour that was removed.
 *
 * The sun itself is then positioned from a real solar position (compass
 * azimuth + elevation, see solar.ts): the sky is rotated so its glow sits on
 * the same side, the light is attenuated / warmed near the horizon and the
 * whole sky dims through dusk into night.
 *
 * World orientation: the house faces south, so north = −Z, east = +X.
 */
export class SkyEnvironment {
  sun = new THREE.DirectionalLight(0xffffff, 4);
  target = new THREE.Object3D();
  texture: THREE.DataTexture | null = null;
  /** white-balanced copy used for image-based lighting */
  envTexture: THREE.DataTexture | null = null;
  private sunLocal = new THREE.Vector3(0, 1, 0);
  private sunIrradiance = 4;
  private sunColor0 = new THREE.Color(1, 1, 1);
  private sunDir = new THREE.Vector3(0, 1, 0);
  private fogColor0 = new THREE.Color();
  /** elevation of the sun baked into the HDRI (degrees) */
  hdriElevation = 60;
  sunScale = 1;
  azimuthDeg = 215;
  elevationDeg = 60;
  rotation = 0;
  /** environment intensity at full daylight (raster uses a small lift, path tracing 1) */
  skyBase = 1;
  /** 0..1 daylight factor of the sky (1 = day, ≈0 = night) */
  skyLevel = 1;
  onSkyLevel?: (k: number) => void;
  center = new THREE.Vector3(3.05, 2, 7);

  constructor(private scene: THREE.Scene) {
    this.sun.castShadow = true;
    const s = this.sun.shadow;
    s.mapSize.set(4096, 4096);
    const cam = s.camera as THREE.OrthographicCamera;
    cam.left = -19; cam.right = 19; cam.top = 19; cam.bottom = -19;
    cam.near = 1; cam.far = 140;
    s.bias = -0.00015;
    s.normalBias = 0.025;
    s.radius = 2.5;
    this.target.position.copy(this.center);
    scene.add(this.sun, this.target);
    this.sun.target = this.target;
  }
  async load(url: string) {
    const loader = new HDRLoader();
    loader.setDataType(THREE.FloatType);
    const tex = (await loader.loadAsync(url)) as THREE.DataTexture;
    const img = tex.image as { data: Float32Array; width: number; height: number };
    const { data, width: w, height: h } = img;

    // --- locate the sun
    let max = 0, mi = 0;
    for (let i = 0; i < w * h; i++) {
      const L = 0.2126 * data[i * 4] + 0.7152 * data[i * 4 + 1] + 0.0722 * data[i * 4 + 2];
      if (L > max) { max = L; mi = i; }
    }
    const sx = mi % w, sy = Math.floor(mi / w);
    const u = (sx + 0.5) / w, v = 1 - (sy + 0.5) / h; // flipY
    const phi = (u - 0.5) * Math.PI * 2, el = (v - 0.5) * Math.PI;
    this.sunLocal.set(Math.cos(el) * Math.cos(phi), Math.sin(el), Math.cos(el) * Math.sin(phi)).normalize();

    // --- clamp the solar disc/aureole and integrate removed energy
    const T = 18;
    const removed = [0, 0, 0];
    const cosLim = Math.cos((12 * Math.PI) / 180);
    const d = new THREE.Vector3();
    for (let y = 0; y < h; y++) {
      const lat = Math.PI / 2 - ((y + 0.5) / h) * Math.PI;
      const dw = ((2 * Math.PI) / w) * (Math.PI / h) * Math.cos(lat);
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        const L = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
        if (L <= T) continue;
        const pu = (x + 0.5) / w, pv = 1 - (y + 0.5) / h;
        const pp = (pu - 0.5) * Math.PI * 2, pe = (pv - 0.5) * Math.PI;
        d.set(Math.cos(pe) * Math.cos(pp), Math.sin(pe), Math.cos(pe) * Math.sin(pp));
        if (d.dot(this.sunLocal) < cosLim) continue;
        const k = T / L;
        for (let c = 0; c < 3; c++) {
          removed[c] += data[i + c] * (1 - k) * dw;
          data[i + c] *= k;
        }
      }
    }
    const lum = 0.2126 * removed[0] + 0.7152 * removed[1] + 0.0722 * removed[2];
    const mx = Math.max(...removed, 1e-6);
    this.sun.color.setRGB(removed[0] / mx, removed[1] / mx, removed[2] / mx, THREE.LinearSRGBColorSpace);
    // intensity so that luminance matches (colour is normalised to max channel)
    const colLum = 0.2126 * this.sun.color.r + 0.7152 * this.sun.color.g + 0.0722 * this.sun.color.b;
    this.sunIrradiance = lum > 0.1 ? lum / colLum : 4;
    this.sunColor0.copy(this.sun.color);
    this.hdriElevation = el / THREE.MathUtils.DEG2RAD;
    this.elevationDeg = this.hdriElevation;
    if (this.scene.fog) this.fogColor0.copy(this.scene.fog.color);

    tex.mapping = THREE.EquirectangularReflectionMapping;
    tex.needsUpdate = true;
    this.texture = tex;
    this.scene.background = tex;

    // --- white balance for the *lighting* copy (camera AWB): the pure-sky HDRI is
    // strongly blue, which turns shaded white walls lavender / blue-grey. Balanced
    // (almost) fully to neutral so white paint in shade still reads white.
    const avg = [0, 0, 0];
    for (let y = 0; y < h; y++) {
      const dw = Math.cos(Math.PI / 2 - ((y + 0.5) / h) * Math.PI);
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        for (let c = 0; c < 3; c++) avg[c] += data[i + c] * dw;
      }
    }
    const aL = 0.2126 * avg[0] + 0.7152 * avg[1] + 0.0722 * avg[2];
    const gain = avg.map((v) => Math.pow(aL / Math.max(v, 1e-6), 0.95));
    const gL = 0.2126 * gain[0] + 0.7152 * gain[1] + 0.0722 * gain[2];
    const wb = new Float32Array(data.length);
    for (let i = 0; i < data.length; i += 4) {
      for (let c = 0; c < 3; c++) wb[i + c] = (data[i + c] * gain[c]) / gL;
      wb[i + 3] = 1;
    }
    const envTex = new THREE.DataTexture(wb, w, h, THREE.RGBAFormat, THREE.FloatType);
    envTex.mapping = THREE.EquirectangularReflectionMapping;
    envTex.colorSpace = tex.colorSpace;
    envTex.flipY = tex.flipY;
    envTex.magFilter = envTex.minFilter = THREE.LinearFilter;
    envTex.generateMipmaps = false;
    envTex.needsUpdate = true;
    this.envTexture = envTex;
    this.scene.environment = envTex;
    this.setAzimuth(this.azimuthDeg);
  }

  /** keeps the sun elevation, only changes the compass bearing */
  setAzimuth(deg: number) {
    this.setSun(deg, this.elevationDeg);
  }

  /**
   * azimuth: compass bearing towards the sun (0° N = behind the house, 90° E = right
   * side seen from the street, 180° S = street side). elevation: degrees above horizon.
   */
  setSun(azimuthDeg: number, elevationDeg: number) {
    this.azimuthDeg = azimuthDeg;
    this.elevationDeg = elevationDeg;
    const a = azimuthDeg * THREE.MathUtils.DEG2RAD;
    const e = elevationDeg * THREE.MathUtils.DEG2RAD;
    // world direction towards the sun (north = −Z, east = +X)
    this.sunDir.set(Math.cos(e) * Math.sin(a), Math.sin(e), -Math.cos(e) * Math.cos(a)).normalize();
    // rotate the sky so its (removed) sun glow sits at the same bearing
    const want = Math.atan2(-Math.cos(a), Math.sin(a)); // angle atan2(z,x)
    const have = Math.atan2(this.sunLocal.z, this.sunLocal.x);
    this.rotation = have - want;
    this.scene.environmentRotation.set(0, this.rotation, 0);
    this.scene.backgroundRotation.set(0, this.rotation, 0);
    this.updateSun();
  }

  sunDirection(out = new THREE.Vector3()) {
    return out.copy(this.sunDir);
  }

  setSkyBase(k: number) {
    this.skyBase = k;
    this.applySky();
  }

  updateSun() {
    const el = this.elevationDeg;
    const dir = this.sunDirection();
    // keep the shadow camera above ground even when the sun is just below the horizon
    const lightDir = dir.clone();
    if (lightDir.y < 0.02) lightDir.setY(0.02).normalize();
    this.sun.position.copy(this.center).addScaledVector(lightDir, 70);
    this.target.position.copy(this.center);

    // direct sun: atmospheric transmission relative to the HDRI's sun (Kasten–Young air mass)
    const trans = (deg: number) => {
      const d = Math.max(deg, 0);
      const m = 1 / (Math.sin(d * THREE.MathUtils.DEG2RAD) + 0.50572 * Math.pow(d + 6.07995, -1.6364));
      return Math.pow(0.7, Math.pow(m, 0.678));
    };
    const horizon = THREE.MathUtils.smoothstep(el, -0.8, 1.5);
    const k = (trans(el) / trans(this.hdriElevation)) * horizon;
    this.sun.intensity = this.sunIrradiance * this.sunScale * k;
    this.sun.visible = k > 1e-4;
    // warmer (golden / red) light near the horizon
    const warm = 1 - THREE.MathUtils.smoothstep(el, 2, 25);
    this.sun.color.copy(this.sunColor0).multiply(new THREE.Color(1, 1 - 0.28 * warm, 1 - 0.55 * warm));

    // sky: full daylight above ~10°, civil twilight fades to a dim night sky
    this.skyLevel = 0.015 + 0.985 * THREE.MathUtils.smoothstep(el, -7, 10);
    this.applySky();
    this.sun.updateMatrixWorld();
    this.target.updateMatrixWorld();
  }

  private applySky() {
    this.scene.environmentIntensity = this.skyBase * this.skyLevel;
    this.scene.backgroundIntensity = this.skyLevel;
    const fog = this.scene.fog;
    if (fog) fog.color.copy(this.fogColor0).multiplyScalar(this.skyLevel);
    this.onSkyLevel?.(this.skyLevel);
  }
}
