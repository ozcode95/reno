import type { WalkControls } from './walk';

export const MOBILE_LAYOUT_QUERY = '(max-width: 760px), (max-width: 960px) and (max-height: 500px), (pointer: coarse)';

interface WalkActions {
  interact: () => void;
  tap: (event: PointerEvent) => void;
}

/** Independent pointers let one thumb move while another finger looks around. */
export class MobileWalkControls {
  enabled = false;
  private movePointer: number | null = null;
  private lookPointer: { id: number; x: number; y: number; startX: number; startY: number; dragged: boolean } | null = null;
  private joystick: HTMLButtonElement;
  private knob: HTMLElement;
  private action: HTMLButtonElement;
  private target: HTMLElement;

  constructor(private walk: WalkControls, private canvas: HTMLElement, private root: HTMLElement, actions: WalkActions) {
    this.joystick = root.querySelector<HTMLButtonElement>('#walk-joystick')!;
    this.knob = root.querySelector<HTMLElement>('.joystick-knob')!;
    this.action = root.querySelector<HTMLButtonElement>('#walk-interact')!;
    this.target = root.querySelector<HTMLElement>('#walk-target')!;
    this.action.onclick = actions.interact;

    this.joystick.addEventListener('pointerdown', (e) => {
      if (!this.enabled || e.button !== 0 || this.movePointer !== null) return;
      this.movePointer = e.pointerId;
      this.joystick.setPointerCapture(e.pointerId);
      this.move(e);
      e.preventDefault();
    });
    this.joystick.addEventListener('pointermove', (e) => {
      if (e.pointerId === this.movePointer) this.move(e);
    });
    const stopMove = (e: PointerEvent) => {
      if (e.pointerId !== this.movePointer) return;
      this.movePointer = null;
      this.walk.setMoveInput(0, 0);
      this.knob.style.transform = '';
      this.release(this.joystick, e.pointerId);
    };
    for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) {
      this.joystick.addEventListener(type, stopMove as EventListener);
    }

    canvas.addEventListener('pointerdown', (e) => {
      if (!this.enabled || e.button !== 0) return;
      this.consume(e);
      if (this.lookPointer) return;
      this.lookPointer = { id: e.pointerId, x: e.clientX, y: e.clientY, startX: e.clientX, startY: e.clientY, dragged: false };
      canvas.setPointerCapture(e.pointerId);
    }, { capture: true });
    canvas.addEventListener('pointermove', (e) => {
      if (!this.enabled) return;
      this.consume(e);
      const pointer = this.lookPointer;
      if (e.pointerId !== pointer?.id) return;
      if (Math.hypot(e.clientX - pointer.startX, e.clientY - pointer.startY) > 6) pointer.dragged = true;
      if (!pointer.dragged) return;
      this.walk.look(e.clientX - pointer.x, e.clientY - pointer.y);
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    }, { capture: true });
    canvas.addEventListener('pointerup', (e) => {
      if (!this.enabled) return;
      this.consume(e);
      const pointer = this.lookPointer;
      if (e.pointerId !== pointer?.id) return;
      const tapped = !pointer.dragged && Math.hypot(e.clientX - pointer.startX, e.clientY - pointer.startY) <= 6;
      this.lookPointer = null;
      this.release(canvas, e.pointerId);
      if (tapped) actions.tap(e);
    }, { capture: true });
    const stopLook = (e: PointerEvent) => {
      if (e.pointerId !== this.lookPointer?.id) return;
      this.lookPointer = null;
      this.release(canvas, e.pointerId);
    };
    for (const type of ['pointercancel', 'lostpointercapture']) {
      canvas.addEventListener(type, stopLook as EventListener, { capture: true });
    }
    window.addEventListener('blur', () => this.reset());
    window.addEventListener('resize', () => this.reset());
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.reset();
    });
  }

  setEnabled(enabled: boolean) {
    if (this.enabled === enabled) return;
    this.enabled = enabled;
    this.root.hidden = !enabled;
    this.reset();
    if (enabled) this.walk.unlock();
  }

  setAction(label: string, target: string, available: boolean) {
    if (this.action.textContent !== label) this.action.textContent = label;
    this.action.disabled = !available;
    if (this.target.textContent !== target) this.target.textContent = target;
  }

  private move(e: PointerEvent) {
    const bounds = this.joystick.getBoundingClientRect();
    const radius = (bounds.width - this.knob.offsetWidth) / 2;
    if (radius <= 0) return;
    let x = e.clientX - bounds.left - bounds.width / 2;
    let y = e.clientY - bounds.top - bounds.height / 2;
    const length = Math.hypot(x, y);
    if (length < radius * 0.1) x = y = 0;
    else if (length > radius) { x *= radius / length; y *= radius / length; }
    this.knob.style.transform = `translate(${x}px, ${y}px)`;
    this.walk.setMoveInput(-y / radius, x / radius);
  }

  private reset() {
    const move = this.movePointer, look = this.lookPointer;
    this.movePointer = null;
    this.lookPointer = null;
    this.walk.setMoveInput(0, 0);
    this.knob.style.transform = '';
    if (move !== null) this.release(this.joystick, move);
    if (look) this.release(this.canvas, look.id);
  }

  private release(element: HTMLElement, pointerId: number) {
    if (element.hasPointerCapture(pointerId)) element.releasePointerCapture(pointerId);
  }

  private consume(e: PointerEvent) {
    e.preventDefault();
    e.stopImmediatePropagation();
  }
}
