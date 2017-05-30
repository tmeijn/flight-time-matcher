import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { User } from "app/core/models/user.model";

export const MOCK_USER = new User();
MOCK_USER._id = "1";
MOCK_USER.email = "foo@test.com";
MOCK_USER.firstName = "Foo";
MOCK_USER.lastName = "Bar";
MOCK_USER.password = "password";

/**
 * The user service.
 */

@Injectable()
export class UserService {

  /**
   * True if authenticated
   * @type {boolean}
   */
  private _authenticated = false;

  /**
   * Authenticate the user
   * 
   * @param email the user's email address
   * @param password the user's password
   * @returns {Observable<User>} the authenticated user observable
   */
  public authenticate(email: string, password: string): Observable<User> {
    //TODO: implement HTTP auth request.

    if(email === MOCK_USER.email && password === MOCK_USER.password) {
      this._authenticated = true;
      return Observable.of(MOCK_USER);
    }
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
    return Observable.of(MOCK_USER);
  }

  /**
   * Creates a new user and returns the creation Object
   * @param {User} user
   */
  public create(user: User): Observable<User> {
    //TODO: Implement HTTP POST.
    this._authenticated = true;
    return Observable.of(user);
  }

}