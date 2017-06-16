
import { fadeInAnimation } from './shared/animations';
import { AuthenticatedAction, AuthenticatedErrorAction } from './users/users.actions';
import { State } from './app.reducers';
import { Store } from '@ngrx/store';

import { FeathersSocketService } from './core/services/feathers.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeInAnimation],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  constructor(
    private _feathers : FeathersSocketService,
    public store: Store<State>) {}

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //TODO: Needs to be implemented as an effect.
    this._feathers.authenticateWithJWT().subscribe(
      response => {
      console.log(response);
      this.store.dispatch(new AuthenticatedAction( response ));
    },
    error => {
      //==========================
      // TODO: HACK => seems to fix the issue with Zone.js not being able to transition the task to running.
      // Should be revisited each Angular upgrade.
      //==========================
      let newError = {
        message: error.message
      }
      this.store.dispatch(new AuthenticatedErrorAction({ error: newError }));
    });
    
  }
}
