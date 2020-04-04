import {RouterModule, Routes} from '@angular/router';
import {ConfirmComponent} from './confirm.component';


const confirmRoutes: Routes = [
  {
    path: '',
    component: ConfirmComponent
  }
];
export const ConfirmRoutingModule = RouterModule.forChild(confirmRoutes);
