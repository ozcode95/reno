import * as THREE from 'three';
import { DenoiseMaterial, WebGLPathTracer } from 'three-gpu-pathtracer';
import { ParallelMeshBVHWorker } from 'three-mesh-bvh/worker';

/**
 * Progressive GPU path tracing (three-gpu-pathtracer). Gives physically
 * correct global illumination, soft light bouncing through the rooms and
 * true reflections – used as the "Photo" mode when the camera is still.
 */
export class PathTraceMode {
  active = false;
  ready = false;
  building = false;
  private pt: WebGLPathTracer | null = null;
  private worker: ParallelMeshBVHWorker | null = null;
  private denoise = new DenoiseMaterial({ sigma: 2, kSigma: 1.5, threshold: 0.1 });
  onStatus?: (s: string) => void;

  constructor(private renderer: THREE.WebGLRenderer, private scene: THREE.Scene, private camera: THREE.PerspectiveCamera) {}

  /** linear HDR accumulation buffer (used for exposure metering) */
  get target(): THREE.WebGLRenderTarget | null {
    return this.pt && this.ready ? (this.pt.target as THREE.WebGLRenderTarget) : null;
  }

  get samples() {
    return this.pt ? Math.floor(this.pt.samples) : 0;
  }

  async enable() {
    this.active = true;
    if (!this.pt) {
      this.pt = new WebGLPathTracer(this.renderer);
      this.pt.bounces = 10;
      this.pt.transmissiveBounces = 12;
      this.pt.filterGlossyFactor = 0.25;
      this.pt.minSamples = 8;
      this.pt.renderDelay = 120;
      this.pt.fadeDuration = 300;
      // Keep navigation clear while the first clean samples accumulate.
      this.pt.dynamicLowRes = false;
      this.pt.tiles.set(2, 2);
      this.pt.textureSize.set(1024, 1024);
      this.pt.renderToCanvasCallback = (target, renderer, quad) => {
        const original = quad.material;
        const autoClear = renderer.autoClear;
        this.denoise.map = target.texture;
        this.denoise.opacity = original.opacity;
        this.denoise.blending = original.blending;
        // Ease filtering as the image converges, preserving the fine material detail.
        this.denoise.sigma = this.samples < 64 ? 2 : 1.2;
        this.denoise.threshold = 0.12 / Math.sqrt(Math.max(1, this.samples / 16)) / Math.max(0.25, renderer.toneMappingExposure);
        quad.material = this.denoise;
        renderer.autoClear = false;
        try {
          quad.render(renderer);
        } finally {
          quad.material = original;
          renderer.autoClear = autoClear;
        }
      };
      try {
        this.worker = new ParallelMeshBVHWorker();
        this.pt.setBVHWorker(this.worker);
      } catch {
        this.worker = null;
      }
    }
    await this.rebuild();
  }

  async rebuild() {
    if (!this.pt || !this.active) return;
    this.ready = false;
    this.building = true;
    this.onStatus?.('Building ray-tracing acceleration structure…');
    try {
      if (this.worker) {
        await this.pt.setSceneAsync(this.scene, this.camera, {
          onProgress: (p: number) => this.onStatus?.(`Preparing scene ${(p * 100).toFixed(0)}%`),
        });
      } else {
        this.pt.setScene(this.scene, this.camera);
      }
      this.ready = true;
      this.onStatus?.('');
    } catch (e) {
      console.error(e);
      this.onStatus?.('Path tracing is not supported on this GPU/browser.');
      this.active = false;
    }
    this.building = false;
  }

  disable() {
    this.active = false;
    this.ready = false;
  }

  cameraMoved() {
    if (this.pt && this.ready) this.pt.updateCamera();
  }

  environmentChanged() {
    if (this.pt && this.ready) {
      this.pt.updateEnvironment();
      this.pt.updateLights();
    }
  }

  materialsChanged() {
    if (this.pt && this.ready) this.pt.updateMaterials();
  }

  render() {
    if (this.pt && this.ready && this.active) this.pt.renderSample();
  }
}
