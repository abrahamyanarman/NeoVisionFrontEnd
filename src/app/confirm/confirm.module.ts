import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConfirmRoutingModule} from './confirm-routing';
import {ConfirmComponent} from './confirm.component';
import {ConfirmService} from './service/confirm.service';



@NgModule({
  declarations: [
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    ConfirmRoutingModule
  ],
  providers: [
    ConfirmService
  ]
})
export class ConfirmModule { }
