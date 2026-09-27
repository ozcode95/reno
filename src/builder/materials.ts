import * as THREE from 'three';
import { W, T_PARTY } from '../config';
import { plasterTexture, roofTileTexture, tileTexture, woodTexture, type TexSet } from './textures';

type AnyMat = THREE.MeshStandardMaterial | THREE.MeshPhysicalMaterial;

interface Entry {
  mat: AnyMat;
  cast: boolean;
  env: number; // envMapIntensity used in raster mode (interior surfaces get less sky)
}

function applyTex(m: AnyMat, t: TexSet | undefined, opts: { map?: boolean; normal?: boolean; rough?: boolean; normalScale?: number; size?: [number, number]; /** world-metre origin of the pattern (u, v) */ origin?: [number, number] } = {}) {
  if (!t) return;
  const size = opts.size ?? t.size;
  const rep = (tex?: THREE.Texture) => {
    if (!tex) return undefined;
    let tx = tex;
    if (tex.repeat.x !== 1 || tex.repeat.y !== 1) {
      // already used with another size – clone to keep the shared image
      if (Math.abs(tex.repeat.x - 1 / size[0]) > 1e-6 || Math.abs(tex.repeat.y - 1 / size[1]) > 1e-6) tx = tex.clone();
    }
    tx.repeat.set(1 / size[0], 1 / size[1]);
    if (opts.origin) {
      if (tx === tex) tx = tex.clone();
      tx.repeat.set(1 / size[0], 1 / size[1]);
      tx.offset.set(-opts.origin[0] / size[0], -opts.origin[1] / size[1]);
    }
    tx.wrapS = tx.wrapT = THREE.RepeatWrapping;
    tx.updateMatrix();
    tx.needsUpdate = true;
    return tx;
  };
  if (opts.map !== false && t.map) m.map = rep(t.map)!;
  if (opts.normal !== false && t.normalMap) {
    m.normalMap = rep(t.normalMap)!;
    const s = opts.normalScale ?? 1;
    m.normalScale.set(s, s);
  }
  if (opts.rough !== false && t.roughnessMap) m.roughnessMap = rep(t.roughnessMap)!;
}

async function loadSet(loader: THREE.TextureLoader, name: string, size: [number, number], desaturate = 0): Promise<TexSet> {
  const base = `${import.meta.env.BASE_URL}textures/${name}`;
  const loaded = await Promise.all([
    loader.loadAsync(`${base}_diff.jpg`),
    loader.loadAsync(`${base}_nor.jpg`),
    loader.loadAsync(`${base}_rough.jpg`),
  ]);
  let map: THREE.Texture = loaded[0];
  const [, normalMap, roughnessMap] = loaded;
  if (desaturate > 0) {
    // neutral grey cement: remove the warm/brown cast of the scan
    const img = map.image as HTMLImageElement;
    const c = document.createElement('canvas');
    c.width = img.width;
    c.height = img.height;
    const ctx = c.getContext('2d')!;
    ctx.drawImage(img, 0, 0);
    const id = ctx.getImageData(0, 0, c.width, c.height);
    const d = id.data;
    let mean = 0;
    for (let i = 0; i < d.length; i += 4) mean += d[i] * 0.3 + d[i + 1] * 0.59 + d[i + 2] * 0.11;
    mean /= d.length / 4;
    // soften the stains: fresh cement is much more uniform than the scan
    for (let i = 0; i < d.length; i += 4) for (let k = 0; k < 3; k++) d[i + k] = 150 + (d[i + k] - mean) * 0.5;
    for (let i = 0; i < d.length; i += 4) {
      const g = d[i] * 0.3 + d[i + 1] * 0.59 + d[i + 2] * 0.11;
      d[i] = d[i] + (g - d[i]) * desaturate;
      d[i + 1] = d[i + 1] + (g - d[i + 1]) * desaturate;
      d[i + 2] = d[i + 2] + (g * 1.02 - d[i + 2]) * desaturate;
    }
    ctx.putImageData(id, 0, 0);
    map.dispose();
    map = new THREE.CanvasTexture(c);
  }
  map.colorSpace = THREE.SRGBColorSpace;
  normalMap.colorSpace = THREE.NoColorSpace;
  roughnessMap.colorSpace = THREE.NoColorSpace;
  for (const t of [map, normalMap, roughnessMap]) {
    t.anisotropy = 8;
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
  }
  return { map, normalMap, roughnessMap, size };
}

export const INTERIOR_KEYS = [
  'wallInt', 'ceiling', 'floorTile', 'stairTile', 'bathWall', 'bathWallDark', 'bathFloor', 'kitchenTile',
  'doorWood', 'doorBath', 'ceramic', 'chrome', 'stainless', 'plasticWhite', 'steelRail', 'frameSage',
];

