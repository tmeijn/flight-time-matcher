import { FeathersRestService } from './feathers.service';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
    private _user = {};
    
    constructor() {
    }

    set user(value) {
        this._user = value;
        console.log('user set:', value);
    }

    get user() {
        return this._user;
    }


}