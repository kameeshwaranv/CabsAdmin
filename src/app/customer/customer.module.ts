import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { Route } from '@angular/compiler/src/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModules } from '../shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogwindowModule } from '../shared/dialogwindow/dialogwindow.module';

const customerRoute: Routes = [
  {
    path: '',
    component: HomeComponent
  }
]

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SharedModules,
    ReactiveFormsModule,
    DialogwindowModule,
    RouterModule.forChild(customerRoute)
  ]
})
export class CustomerModule { }
