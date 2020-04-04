import {RouterModule, Routes} from '@angular/router';
import {RegistrationComponent} from './registration.component';

const routes: Routes = [
  {
    path: "",
    component: RegistrationComponent
  }
];

export const RegistrationRouting = RouterModule.forChild(routes);
