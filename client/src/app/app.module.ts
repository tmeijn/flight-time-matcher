import { SignupModule } from './signup/signup.module';
import { LoginModule } from './login/login.module';

import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlashMessagesModule } from 'angular2-flash-messages';


import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { Router } from "@angular/router";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    CoreModule,
    LoginModule,
    SignupModule,
    AppRoutingModule,
    FlashMessagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    console.log('Routes:' , JSON.stringify(router.config, undefined, 2));
  }
}
