import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { routedComponents, SignupRoutingModule } from './signup.routing';
import { NgModule } from '@angular/core';

import { SignupComponent } from './signup.component';

@NgModule({
    imports: [SignupRoutingModule, ReactiveFormsModule, CommonModule],
    exports: [],
    declarations: [routedComponents],
    providers: [],
})
export class SignupModule { }