/**
 * covered outdoor floor / fittings: mostly lit by light bouncing off the driveway, not by blue sky.
 * Porch walls & soffits are NOT in this list: they share the sky lighting of the other exterior
 * walls, so all the white paint reads as the same white.
 */
export const PORCH_KEYS = ['concretePorch', 'doorMain', 'plasticGrey', 'concreteLight'];

export class MaterialLib {
  private entries = new Map<string, Entry>();
  private missing: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial({ color: 0xff00ff });
  private interiorEnv: THREE.Texture | null = null;
  envScaled = true;
  /** daylight factor of the sky (dims explicit env maps at dusk / night) */
  skyLevel = 1;

  /** interiors are lit by bounced (warm-neutral) light, not by the blue sky */
  setInteriorEnv(tex: THREE.Texture) {
    this.interiorEnv = tex;
    this.applyInteriorEnv(true);
  }
  private applyInteriorEnv(on: boolean) {
    for (const k of [...INTERIOR_KEYS, ...PORCH_KEYS]) {
      const e = this.entries.get(k);
      if (!e) continue;
      e.mat.envMap = on ? this.interiorEnv : null;
      e.mat.needsUpdate = true;
    }
  }

  get(key: string): THREE.Material {
    const e = this.entries.get(key);
    if (!e) {
      console.warn('missing material', key);
      return this.missing;
    }
    return e.mat;
  }
  casts(key: string) {
    return this.entries.get(key)?.cast ?? true;
  }
  keys() {
    return [...this.entries.keys()];
  }
  all(): AnyMat[] {
    return [...this.entries.values()].map((e) => e.mat);
  }

  private add(key: string, mat: AnyMat, env = 1, cast = true) {
    mat.name = key;
    mat.envMapIntensity = env;
    this.entries.set(key, { mat, cast, env });
    return mat;
  }

  /** raster: interior surfaces use less sky light. path tracing: physically based (1.0) */
  setEnvScaled(on: boolean) {
    this.envScaled = on;
    this.applyEnvIntensity();
    // the path tracer uses the true sky for everything (physically based bounce light)
    if (this.interiorEnv) this.applyInteriorEnv(on);
  }

  setSkyLevel(k: number) {
    this.skyLevel = k;
    this.applyEnvIntensity();
  }
  private applyEnvIntensity() {
    for (const e of this.entries.values()) e.mat.envMapIntensity = (this.envScaled ? e.env : 1) * this.skyLevel;
  }

