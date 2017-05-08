import { FeathersRestService } from '../core/services/feathers.service';
import { AuthService } from '../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  user = {};

  constructor(
    public _authService: AuthService,
    private _router: Router,
    private _flashMessage: FlashMessagesService,
    private _feathers: FeathersRestService
  ) { }

  ngOnInit() {
    this.user = this._feathers.feathersApp.get('user');
    this.user['authToken'] = this._authService.authToken;
    // Object.defineProperty(this.user, 'authToken', {value: this._authService.authToken});
  }

}
