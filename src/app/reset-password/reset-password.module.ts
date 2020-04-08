import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './reset-password.component';
import {ResetPasswordRoutingModule} from './reset-password-routing';
import {ReactiveFormsModule} from '@angular/forms';
import {ResetService} from '../shared/services/reset.service';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [
    ResetService
  ]
})
export class ResetPasswordModule { }
