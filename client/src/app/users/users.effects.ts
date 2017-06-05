import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { UserService } from '../core/services/user.service';
import { User } from '../core/models/user.model';
import { Injectable } from '@angular/core';

import * as userActions from './users.actions';
let actionTypes = userActions.ActionTypes;

@Injectable()
export class UserEffects {

  /**
   * @constructor
   * @param {Actions} actions$ 
   * @param {UserService} userService 
   */
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) { }


  /**
   * Authenticate the user.
   */
  @Effect()
  public authenticate: Observable<Action> = this.actions$
    .ofType(actionTypes.AUTHENTICATE)
    .debounceTime(500)
    .map(toPayload)
    .switchMap(payload => {
      return this.userService.authenticate(payload.email, payload.password)
      .map(user => new userActions.AuthenticationSuccessAction({ user }))
      .catch(error => Observable.of(new userActions.AuthenticationErrorAction({ error })))
    });


  /**
   *  Determine is the user is authenticated.
   */
  @Effect()
  public authenticated: Observable<Action> = this.actions$
    .ofType(actionTypes.AUTHENTICATED)
    .map(toPayload)
    .switchMap(payload => {
      return this.userService.authenticatedUser()
        .map(user => new userActions.AuthenticatedSuccessAction({ authenticated: (user !== null), user }))
        .catch(error => Observable.of(new userActions.AuthenticatedErrorAction({ error })))
    });

  /**
   *  Create a new user on register.
   */
  @Effect()
  public createUser: Observable<Action> = this.actions$
    .ofType(actionTypes.SIGN_UP)
    .debounceTime(500)
    .map(toPayload)
    .switchMap(payload => {
      return this.userService.create(payload.user)
        .map(user => new userActions.SignUpSuccessAction({ user }))
        .catch(error => Observable.of(new userActions.SignUpErrorAction({ error })));
    });

  /**
   *  Terminate the user session.
   */
  @Effect()
  public signOut: Observable<Action> = this.actions$
    .ofType(actionTypes.SIGN_OUT)
    .map(toPayload)
    .switchMap(payload => {
      return this.userService.signout()
        .map(value => new userActions.SignOutSuccessAction)
        .catch(error => Observable.of(new userActions.SignOutErrorAction({ error })));
    });

  
    
}