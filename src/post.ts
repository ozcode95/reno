import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { GTAOPass } from 'three/examples/jsm/postprocessing/GTAOPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

export class Post {
  composer: EffectComposer;
  gtao: GTAOPass;
  private renderPass: RenderPass;
  private output: OutputPass;
  aoEnabled = true;

  constructor(private renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
    const size = renderer.getDrawingBufferSize(new THREE.Vector2());
    const rt = new THREE.WebGLRenderTarget(size.x, size.y, { type: THREE.HalfFloatType, samples: 4 });
    this.composer = new EffectComposer(renderer, rt);
    this.renderPass = new RenderPass(scene, camera);
    this.composer.addPass(this.renderPass);

    this.gtao = new GTAOPass(scene, camera, size.x, size.y);
    this.gtao.output = GTAOPass.OUTPUT.Default;
    this.gtao.blendIntensity = 0.9;
    this.gtao.updateGtaoMaterial({ radius: 0.55, distanceExponent: 1.6, thickness: 1.4, scale: 1.15, samples: 16, distanceFallOff: 1.0 });
    this.gtao.updatePdMaterial({ lumaPhi: 10, depthPhi: 2, normalPhi: 3, radius: 5, rings: 2, samples: 16 });
    // keep glass, helpers & annotations out of the AO G-buffer
    const pass = this.gtao as unknown as { _overrideVisibility: () => void; _visibilityCache: THREE.Object3D[] };
    pass._overrideVisibility = function () {
      const cache = this._visibilityCache;
      scene.traverse((o) => {
        if (!o.visible) return;
        const mesh = o as THREE.Mesh;
        const mat = mesh.material as THREE.MeshPhysicalMaterial | undefined;
        const hide = (o as THREE.Line).isLine || (o as THREE.Points).isPoints || o.userData.noAO || (mesh.isMesh && mat && (mat.transparent || (mat.transmission ?? 0) > 0));
        if (hide) {
          o.visible = false;
          cache.push(o);
        }
      });
    };
    this.composer.addPass(this.gtao);
    this.output = new OutputPass();
    this.composer.addPass(this.output);
  }

  setCamera(camera: THREE.PerspectiveCamera) {
    this.renderPass.camera = camera;
    this.gtao.camera = camera;
  }

  setAO(on: boolean) {
    this.aoEnabled = on;
    this.gtao.enabled = on;
  }

  setSize(w: number, h: number) {
    this.composer.setPixelRatio(this.renderer.getPixelRatio());
    this.composer.setSize(w, h);
  }

  render(dt: number) {
    this.composer.render(dt);
  }
}
