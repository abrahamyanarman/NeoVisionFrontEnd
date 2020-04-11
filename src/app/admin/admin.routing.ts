import {RouterModule, Routes} from '@angular/router';
import {AdminInfoComponent} from './admininfo/admininfo.component';
import {UsersComponent} from './users/users.component';
import {UserComponent} from './user/user.component';
import {LoanRequestsComponent} from "./loan-requests/loan-requests.component";

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
  }
];

export const AdminRouting = RouterModule.forChild(routes);
