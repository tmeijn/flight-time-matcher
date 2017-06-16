import { Component, OnInit } from '@angular/core';

// NgRx
import { Store } from '@ngrx/store';
import { getAuthenticatedUser, State } from '../../app.reducers';
import { Observable } from 'rxjs/Observable';

// Models and Animations
import { fadeInAnimation } from '../../shared/animations';
import { User } from '../../core/models/user.model';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
    // make fade in animation available to this component
    animations: [fadeInAnimation],

    // attach the fade in animation to the host (root) element of this component
    // display: block to make the fadeAnimation work.
    host: { 
      '[@fadeInAnimation]': '',
      'style' : 'display: block;'
   }
})
export class ProfileComponent implements OnInit {

  public user: Observable<any>;

  constructor(
    private store: Store<State>,
  ) { }

  ngOnInit() {
    this.user = this.store.select(getAuthenticatedUser);
    
  }

}
