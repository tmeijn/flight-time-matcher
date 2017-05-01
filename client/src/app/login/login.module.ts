import { LoginRoutingModule, routedComponents } from './login.routing';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [LoginRoutingModule, ReactiveFormsModule],
    exports: [],
    declarations: [routedComponents],
    providers: [],
})
export class LoginModule { }
