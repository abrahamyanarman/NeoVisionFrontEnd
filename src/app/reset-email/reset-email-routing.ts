import {RouterModule, Routes} from '@angular/router';
import {ResetEmailComponent} from './reset-email.component';


const resetEmailRoutes: Routes = [
  {
    path: '',
    component: ResetEmailComponent
  }
];
export const ResetEmailRoutingModule = RouterModule.forChild(resetEmailRoutes);
