import { User } from '../../core/models/user.model';
import { getAuthenticatedUser, State } from '../../app.reducers';
import { AuthenticateAction, SignUpAction } from '../users.actions';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { go } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import { Store } from "@ngrx/store";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: []
})
export class SignupComponent implements OnInit {
  form: FormGroup;

  loading: Observable<boolean>;
  
  

  constructor(
    public _formBuilder: FormBuilder, 
    private store: Store<State>,
    private _router: Router,
    ) {
    // Build the form group
    this.form = this._formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(24),
        Validators.pattern(/^[a-zA-Z0-9_]+$/)
      ]],
      email: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(24),
        Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(7),
        Validators.pattern(/^(?=.*\d).{7,99}$/)
      ]]
    })

    this.form.valueChanges
      .debounceTime(500)
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if (!this.form) { return; }
    const form = this.form;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  //Declare form entries and corresponding error messages here
  formErrors = {
    'username': '',
    'email': '',
    'password': ''
  };
  validationMessages = {
    'username': {
      'required': 'Username is required.',
      'minlength': 'Username must be at least 2 characters long.',
      'maxlength': 'Username cannot be more than 24 characters long.',
      'pattern': 'Username can only contain alphanumeric characters and underscores.'
    },
    'email': {
      'required': 'Email is required.',
      'pattern': 'Please enter a valid email',
      'maxlength': 'Email is too long.'
    },
    'password': {
      'required': 'Password is required.',
      'minlength': 'Password must be at least 7 characters long.',
      'pattern': 'Password must contain at least 1 numeric digit.'
    }
  };

  ngOnInit() {
    this.loading = this.store.select(state => state.users.loading);

    
  }

  onRegisterSubmit() {
    
    if(!this.form.valid) {
      console.log('Not valid');
      return;
    }

    // Handle the submitted data
    const user: User = {
      username: this.form.value['username'],
      email: this.form.value['email'],
      password: this.form.value['password'],
    }

    const payload = {
      user
    }

    this.store.dispatch(new SignUpAction(payload));

    this.store.select(getAuthenticatedUser)
      .filter(user => user !== null)
      .subscribe(action => {
        this.store.dispatch(go('users/login'));
      })

    /**
     * We need to subscribe here to the authenticated state and login
     * via a new dispatched action. This way the user will be auto logged in
     * after successfull register.
     */
  }
}
