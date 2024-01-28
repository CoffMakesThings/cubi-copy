import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from "@angular/router";
import { DraggableDirective } from "../draggable.directive";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";


@NgModule({
  declarations: [
    AppComponent,
    DraggableDirective
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    BrowserModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
