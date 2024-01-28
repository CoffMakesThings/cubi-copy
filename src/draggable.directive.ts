import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {
  private isDragging: boolean = false;
  private startX: number = 0;
  private startY: number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    if (event.button === 2) {
      this.isDragging = true;
      this.startX = event.clientX - this.el.nativeElement.getBoundingClientRect().left;
      this.startY = event.clientY - this.el.nativeElement.getBoundingClientRect().top;
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isDragging) {
      const offsetX = event.clientX - this.startX;
      const offsetY = event.clientY - this.startY;

      const currentTransform = this.el.nativeElement.style.transform || '';
      const withoutScaleTransform = currentTransform.replace(/translate\([^)]*\)/g, '');

      // Concatenate the new scaling transformation with any existing transformations
      const newTransform = `translate(${offsetX}px, ${offsetY}px) ${withoutScaleTransform}`;

      this.renderer.setStyle(this.el.nativeElement, 'transform', newTransform);
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    this.isDragging = false;
  }
}
