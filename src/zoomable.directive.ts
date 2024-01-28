// src/app/zoom.directive.ts

import { Directive, HostListener, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appZoomable]'
})
export class ZoomableDirective {
  scale: number = 1;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mousewheel', ['$event'])
  onMouseWheel(event: WheelEvent): void {
    console.log(event.deltaY);
    console.log(event.detail);

    // Cross-browser wheel delta
    const delta = Math.max(-1, Math.min(1, event.deltaY || -event.detail));

    this.scale += delta * 0.1; // Adjust the scaling factor based on your preference

    this.applyTransform();
    event.preventDefault();
  }

  // private applyTransform(): void {
  //   this.renderer.setStyle(this.el.nativeElement, 'transform', `scale(${this.scale})`);
  // }

  private applyTransform(): void {
    // Get the current transform value
    const currentTransform = this.el.nativeElement.style.transform || '';
    const withoutScaleTransform = currentTransform.replace(/scale\([^)]*\)/g, '');

    // Concatenate the new scaling transformation with any existing transformations
    const newTransform = `scale(${this.scale}) ${withoutScaleTransform}`;

    this.renderer.setStyle(this.el.nativeElement, 'transform', newTransform);
  }
}
