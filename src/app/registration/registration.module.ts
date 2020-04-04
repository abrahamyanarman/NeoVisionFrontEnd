import {NgModule} from '@angular/core';
import {RegistrationComponent} from './registration.component';
import {RegistrationRouting} from './registration.routing';
import {AngularMaterialModule} from '../shared/material.module';
import {RegistrationService} from './shared/registration.service';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    RegistrationRouting,
    AngularMaterialModule,
    CommonModule,
    SharedModule
  ],
  providers: [RegistrationService]
})
export class RegistrationModule { }
