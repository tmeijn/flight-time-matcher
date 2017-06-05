import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { routedComponents, UsersRoutingModule } from './users.routing';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    UsersRoutingModule
  ],
  exports: [],
  declarations: [routedComponents],
  providers: [],
})
export class NameModule { }
