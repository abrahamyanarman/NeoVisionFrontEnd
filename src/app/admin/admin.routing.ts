import {RouterModule, Routes} from '@angular/router';
import {AdminInfoComponent} from './admininfo/admininfo.component';
import {UsersComponent} from './users/users.component';
import {UserComponent} from './user/user.component';
import {LoanRequestsComponent} from "./loan-requests/loan-requests.component";
import {ApprovedLoanRequestsComponent} from "./approved-loan-requests/approved-loan-requests.component";
import {WaitingLoanRequestsComponent} from "./waiting-loan-requests/waiting-loan-requests.component";
import {CanceledLoanRequestsComponent} from "./canceled-loan-requests/canceled-loan-requests.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: 'info',
    pathMatch: 'full'
  },
  {
    path: 'info',
    component: AdminInfoComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'user/:id',
    component: UserComponent
  },
  {
    path: 'loans/new',
    component: LoanRequestsComponent
  },
  {
    path: 'loans/approved',
    component: ApprovedLoanRequestsComponent
  },
  {
    path: 'loans/waiting',
    component: WaitingLoanRequestsComponent
  },
  {
    path: 'loans/canceled',
    component: CanceledLoanRequestsComponent
  }
];

export const AdminRouting = RouterModule.forChild(routes);
