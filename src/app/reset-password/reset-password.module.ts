import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './reset-password.component';
import {ResetPasswordRoutingModule} from './reset-password-routing';
import {ReactiveFormsModule} from '@angular/forms';
import {ResetService} from '../shared/services/reset.service';



@NgModule({
  declarations: [
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    ResetService
  ]
})
export class ResetPasswordModule { }
