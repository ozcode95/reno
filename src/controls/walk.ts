import * as THREE from 'three';

const UP = new THREE.Vector3(0, 1, 0);

export class WalkControls {
  enabled = false;
  locked = false;
  feet = new THREE.Vector3();
  yaw = 0;
  pitch = 0;
  eye = 1.6;
  radius = 0.24;
  private vy = 0;
  private keys = new Set<string>();
  private moveInput = new THREE.Vector2();
  private ray = new THREE.Raycaster();
  onLockChange?: (locked: boolean) => void;

  constructor(private camera: THREE.PerspectiveCamera, private dom: HTMLElement, private colliders: () => THREE.Object3D[]) {
    (this.ray as unknown as { firstHitOnly: boolean }).firstHitOnly = true;
    document.addEventListener('pointerlockchange', () => {
      this.locked = document.pointerLockElement === this.dom;
      this.onLockChange?.(this.locked);
    });
    document.addEventListener('mousemove', (e) => {
      if (!this.enabled || !this.locked) return;
      this.look(e.movementX, e.movementY);
    });
    window.addEventListener('keydown', (e) => {
      if (!this.enabled) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'SELECT') return;
      this.keys.add(e.code);
    });
    window.addEventListener('keyup', (e) => this.keys.delete(e.code));
    window.addEventListener('blur', () => {
      this.keys.clear();
      this.setMoveInput(0, 0);
    });
  }

  look(dx: number, dy: number) {
    if (!this.enabled) return;
    this.yaw -= dx * 0.0021;
    this.pitch = Math.max(-1.45, Math.min(1.45, this.pitch - dy * 0.0021));
  }

  setMoveInput(forward: number, strafe: number) {
    this.moveInput.set(strafe, forward).clampLength(0, 1);
  }

  lock() {
    if (!this.locked) this.dom.requestPointerLock();
  }
  unlock() {
    if (this.locked) document.exitPointerLock();
  }

  /** place at eye position looking at target */
  place(eyePos: THREE.Vector3, lookAt: THREE.Vector3) {
    const g = this.groundAt(eyePos.x, eyePos.y - 0.9, eyePos.z);
    this.feet.set(eyePos.x, g ?? eyePos.y - this.eye, eyePos.z);
    const d = lookAt.clone().sub(eyePos);
    this.yaw = Math.atan2(-d.x, -d.z);
    this.pitch = Math.atan2(d.y, Math.hypot(d.x, d.z)) * 0.6;
    this.vy = 0;
    this.apply();
  }

  enable(fromCamera = true) {
    this.enabled = true;
    if (fromCamera) {
      const dir = new THREE.Vector3();
      this.camera.getWorldDirection(dir);
      this.place(this.camera.position.clone(), this.camera.position.clone().add(dir));
    }
  }
  disable() {
    this.enabled = false;
    this.keys.clear();
    this.setMoveInput(0, 0);
    this.unlock();
  }

  private groundAt(x: number, fromY: number, z: number): number | null {
    this.ray.set(new THREE.Vector3(x, fromY, z), new THREE.Vector3(0, -1, 0));
    this.ray.far = 8;
    const hit = this.ray.intersectObjects(this.colliders(), false)[0];
    return hit ? hit.point.y : null;
  }

  private blocked(dir: THREE.Vector3, dist: number): boolean {
    const objs = this.colliders();
    for (const h of [0.42, 1.0, 1.55]) {
      this.ray.set(this.feet.clone().addScaledVector(UP, h), dir);
      this.ray.far = dist + this.radius;
      if (this.ray.intersectObjects(objs, false).length) return true;
    }
    return false;
  }

  update(dt: number) {
    if (!this.enabled) return;
    dt = Math.min(dt, 0.05);
    const k = this.keys;
    const f = this.moveInput.y + (k.has('KeyW') || k.has('ArrowUp') ? 1 : 0) - (k.has('KeyS') || k.has('ArrowDown') ? 1 : 0);
    const s = this.moveInput.x + (k.has('KeyD') || k.has('ArrowRight') ? 1 : 0) - (k.has('KeyA') || k.has('ArrowLeft') ? 1 : 0);
    const speed = k.has('ShiftLeft') || k.has('ShiftRight') ? 3.4 : 1.45;
    if (f || s) {
      const fwd = new THREE.Vector3(-Math.sin(this.yaw), 0, -Math.cos(this.yaw));
      const right = new THREE.Vector3(Math.cos(this.yaw), 0, -Math.sin(this.yaw));
      const mv = fwd.multiplyScalar(f).addScaledVector(right, s).clampLength(0, 1).multiplyScalar(speed * dt);
      // resolve per axis for wall sliding
      for (const axis of ['x', 'z'] as const) {
        const d = mv[axis];
        if (Math.abs(d) < 1e-6) continue;
        const dir = new THREE.Vector3(axis === 'x' ? Math.sign(d) : 0, 0, axis === 'z' ? Math.sign(d) : 0);
        if (!this.blocked(dir, Math.abs(d))) this.feet[axis] += d;
      }
    }
    // ground following (stairs up to 0.45 m steps)
    const g = this.groundAt(this.feet.x, this.feet.y + 0.5, this.feet.z);
    const stepMax = dt * 4.5 + 0.02;
    if (g !== null && g - this.feet.y >= -0.45 && this.vy > -1) {
      const diff = g - this.feet.y;
      this.feet.y += Math.max(-stepMax, Math.min(stepMax, diff));
      if (Math.abs(g - this.feet.y) < 0.004) this.feet.y = g;
      this.vy = 0;
    } else {
      this.vy -= 9.81 * dt;
      this.feet.y += this.vy * dt;
      if (g !== null && this.feet.y < g) {
        this.feet.y = g;
        this.vy = 0;
      }
      if (this.feet.y < -5) this.feet.y = 0;
    }
    this.apply();
  }

  private apply() {
    this.camera.position.set(this.feet.x, this.feet.y + this.eye, this.feet.z);
    this.camera.quaternion.setFromEuler(new THREE.Euler(this.pitch, this.yaw, 0, 'YXZ'));
    this.camera.updateMatrixWorld();
  }
}
