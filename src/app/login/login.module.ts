import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import {LoginRouting} from './login.routing';
import {AngularMaterialModule} from '../shared/material.module';
import {LoginService} from './shared/login.service';
import {CommonModule} from '@angular/common';
import {CookieService} from 'ngx-cookie-service';
import {EditModeService} from '../shared/services/edit-mode.service';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    LoginRouting,
    AngularMaterialModule,
    CommonModule
  ],
  providers: [LoginService, CookieService, EditModeService]
})
export class LoginModule { }
