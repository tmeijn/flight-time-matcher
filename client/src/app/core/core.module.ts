// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { NavbarComponent } from './navbar.component';

// Services
import { ExtendedHttpService } from './services/extended-http.service';
import { FeathersSocketService } from './services/feathers.service';
import { UserService } from './services/user.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    NavbarComponent
  ],
  exports: [
    NavbarComponent
  ],
  providers: [
    ExtendedHttpService,
    FeathersSocketService,
    UserService
  ]
})
export class CoreModule { }
