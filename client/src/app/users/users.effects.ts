import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { UserService } from '../core/services/user.service';
import { User } from '../core/models/user.model';
import { Injectable } from '@angular/core';

//RxJS
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

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
    .map(toPayload)
    .switchMap(payload => {
      return this.userService.authenticate(payload.username, payload.password)
      .map(user => new userActions.AuthenticationSuccessAction({ user }))
      .catch(error => {
          //==========================
          // TODO: HACK => seems to fix the issue with Zone.js not being able to transition the task to running.
          // Should be revisited each Angular upgrade.
          //==========================
          let newError = {
            message: error.message
          }
          return Observable.of(new userActions.AuthenticationErrorAction({ error: newError }))
        });
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
        .catch(error => {
          //==========================
          // TODO: HACK => seems to fix the issue with Zone.js not being able to transition the task to running.
          // Should be revisited each Angular upgrade.
          //==========================
          let newError = {
            message: error.message
          }
          return Observable.of(new userActions.AuthenticatedErrorAction({ error: newError }))
        });
    });

  /**
   *  Create a new user on register.
   */
  @Effect()
  public createUser: Observable<Action> = this.actions$
    .ofType(actionTypes.SIGN_UP)
    .map(toPayload)
    .switchMap(payload => {
      return this.userService.create(payload.user)
        .map(user => new userActions.SignUpSuccessAction({ user }))
        .catch(error => {
          //==========================
          // TODO: HACK => seems to fix the issue with Zone.js not being able to transition the task to running.
          // Should be revisited each Angular upgrade.
          //==========================
          let newError = {
            message: error.message
          }
          return Observable.of(new userActions.SignUpErrorAction({ error: newError }))
        });
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