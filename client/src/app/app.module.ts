import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Http } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { Router } from "@angular/router";

// @NgRx
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
  
  // Reducers
  import { reducer } from './app.reducers';

// Feature Modules
import { CoreModule } from './core/core.module';

// Routing
import { AppRoutingModule } from './app.routing';

// Components
import { AppComponent } from './app.component';

// Services
import { UserService } from './core/services/user.service';
import { ExtendedHttpService } from './core/services/extended-http.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlashMessagesModule,
    CoreModule,

    //Feature Modules
    AppRoutingModule,

    // NgRx Modules
    RouterStoreModule.connectRouter(),
    StoreModule.provideStore(reducer, {
      router: window.location.pathname + window.location.search
    })
  ],
  providers: [
    { provide: Http, useClass: ExtendedHttpService },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    console.log('Routes:' , JSON.stringify(router.config, undefined, 2));
  }
}
