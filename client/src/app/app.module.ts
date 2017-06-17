import { ChatEffects } from './chat/chat.effects';
import { ChatService } from './chat/chat.service';
import { MessageComponent } from './chat/message.component';
import { ChatComponent } from './chat/chat.component';
import { AuthenticatedGuard } from './shared/authentication.guard';
import { EffectsModule } from '@ngrx/effects';
import { HttpModule } from '@angular/http';
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
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
  
  // Reducers
  import { reducer } from './app.reducers';

  // Effects
  import { UserEffects } from "./users/users.effects";

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
    ChatComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    FlashMessagesModule,

    //Feature Modules
    AppRoutingModule,

    // NgRx Modules
    StoreModule.provideStore(reducer, {
      router: window.location.pathname + window.location.search
    }),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(UserEffects),
    EffectsModule.run(ChatEffects),
    CoreModule,
  ],
  providers: [
    { provide: Http, useClass: ExtendedHttpService },
    AuthenticatedGuard,
    UserService,
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    console.log('Routes:' , JSON.stringify(router.config, undefined, 2));
  }
}
