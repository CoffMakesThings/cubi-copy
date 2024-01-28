import {
  Directive,
  HostListener,
  ElementRef,
  Renderer2,
  Input, OnInit
} from '@angular/core';
import { Vector2 } from "./vector2";

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective implements OnInit {
  scale: number = 1;
  minScale: number = 0.2;
  maxScale: number = 1.8;

  @Input() targetElement!: HTMLDivElement;

  private isDragging: boolean = false;
  private elementStartX: number = 0;
  private elementStartY: number = 0;
  private mouseStartX: number = 0;
  private mouseStartY: number = 0;
  private elementX: number = 500;
  private elementY: number = 500;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      if (!this.getTargetElement()) return;

      this.center();
    });
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    if (event.button === 2) {
      this.isDragging = true;
      this.elementStartX = this.getCurrentTranslateXY().x;
      this.elementStartY = this.getCurrentTranslateXY().y;
      this.mouseStartX = event.clientX;
      this.mouseStartY = event.clientY;
    }
  }

  getCurrentTranslateXY(): Vector2 {
    const transformValue: string = this.getTargetElement().style.transform;
    const match = transformValue.match(/translate\(([^,]+),([^)]+)\)/);
    const translateX: number = parseFloat(match![1]);
    const translateY: number = parseFloat(match![2]);
    return new Vector2(translateX, translateY);
  }

  center(): void {
    this.elementX = window.outerWidth / 2;
    this.elementY = window.outerHeight / 2;
    this.updateTransform();
  }

  getTargetElement(): HTMLDivElement {
    return this.targetElement;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isDragging) {
      this.elementX = this.elementStartX + (event.clientX - this.mouseStartX);
      this.elementY = this.elementStartY + (event.clientY - this.mouseStartY);

      this.updateTransform();
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    this.isDragging = false;
  }

  @HostListener('mousewheel', ['$event'])
  onMouseWheel(event: WheelEvent): void {
    const delta: number = Math.max(-1, Math.min(1, event.deltaY || -event.detail));

    this.scale += delta * 0.1;

    if (this.scale > this.maxScale) this.scale = this.maxScale;
    if (this.scale < this.minScale) this.scale = this.minScale;

    this.updateTransform();
    event.preventDefault();
  }

  private updateTransform(): void {
    const newTransform: string = `translate(${this.elementX}px, ${this.elementY}px) translate(-250px, -250px) scale(${this.scale})`;

    this.renderer.setStyle(this.targetElement, 'transform', newTransform);
  }
}
