import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from './user.component';
import {UserinfoComponent} from './userinfo/userinfo.component';
import {MyloansComponent} from "./myloans/myloans.component";
import {MyActiveLoansComponent} from "./my-active-loans/my-active-loans.component";

const routes: Routes = [
  {
    path: '',
    component: UserComponent
  },
  {
    path: 'info',
    component: UserinfoComponent
  },
  {
    path: 'request-new-loan',
    loadChildren: './request-new-loan/request-new-loan.module#RequestNewLoanModule'
  },
  {
    path: 'loans',
    component: MyloansComponent
  },
  {
    path: 'activeLoans',
    component: MyActiveLoansComponent
  }
];

export const UserRouting = RouterModule.forChild(routes);