  async init(progress: (msg: string) => Promise<void>) {
    const loader = new THREE.TextureLoader();
    await progress('Loading surface scans…');
    const [concrete, asphalt, stucco] = await Promise.all([
      loadSet(loader, 'concrete_floor_02', [2.2, 2.2], 0.85),
      loadSet(loader, 'asphalt_02', [2.5, 2.5]),
      loadSet(loader, 'white_stucco', [1.6, 1.6]),
    ]);

    await progress('Generating porcelain tiles…');
    const floor600 = tileTexture({
      px: 1024, meters: [1.2, 1.2], tile: [0.6, 0.6], grout: 0.0025,
      base: '#cdc4b6', grout_c: '#a89e90', tileVar: 0.03, cloud: 0.06, cloudScale: 5, speckle: 0.03,
      roughTile: 0.09, roughGrout: 0.75, bevel: 0.0015, normalStrength: 3, seed: 3,
    });
    const bathWall = tileTexture({
      px: 1024, meters: [1.2, 1.2], tile: [0.6, 0.3], grout: 0.002,
      base: '#dcdcd7', grout_c: '#c9c9c4', tileVar: 0.02, cloud: 0.035, cloudScale: 8, speckle: 0.05,
      roughTile: 0.2, roughGrout: 0.7, bevel: 0.0015, normalStrength: 3, seed: 21,
    });
    const bathWallDark = tileTexture({
      px: 512, meters: [1.2, 1.2], tile: [0.6, 0.3], grout: 0.002,
      base: '#a4a5a2', grout_c: '#959693', tileVar: 0.02, cloud: 0.04, cloudScale: 8, speckle: 0.06,
      roughTile: 0.25, roughGrout: 0.7, bevel: 0.0015, normalStrength: 3, seed: 22,
    });
    await progress('Generating bathroom & balcony tiles…');
    const bathFloor = tileTexture({
      px: 512, meters: [0.9, 0.9], tile: [0.3, 0.3], grout: 0.003,
      base: '#77797a', grout_c: '#666868', tileVar: 0.03, cloud: 0.05, cloudScale: 6, speckle: 0.12,
      roughTile: 0.55, roughGrout: 0.85, bevel: 0.002, normalStrength: 2.5, seed: 31,
    });
    const kitchen = tileTexture({
      px: 512, meters: [1.2, 1.2], tile: [0.6, 0.3], grout: 0.002,
      base: '#ecebe6', grout_c: '#d7d5cf', tileVar: 0.015, cloud: 0.02, cloudScale: 6,
      roughTile: 0.12, roughGrout: 0.7, bevel: 0.0015, normalStrength: 3, seed: 41,
    });
    const balcony = tileTexture({
      px: 1024, meters: [1.2, 1.2], tile: [0.3, 0.3], grout: 0.003,
      base: '#505356', grout_c: '#77797a', tileVar: 0.04, cloud: 0.06, cloudScale: 6, speckle: 0.14,
      roughTile: 0.5, roughGrout: 0.9, bevel: 0.002, normalStrength: 2.5, seed: 51,
    });
    await progress('Generating roof tiles…');
    const roof = roofTileTexture(1024, 11);
    await progress('Generating timber & plaster…');
    const woodRed = woodTexture({ px: 512, meters: [1.0, 2.2], base: '#7b3118', dark: '#56200e', grain: 0.45, seed: 61, rough: 0.35 });
    const woodMain = woodTexture({ px: 512, meters: [1.0, 2.4], base: '#b6581f', dark: '#8a3c12', grain: 0.35, grooves: 0.085, seed: 62, rough: 0.3 });
    const woodOak = woodTexture({ px: 512, meters: [0.9, 2.2], base: '#b89570', dark: '#8e6c4b', grain: 0.55, seed: 63, rough: 0.45 });
    const plaster = plasterTexture(512, 5, 0.9);

    const S = (p: THREE.MeshStandardMaterialParameters) => new THREE.MeshStandardMaterial(p);
    const P = (p: THREE.MeshPhysicalMaterialParameters) => new THREE.MeshPhysicalMaterial(p);

    // --- walls & ceilings
    // all wall paint is pure white (inside and out) – only the master-bedroom balcony wall is grey.
    // The plaster / stucco sets only add relief (normal + roughness), no greyish colour map.
    let m: AnyMat = this.add('wallInt', S({ color: '#ffffff', roughness: 0.9 }), 0.55);
    applyTex(m, plaster, { normalScale: 0.35, map: false });
    m = this.add('ceiling', S({ color: '#f5f5f1', roughness: 0.95 }), 0.6);
    applyTex(m, plaster, { normalScale: 0.2, rough: false });
    m = this.add('wallExt', S({ color: '#ffffff', roughness: 0.95 }), 1);
    applyTex(m, stucco, { normalScale: 0.7, map: false });
    // car porch walls (lit by bounce light) + gate / boundary walls
    m = this.add('wallPorch', S({ color: '#ffffff', roughness: 0.95 }), 1.1);
    applyTex(m, stucco, { normalScale: 0.9, map: false });
    m = this.add('wallWhite', S({ color: '#ffffff', roughness: 0.95 }), 1);
    applyTex(m, stucco, { normalScale: 0.8, map: false });
    m = this.add('wallExtGrey', S({ color: '#8f9398', roughness: 0.92 }), 1);
    applyTex(m, stucco, { normalScale: 0.6 });
    this.add('soffit', S({ color: '#ffffff', roughness: 0.95 }), 1.1); // same white paint as the walls
    this.add('fascia', S({ color: '#d9dcdc', roughness: 0.55 }), 1);

    // --- floors
    m = this.add('floorTile', P({ color: '#ffffff', roughness: 1, specularIntensity: 0.9 }), 0.6);
    // 600 x 600 porcelain laid from the right (east) wall: grout lines at x = inner east wall face - n * 0.6
    // (lot 20 ft = 6.096 m between party-wall centres, so the cut row ends up against the west wall)
    applyTex(m, floor600, { origin: [W - T_PARTY / 2, 0] });
    // same porcelain on the stair, but laid tread by tread (UVs set per tread / riser by the stair builder)
    m = this.add('stairTile', P({ color: '#ffffff', roughness: 1, specularIntensity: 0.9 }), 0.6);
    applyTex(m, floor600);
    m = this.add('bathWall', S({ color: '#ffffff', roughness: 1 }), 0.6);
    applyTex(m, bathWall);
    m = this.add('bathWallDark', S({ color: '#ffffff', roughness: 1 }), 0.6);
    applyTex(m, bathWallDark);
    m = this.add('bathFloor', S({ color: '#ffffff', roughness: 1 }), 0.6);
    applyTex(m, bathFloor);
    m = this.add('kitchenTile', S({ color: '#ffffff', roughness: 1 }), 0.6);
    applyTex(m, kitchen);
    m = this.add('balconyTile', S({ color: '#ffffff', roughness: 1 }), 1);
    applyTex(m, balcony);
    m = this.add('concrete', S({ color: '#e2e2de', roughness: 1 }), 1);
    applyTex(m, concrete);
    m = this.add('concretePorch', S({ color: '#e6e6e2', roughness: 1 }), 1.1);
    applyTex(m, concrete);
    m = this.add('concreteLight', S({ color: '#eceae4', roughness: 1 }), 1);
    applyTex(m, concrete, { size: [1.4, 1.4], normalScale: 0.6 });
    m = this.add('asphalt', S({ color: '#8f9091', roughness: 1 }), 1);
    applyTex(m, asphalt);
    m = this.add('ground', S({ color: '#c9c9c4', roughness: 1 }), 1);
    applyTex(m, concrete, { size: [7, 7], normalScale: 0.5 });
    this.add('drainDark', S({ color: '#4a4b48', roughness: 0.95 }), 1);
    this.add('paintLine', S({ color: '#f0f0ec', roughness: 0.7 }), 1);

    // --- roof
    m = this.add('roofTile', S({ color: '#ffffff', roughness: 1 }), 1);
    applyTex(m, roof);
    this.add('roofRidge', S({ color: '#4c5157', roughness: 0.62 }), 1);

    // --- joinery
    m = this.add('doorWood', P({ color: '#ffffff', roughness: 0.38, clearcoat: 0.3, clearcoatRoughness: 0.4 }), 0.5);
    applyTex(m, woodRed);
    m = this.add('doorMain', P({ color: '#ffffff', roughness: 0.32, clearcoat: 0.4, clearcoatRoughness: 0.35 }), 0.8);
    applyTex(m, woodMain);
    m = this.add('doorBath', S({ color: '#ffffff', roughness: 0.45 }), 0.5);
    applyTex(m, woodOak);
    this.add('doorRear', S({ color: '#a6ada9', roughness: 0.38, metalness: 0.7 }), 0.6);
    this.add('frameSage', S({ color: '#86998f', roughness: 0.45, metalness: 0.2 }), 0.6);
    this.add('aluWhite', S({ color: '#efefec', roughness: 0.35, metalness: 0.1 }), 0.8);
    this.add('aluSilver', S({ color: '#c3c6c7', roughness: 0.3, metalness: 0.85 }), 0.9);

    // --- glass (thin, transmissive)
    const glass = (color: string, rough = 0.02) =>
      P({ color, roughness: rough, metalness: 0, transmission: 1, thickness: 0, ior: 1.5, specularIntensity: 1, transparent: false });
    this.add('glass', glass('#eef5f1'), 1, false);
    this.add('glassTint', glass('#bdd8ca', 0.03), 1, false);
    this.add('glassRail', glass('#e6f2ec'), 1, false);
    this.add('glassFrosted', glass('#f1f4f2', 0.35), 1, false);
    this.add('glassDark', P({ color: '#1f2927', roughness: 0.05, metalness: 0.1, clearcoat: 1, clearcoatRoughness: 0.05 }), 1);

    // --- metals & misc
    this.add('steelRail', S({ color: '#627872', roughness: 0.42, metalness: 0.45 }), 0.6);
    this.add('galv', S({ color: '#aab0b3', roughness: 0.42, metalness: 0.75 }), 1);
    this.add('railBlack', S({ color: '#2b2e30', roughness: 0.5, metalness: 0.5 }), 1);
    this.add('ceramic', P({ color: '#f8f8f6', roughness: 0.08, clearcoat: 1, clearcoatRoughness: 0.05 }), 0.5);
    this.add('chrome', S({ color: '#e9e9e9', roughness: 0.07, metalness: 1 }), 0.8);
    this.add('stainless', S({ color: '#d2d4d6', roughness: 0.28, metalness: 1 }), 0.8);
    this.add('plasticWhite', S({ color: '#f0f0ec', roughness: 0.4 }), 0.5);
    this.add('switchIndicatorRed', S({ color: '#d51b16', roughness: 0.25, emissive: '#e32418', emissiveIntensity: 0.6 }), 0.5);
    this.add('plasticGrey', S({ color: '#b3b7b9', roughness: 0.5 }), 0.8);
    this.add('black', S({ color: '#1c1c1c', roughness: 0.6 }), 0.8);
    this.add('rubber', S({ color: '#2a2a2a', roughness: 0.9 }), 0.6);
  }

  /** register an externally created material (e.g. text plaques) */
  register(key: string, mat: AnyMat, env = 1, cast = true) {
    this.add(key, mat, env, cast);
  }
}
