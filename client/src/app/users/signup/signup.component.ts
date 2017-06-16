import { User } from '../../core/models/user.model';
import { SignUpAction } from '../users.actions';
import { Store } from '@ngrx/store';
import { State } from '../../app.reducers';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: []
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  postingForm: boolean = false;
  
  

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
      password: ['', [
        Validators.required,
        Validators.minLength(7),
        Validators.pattern(/^(?=.*\d).{7,99}$/)
      ]]
    })

    this.form.valueChanges
      .do(data => console.log('data changed:', data))
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
    'password': ''
  };
  validationMessages = {
    'username': {
      'required': 'Username is required.',
      'minlength': 'Username must be at least 2 characters long.',
      'maxlength': 'Username cannot be more than 24 characters long.',
      'pattern': 'Username can only contain alphanumeric characters and underscores.'
    },
    'password': {
      'required': 'Password is required.',
      'minlength': 'Password must be at least 7 characters long.',
      'pattern': 'Password must contain at least 1 numeric digit.'
    }
  };

  ngOnInit() {
  }

  onRegisterSubmit() {

    // TODO: Logic when form is not valid
    if(!this.form.valid) {
      console.log('Not valid');
      return;
    }

    this.postingForm = true;

    // Handle the submitted data
    const user: User = {
      username: this.form.value['username'],
      password: this.form.value['password'],
    }

    const payload = {
      user
    }

    this.store.dispatch(new SignUpAction(payload));
    // subscribe(data => {
    //   console.log('User registered', data);

    //   setTimeout(() => this._router.navigate(['login']), 1000);
    //   this.postingForm = false;
    // }, (err) => { 
    //   console.log('error:', err.message);
    //   this.form.controls['username'].patchValue(err.message);
    //   this.postingForm = false;
    // });s
  }
}
