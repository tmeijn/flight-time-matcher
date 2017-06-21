import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Http } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from "@angular/router";

// 3rd party
import { FlashMessagesModule } from 'angular2-flash-messages';
import { NgPipesModule } from "ngx-pipes";

// @NgRx
import { EffectsModule } from '@ngrx/effects';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
  
  // Reducers
  import { reducer } from './app.reducers';

  // Effects
  import { ChatEffects } from './chat/chat.effects';
  import { UserEffects } from "./users/users.effects";

// Feature Modules
import { CoreModule } from './core/core.module';

// Routing
import { AppRoutingModule } from './app.routing';

  // Guards
  import { AuthenticatedGuard } from './shared/authentication.guard';

// Components
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { MessageComponent } from './chat/message.component';

// Services
import { ChatService } from './chat/chat.service';
import { ExtendedHttpService } from './core/services/extended-http.service';
import { UserService } from './core/services/user.service';

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

    //Feature Modules
    CoreModule,
    AppRoutingModule,

    // 3rd party Modules
    FlashMessagesModule,
    NgPipesModule,

    // NgRx Modules
    StoreModule.provideStore(reducer, {
      router: window.location.pathname + window.location.search
    }),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(UserEffects),
    EffectsModule.run(ChatEffects),
  ],
  providers: [
    { provide: Http, useClass: ExtendedHttpService },
    UserService,
    ChatService,

    // Guards
    AuthenticatedGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    console.log('Routes:' , JSON.stringify(router.config, undefined, 2));
  }
}
