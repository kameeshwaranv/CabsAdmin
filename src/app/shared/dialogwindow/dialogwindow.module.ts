import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogwindowComponent } from './dialogwindow.component';
import { SharedModules } from '../../shared.module';



@NgModule({
  declarations: [DialogwindowComponent],
  imports: [
    SharedModules,
    CommonModule
  ]
})
export class DialogwindowModule { }
