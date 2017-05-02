import { Injectable } from '@angular/core';

// Import all necessary feathers modules.
import * as feathers from 'feathers-client';
import * as socketio from 'feathers-socketio/client';
import * as io from 'socket.io-client';
import * as localstorage from 'feathers-localstorage';
import * as hooks from 'feathers-hooks';
import * as rest from 'feathers-rest/client';
import * as authentication from 'feathers-authentication-client';
import superagent from 'superagent';

import { environment } from '../../../environments/environment'; // load Angular environment variables.

const HOST = environment.apiBaseUrl ; // Api Base url.

@Injectable()
export class FeathersRestService {
  public _app: any;

  constructor() {

    this._app = feathers() // Initialize feathers
      .configure(rest(HOST).superagent(superagent)) // Fire up rest
      .configure(hooks()) // Configure feathers-hooks
      .configure(authentication({
        storage: window.localStorage // Set storage of token
      }));
  }

  public authenticate(email, password): Promise<boolean> {
    let isAuthenticated: boolean = false;

    return this._app.authenticate({
      strategy: 'local',
      username: email,
      password : password
    }).then(response => {
      isAuthenticated = true;
      return this._app.passport.verifyJWT(response.accessToken);
    })
    .then(payload => {
      return this._app.service('api/users').get(payload.userId);
    })
    .then(user => {
      this._app.set('user', user);
      return isAuthenticated = true;
    })
    .catch(err => {
      return false;
    });
  }

  public getService(service) {
    return this._app.service(service);
  }
}

@Injectable()
export class FeathersSocketService {
  public socket: io.socket;
  private _app: any;

  constructor() {
    this.socket = io(HOST);
    this._app = feathers()
      .configure(socketio(this.socket))
      .configure(hooks())
      // .configure(authentication({
      //   storage: window.localStorage
      // }));

    // this._app.authenticate({
    //   strategy: 'local',
    //   email: 'tyrone_meijn@hotmail',
    //   password : 'test1'
    // }).then(result => console.log(result)).catch(err => console.error('Error authenticating!', err));
  }

  getService(service) {
    return this._app.service(service);
  }
}
