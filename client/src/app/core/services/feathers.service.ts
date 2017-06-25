import { UserService } from './user.service';
import { Injectable } from '@angular/core';

// Models
import { User } from '../models/user.model';

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
import { Observable } from "rxjs/Observable";

const HOST = environment.apiBaseUrl ; // Api Base url.

// Inactive for now. DO NOT CALL.
@Injectable()
export class FeathersRestService {
  public feathersApp: any;

  constructor() {
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
    }).catch(err => console.log(err));
  }

  public getService(service) {
    return this.feathersApp.service(service);
  }
}

@Injectable()
export class FeathersSocketService {
  private socket: io.socket;
  public feathersApp: any;

  /**
   * Creates a feathers instance and configures it for Socket.IO
   * and sets the location of the JWT token.
   */
  constructor() {
    this.socket = io(HOST);
    this.feathersApp = feathers()
      .configure(socketio(this.socket))
      .configure(hooks())
      .configure(authentication({
        storage: window.localStorage,
    }));
  }

  /**
   * Authenticate the provided credentials against the Feathers server-side auth service.
   * @param username the user's identification
   * @param password the user's password
   * @returns {Observable<User>}
   */
  public authenticate(username: string, password: string): Observable<User> {

    let promise = this.feathersApp.authenticate({
      strategy: 'local',
      username: username,
      password : password
    }).then(response => {
      return this.fetchUser();
    });

    return Observable.fromPromise(promise);
  }

  /**
   * Try to get the JSON Web Token from localStorage and authenticate the user.
   * Rejects the promise if no token is found.
   * @returns {Observable<object>}
   */
  public authenticateWithJWT(): Observable<object> {
    let promise = this.feathersApp.authenticate();


    return Observable.fromPromise(promise);
  }

  /**
   * Get the user information on stored on the server associated with the JWT.
   * @returns {Promise<User>}
   */
  public fetchUser(): Promise<User> {
    return this.feathersApp.passport.getJWT().then(token => {
      return this.feathersApp.passport.verifyJWT(token);
    }).then(payload => {
      return this.feathersApp.service('api/users').get(payload.userId);
    }).then(user => {
      return user;
    });
  }

  public logOut(): Promise<any> {
    return this.feathersApp.logout();
  }

  /**
   * Register user to the database.
   * @param {User} user the user information to be registered.
   * @returns {Promise<User>}
   */
  public registerUser(user: User): Promise<User> {
    let service = this.getService('api/users');

    let promise = service.create(user);
    return promise;
  }

  /**
   * returns a new instance of the requested feather service, if available.
   * @param service the feathers service required
   * @returns a new instance of the requested feather service, if available.
   */
  public getService(service: string) {
    return this.feathersApp.service(service);
  }
}
