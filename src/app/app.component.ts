import { Component, ViewChild } from '@angular/core';
import { DraggableDirective } from "../draggable.directive";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild(DraggableDirective) draggableDirective!: DraggableDirective;
  title: string = 'cubi-copy';
  fontSize: number = 20;

  center(): void {
    this.draggableDirective.center();
  }

  textSizeUp(): void {
    if (this.fontSize < 64) this.fontSize++;
  }

  textSizeDown(): void {
    if (this.fontSize > 8) this.fontSize--;
  }
}
