import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ResetEmailComponent} from './reset-email.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ResetEmailRoutingModule} from './reset-email-routing';
import {ResetService} from '../shared/services/reset.service';



@NgModule({
  declarations: [
    ResetEmailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ResetEmailRoutingModule
  ],
  providers: [
    ResetService
  ]
})
export class ResetEmailModule { }
