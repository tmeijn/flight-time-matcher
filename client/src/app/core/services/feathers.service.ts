import { UserService } from './user.service';
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
  public feathersApp: any;

  constructor(private userSerivce: UserService) {
    this.feathersApp = feathers() // Initialize feathers
      .configure(rest(HOST).superagent(superagent)) // Fire up rest
      .configure(hooks()) // Configure feathers-hooks
      .configure(authentication({
        storage: window.localStorage // Set storage of token
    }));
  }

  public authenticate(username, password): Promise<boolean> {
    let isAuthenticated: boolean = false;

    return this.feathersApp.authenticate({
      strategy: 'local',
      username: username,
      password : password
    }).then(response => {
      this.fetchUser();
      return isAuthenticated = true;
    }).catch(err => {
      console.log(err);
      return isAuthenticated = false;
    });
  }

  public fetchUser(): void {
    return this.feathersApp.passport.getJWT().then(token => {
      return this.feathersApp.passport.verifyJWT(token);
    }).then(payload => {
      return this.feathersApp.service('api/users').get(payload.userId);
    }).then(user => {
            console.log('this ever called?');

      this.userSerivce.user = user;
    }).catch(err => console.log(err));
  }

  public getService(service) {
    return this.feathersApp.service(service);
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
      .configure(authentication({
        storage: window.localStorage,
        storageKey: 'feathers-socket'
      }));

    this._app.passport.getJWT('feathers-jwt').then(resttoken => {
      console.log('Logging into socket service...', resttoken);  
      return this._app.authenticate({
        strategy: 'jwt',
        accessToken: resttoken
      })
    }).then(result => console.log(result)).catch(err => console.error('Error authenticating!', err));
  }

  getService(service) {
    return this._app.service(service);
  }
}
