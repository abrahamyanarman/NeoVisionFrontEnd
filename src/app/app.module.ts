import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AppRouting} from './app.routing';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule, DatePipe} from '@angular/common';
import {ApplicationService} from './shared/services/application.service';
import {AngularMaterialModule} from './shared/material.module';
import {CheckToken} from './shared/guard/checkToken';
import {CookieService} from 'ngx-cookie-service';
import { WrongUrlComponent } from './wrongurl/wrongurl.component';
import {JwtInterceptorService} from './shared/services/interceptors/jwt/jwt-interceptor.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {MatMenuModule} from "@angular/material/menu";
import {SharedModule} from "./shared/shared.module";
import {EditModeService} from "./shared/services/edit-mode.service";
import {DataService} from "./admin/shared/dataservice";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import { ActivateProfileComponent } from './components/activate-profile/activate-profile.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NgApexchartsModule} from "ng-apexcharts";

@NgModule({
  declarations: [
    AppComponent,
    WrongUrlComponent,
    HeaderComponent,
    FooterComponent,
    ActivateProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    AppRouting,
    FormsModule,
    NgApexchartsModule,

    // AngularMaterialModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    MatMenuModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  providers: [
    ApplicationService,
    CheckToken,
    CookieService,
    EditModeService,
    DatePipe,
    DataService,
    {
      provide: HTTP_INTERCEPTORS ,
      useClass: JwtInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
