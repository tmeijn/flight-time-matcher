import { go } from '@ngrx/router-store';
import { isAuthenticated, State } from '../app.reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private store: Store<State>) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    // Get the observable
    const observable = this.store.select(isAuthenticated);

    // Return user to login page if not authenticated.
    observable.subscribe(authenticated => {
      if(!authenticated) {
        this.store.dispatch(go('users/login'));
      }
    })
    
    return observable;
  }
}