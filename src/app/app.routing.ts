import {RouterModule, Routes} from '@angular/router';
import {CheckToken} from './shared/guard/checkToken';
import {WrongUrlComponent} from './wrongurl/wrongurl.component';
import {AuthGuardServiceService} from "./shared/services/auth-guard-service.service";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: 'user',
    loadChildren: './user/user.module#UserModule',
    canActivate: [AuthGuardServiceService]
  },
  {
    path: 'registration',
    loadChildren: './registration/registration.module#RegistrationModule'
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    canActivate: [AuthGuardServiceService]
  },
  {
    path: 'register/confirm/:code',
    loadChildren: './confirm/confirm.module#ConfirmModule'
  },
  {
    path: 'resetPassword/:emailCode',
    loadChildren: './reset-password/reset-password.module#ResetPasswordModule'
  },
  {
    path: 'reset-email',
    loadChildren: './reset-email/reset-email.module#ResetEmailModule'
  },
  {
    path: '**',
    component: WrongUrlComponent
  }

];

export const AppRouting = RouterModule.forRoot(routes);
