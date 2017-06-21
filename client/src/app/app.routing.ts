import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Services
import { AuthenticatedGuard } from './shared/authentication.guard';

// Components
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: 'users', 
  loadChildren: './users/users.module#UsersModule'
  },
  { path: 'chat', component: ChatComponent, canActivate: [AuthenticatedGuard] },
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
