import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

//NgRx
import { Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';
import { getAuthenticationError, isAuthenticated, isAuthenticationLoading, State } from '../../app.reducers';
import { AuthenticateAction } from '../users.actions';

//RxJS
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { fadeInAnimation } from '../../shared/animations';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  animations: [fadeInAnimation],
  // attach the fade in animation to the host (root) element of this component
    // display: block to make the fadeAnimation work.
    host: { 
      '[@fadeInAnimation]': '',
      'style' : 'display: block;'
   }
})
export class LoginComponent implements OnInit, OnDestroy {

  /**
   * The error message if authentication fails.
   * @type {Observable<string>}
   */
  public error: Observable<string>;

  /**
   * True if the authentication is loading.
   * @type {boolean}
   */
  public loading: Observable<boolean>;

  private redirectUrl: string;

  /**
   * Authentication form.
   * @type {FormGroup}
   */
  private form: FormGroup;

  /**
   * Component state.
   * @type {boolean}
   */
  private alive = true;

  constructor(
    public _formBuilder: FormBuilder,
    private store: Store<State>,
    private _route: ActivatedRoute,
    private _flashMessage: FlashMessagesService
  ) { 
    // Build the form group
    this.form = this._formBuilder.group({
      username: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]]
    })
  }
  
  ngOnInit() {
    // Set the error message.
    this.error = this.store.select(getAuthenticationError);

    // Set the loading state.
    this.loading = this.store.select(isAuthenticationLoading);

    // Grab the optional redirect route from the URL.
    this._route.queryParams.subscribe(
      params => {
        params['redirect'] ? this.redirectUrl = params['redirect'] : null;
      }
        );

    // Subscribe to authentication succes for redirecting.
    this.store.select(isAuthenticated)
      .takeWhile(() => this.alive)
      .filter(authenticated => authenticated)
      .subscribe(value => {
        /** OPTIONAL: if provided, returns to the specified route from the query 'redirect' parameter. Defaults to user's profile page */
        this.store.dispatch(go(this.redirectUrl ? this.redirectUrl : '/users/profile'));

        this._flashMessage.show('You\'re now logged in!', { cssClass: 'notification is-success', timeout: 3000 });
      });
  }

  ngOnDestroy() {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.alive = false;
  }

  onLoginSubmit() {
    const payload = {
      username: this.form.get('username').value,
      password: this.form.get('password').value
    }

    this.store.dispatch(new AuthenticateAction(payload));
    this.error
      .distinctUntilChanged()
      .subscribe(error => {
        if(error) {
          this._flashMessage.show(error, 
          { cssClass: 'notification is-danger', 
          time: 3000 });
        };

      });
    // .then(data => {
    //   if(data) {
    //     this._router.navigate(['profile']);
    //     console.log(this._auth.authToken);

    //   } else {
    //     console.log(data);
    //     this._flash.show('Login failed', { cssClass: 'notification is-danger', time: 3000 });
    //   }
    // }).catch(err => console.log('Error occured:', err));
  }
}


