import * as THREE from 'three';

/** Drag a separate furniture group along the floor, keeping its footprint inside a clear area. */
export class FurnitureDrag {
  private object: THREE.Group | null = null;
  private limits = new THREE.Box2();
  private offset = new THREE.Vector3();
  private ray = new THREE.Raycaster();
  private plane = new THREE.Plane();
  private point = new THREE.Vector3();
  private anchor = new THREE.Vector3();
  private start = new THREE.Vector3();
  pointerId: number | null = null;

  constructor(private camera: THREE.Camera, private targets: () => THREE.Mesh[]) {}

  get active() { return this.pointerId !== null; }

  /** Retain the user's position when changing styles or temporarily removing furniture. */
  setObject(object: THREE.Group | null, area: THREE.Box2) {
    this.end();
    this.object = object;
    if (!object) return;
    const box = new THREE.Box3().setFromObject(object);
    box.translate(object.position.clone().negate());
    this.limits.set(
      new THREE.Vector2(area.min.x - box.min.x, area.min.y - box.min.z),
      new THREE.Vector2(area.max.x - box.max.x, area.max.y - box.max.z),
    );
    this.place(this.offset.x, this.offset.z);
  }

  /** Use the nearest scene hit so walls and other furniture block selection. */
  hit(ndc: THREE.Vector2): THREE.Intersection | null {
    if (!this.object) return null;
    this.ray.setFromCamera(ndc, this.camera);
    const hit = this.ray.intersectObjects(this.targets(), false)[0];
    for (let parent: THREE.Object3D | null = hit?.object ?? null; parent; parent = parent.parent) {
      if (parent === this.object) return hit;
    }
    return null;
  }

  begin(ndc: THREE.Vector2, pointerId: number): boolean {
    if (this.active) return false;
    const hit = this.hit(ndc);
    if (!hit) return false;
    this.plane.setFromNormalAndCoplanarPoint(new THREE.Vector3(0, 1, 0), hit.point);
    this.anchor.copy(hit.point);
    this.start.copy(this.offset);
    this.pointerId = pointerId;
    return true;
  }

  move(ndc: THREE.Vector2): boolean {
    if (!this.active) return false;
    this.ray.setFromCamera(ndc, this.camera);
    if (!this.ray.ray.intersectPlane(this.plane, this.point)) return false;
    return this.place(this.start.x + this.point.x - this.anchor.x,
      this.start.z + this.point.z - this.anchor.z);
  }

  end(): boolean {
    const active = this.active;
    this.pointerId = null;
    return active;
  }

  private place(x: number, z: number): boolean {
    if (!this.object) return false;
    x = THREE.MathUtils.clamp(x, this.limits.min.x, this.limits.max.x);
    z = THREE.MathUtils.clamp(z, this.limits.min.y, this.limits.max.y);
    const changed = x !== this.offset.x || z !== this.offset.z;
    this.offset.set(x, 0, z);
    this.object.position.copy(this.offset);
    this.object.updateMatrixWorld(true);
    return changed;
  }
}
