import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'users', 
  loadChildren: './users/users.module#UsersModule'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/users/profile'
  },
  // {
  //   path: '404',
  //   component: NotFoundComponent
  // },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
