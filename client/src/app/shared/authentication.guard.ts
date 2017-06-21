import { FlashMessagesService } from 'angular2-flash-messages/module';
import { go } from '@ngrx/router-store';
import { isAuthenticated, State } from '../app.reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class AuthenticatedGuard implements CanActivate {

  /** Holds the app state, needed for the timeout */
  private firstAppload: boolean = true;

  /** On first app load, time is needed to set the state to authenticated */
  private timeoutMs: number = 1000

  constructor(
    private store: Store<State>,
    private _flashMessage: FlashMessagesService) { }

  /**
   * Returns True when user is authenticated
   * @method canActivate 
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if(!this.firstAppload) {
      this.timeoutMs = 0;
    };

    // Get the observable
    const observable = this.store.select(isAuthenticated);

    let redirectUrl: string = state.url;

    // Determine if user is authenticated.
    return observable.debounceTime(this.timeoutMs).switchMap(authenticated => {
      this.firstAppload = false;
      if(!authenticated) {
        // Return user to login page with the url to redirect to after login.
        this.store.dispatch(go('users/login', redirectUrl ? {redirect: redirectUrl} : null));
        this._flashMessage.show('You must be authenticated to perfom this action', { cssClass: 'notification is-danger', timeout: 3000 });
        return Observable.of(authenticated);
      } else {
        return Observable.of(authenticated);
      }
    })
  }
}