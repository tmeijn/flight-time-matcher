import { FeathersSocketService } from './feathers.service';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { User } from "app/core/models/user.model";

export const MOCK_USER = new User();
MOCK_USER._id = "1";
MOCK_USER.email = "foo@test.com";
MOCK_USER.password = "password";

/**
 * The user service.
 */

@Injectable()
export class UserService {
  
  constructor(private feathers: FeathersSocketService) {}

  /**
   * True if authenticated
   * @type {boolean}
   */
  private _authenticated = false;

  /**
   * Authenticate the user
   * 
   * @param username the user's username
   * @param password the user's password
   * @returns {Observable<User>} the authenticated user observable
   */
  public authenticate(username: string, password: string): Observable<User> {

    return this.feathers.authenticate(username, password);
  }

  /**
   * Determines if the user is authenticated
   * @returns {Observable<boolean>}
   */
  public authenticated(): Observable<boolean> {
    return Observable.of(this._authenticated);
  }

  /**
   * Returns the authenticated user
   * @returns {User}
   */
  public authenticatedUser(): Observable<User> {
    return Observable.fromPromise(this.feathers.fetchUser());
  }

  /**
   * Create a new user and return the creation Object
   * @param {User} user
   */
  public create(user: User): Observable<User> {
    return Observable.fromPromise(this.feathers.registerUser(user));
  }

  public signout(): Observable<boolean> {
    //TODO: Implement sign out
    this._authenticated = false;
    return Observable.of(true);
  }

}