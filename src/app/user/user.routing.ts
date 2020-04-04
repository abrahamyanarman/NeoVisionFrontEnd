import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from './user.component';
import {UserinfoComponent} from './userinfo/userinfo.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent
  },
  {
    path: 'info',
    component: UserinfoComponent
  }
];

export const UserRouting = RouterModule.forChild(routes);
