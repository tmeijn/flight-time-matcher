import { environment } from '../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/throw';


@Injectable()
export class AuthService {

  private baseUrl: string = environment.apiBaseUrl;

  constructor(private _http: Http) { }

  registerUser(user: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this._http.post(this.baseUrl + 'users', user, {headers: headers})
      .map(res => res.json());
  }

}
