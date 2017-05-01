import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar.component';
import { AuthService } from "app/core/services/auth.service";
import { ExtendedHttpService } from './services/extended-http.service';
import { RouterModule } from "@angular/router";
import { FeathersRestService, FeathersSocketService } from './services/feathers.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    NavbarComponent
  ],
  exports: [
    NavbarComponent
  ],
  providers: [
    AuthService,
    ExtendedHttpService,
    FeathersRestService,
    FeathersSocketService
  ]
})
export class CoreModule { }
