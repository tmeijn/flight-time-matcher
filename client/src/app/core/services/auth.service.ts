import { FeathersRestService } from './feathers.service';
import { environment } from '../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/throw';


@Injectable()
export class AuthService {
  public isAuthenticated: boolean = false;
  public authToken: string;

  private baseUrl: string = environment.apiBaseUrl;

  constructor(private _http: Http, private _feathersRestService: FeathersRestService) {
    this.getToken();
   }

  registerUser(user: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this._http.post(this.baseUrl + 'users', user, {headers: headers})
      .map(res => res.json());
  }

  private getToken(): void {
    this._feathersRestService._app.passport.getJWT().then(data => {
      this.authToken = data;
      if(this.authToken) {
        this.isAuthenticated = true;
      };
    });
  }

}
