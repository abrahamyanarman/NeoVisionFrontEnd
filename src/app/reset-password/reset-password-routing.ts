import {RouterModule, Routes} from '@angular/router';
import {ResetPasswordComponent} from './reset-password.component';


const resetPasswordRoutes: Routes = [
  {
    path: '',
    component: ResetPasswordComponent
  }
];
export const ResetPasswordRoutingModule = RouterModule.forChild(resetPasswordRoutes);
