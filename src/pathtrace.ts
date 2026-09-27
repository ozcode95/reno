import * as THREE from 'three';
import { WebGLPathTracer } from 'three-gpu-pathtracer';
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
      this.pt.bounces = 6;
      this.pt.transmissiveBounces = 8;
      this.pt.filterGlossyFactor = 0.4;
      this.pt.minSamples = 1;
      this.pt.renderDelay = 0;
      this.pt.fadeDuration = 300;
      this.pt.dynamicLowRes = true;
      this.pt.lowResScale = 0.25;
      this.pt.tiles.set(2, 2);
      this.pt.textureSize.set(512, 512);
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
