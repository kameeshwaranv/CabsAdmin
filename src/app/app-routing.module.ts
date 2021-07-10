import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginAuthGuard } from './shared/login-auth.guard';


const routes: Routes = [
  {
    path: '',
    children: [
      // {
      //   path: '', 
      //   children: [
      //     {
      //       path: '',
      //       loadChildren: () => import('../app/customer/customer.module').then(m => m.CustomerModule),
      //     }
      //   ]
      // },
      {
        path: '',
        children: [
          // {
          //   path: '', redirectTo: 'Admin',
          // },
          {
            path: '',
            loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
          },
          {
            path: 'App',
            loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
            // canActivate: [LoginAuthGuard]
          }
        ]
      }
    ],

  },

  {
    path: '**',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
