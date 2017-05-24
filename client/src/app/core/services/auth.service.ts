import { FeathersRestService } from './feathers.service';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { tokenNotExpired } from "angular2-jwt";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/throw';


@Injectable()
export class AuthService {
  /**
   * Holds the users JWT
   */
  public authToken: string;

  private baseUrl: string = environment.apiBaseUrl;

  constructor(private _http: Http, private _feathersRestService: FeathersRestService) {
    this.getToken();
  }

  /**
  * Checks if the token is not expired.
  * @param {string} [token=feathers-jwt] - The key where the token is stored.
  */
  public isAuthenticated(token: string = 'feathers-jwt'): boolean {
    return tokenNotExpired(token);
  }

  /**
   * API to register the user to the database
   * @param user {object} - The user object with the necessary information
   */ 
  public registerUser(user: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this._http.post(this.baseUrl + '/api/users', user, {headers: headers})
      .map(res => res.json());
  }

  /**
   * Wrapper for feathers getJWT() method. Retrieves token and sets authToken, if found.
   */
  public getToken(): void {
    return this._feathersRestService.feathersApp.passport.getJWT().then(data => {
      this.authToken = data;
      return data;
    });
  }

}
