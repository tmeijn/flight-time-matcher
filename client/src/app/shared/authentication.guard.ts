import { FlashMessagesService } from 'angular2-flash-messages/module';
import { go } from '@ngrx/router-store';
import { isAuthenticated, State } from '../app.reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(
    private store: Store<State>,
    private _flashMessage: FlashMessagesService) { }

  /**
   * True when user is authenticated
   * @method canActivate 
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    // Get the observable
    const observable = this.store.select(isAuthenticated);

    let redirectUrl: string;
    
    redirectUrl = state.url;

    // Return user to login page if not authenticated.
    observable.subscribe(authenticated => {
      if(!authenticated) {
        this.store.dispatch(go('users/login', redirectUrl ? {redirect: redirectUrl} : null));
        this._flashMessage.show('You must be authenticated to perfom this action', { cssClass: 'notification is-danger', timeout: 3000 });
      }
    })
    
    return observable;
  }
}