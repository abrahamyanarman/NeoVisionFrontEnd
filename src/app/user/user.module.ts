import {NgModule} from '@angular/core';
import {UserComponent} from './user.component';
import {UserRouting} from './user.routing';
import {SharedModule} from '../shared/shared.module';
import {CommonModule, DatePipe} from '@angular/common';
import {AngularMaterialModule} from '../shared/material.module';
import {DataService} from '../admin/shared/dataservice';
import {FormsModule} from '@angular/forms';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { ErrorDialogComponent } from './shared/dialog/error-dialog/error-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import { MyloansComponent } from './myloans/myloans.component';

@NgModule({
  declarations: [
    UserComponent,
    UserinfoComponent,
    ErrorDialogComponent,
    MyloansComponent],
  imports: [
    UserRouting,
    SharedModule,
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [
    DataService,
    DatePipe
  ],
  entryComponents: [ErrorDialogComponent]
})
export class UserModule {
}
