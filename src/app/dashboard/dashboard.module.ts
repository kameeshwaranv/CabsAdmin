import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModules } from '../shared.module';
import { DashboardService } from './dashboard.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogsComponent } from './dialogs/dialogs.component';

const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    resolve: {
      DashboardServices: DashboardService
    }
  }
]

@NgModule({
  declarations: [DashboardComponent, DialogsComponent],
  imports: [
    CommonModule,
    SharedModules,
    ReactiveFormsModule,
    RouterModule.forChild(dashboardRoutes)
  ]
})
export class DashboardModule { }
