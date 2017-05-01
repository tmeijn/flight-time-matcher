import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import { Router } from "@angular/router";
import { AuthService } from "../core/services/auth.service";
import { Observable } from "rxjs/Observable";


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
    private _authservice: AuthService,
    private _router: Router,
    ) {
    // Build the form group
    this.form = this._formBuilder.group({
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
    'email': '',
    'password': ''
  };
  validationMessages = {
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
  }

  onRegisterSubmit() {

    // TODO: Logic when form is not valid
    if(!this.form.valid) {
      console.log('Not valid');
      return;
    }

    this.postingForm = true;

    // Handle the submitted data
    const user = {
      email: this.form.value['email'],
      password: this.form.value['password'],
    }

    this._authservice.registerUser(user).subscribe(data => {
      console.log('User registered', data);

      setTimeout(() => this._router.navigate(['login']), 1000);
      this.postingForm = false;
    }, (err) => { 
      console.log('error:', err.message);
      this.form.controls['email'].patchValue(err.message);
      this.postingForm = false;
    });
  }
}
