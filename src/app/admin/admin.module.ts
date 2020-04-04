import {NgModule} from '@angular/core';
import {AdminComponent} from './admin.component';
import {AdminRouting} from './admin.routing';
import { UsersComponent } from './users/users.component';
import { AdminInfoComponent } from './admininfo/admininfo.component';
import {SharedModule} from '../shared/shared.module';
import {AngularMaterialModule} from '../shared/material.module';
import {DataService} from './shared/dataservice';
import {CommonModule} from '@angular/common';
import { UserComponent } from './user/user.component';
import {FormsModule} from '@angular/forms';
import {RolePopup} from './user/shared/role-popup/role-popup';
import {RegistrationService} from '../registration/shared/registration.service';
import {CdkColumnDef} from '@angular/cdk/table';

@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    AdminInfoComponent,
    UserComponent,
    RolePopup
  ],
  imports: [
    AdminRouting,
    SharedModule,
    AngularMaterialModule,
    CommonModule,
    FormsModule
  ],
  entryComponents: [
    RolePopup
  ],
  providers: [DataService, CdkColumnDef]
})
export class AdminModule { }
