import { Routes, RouterModule } from '@angular/router';
import {RequestNewLoanComponent} from "./request-new-loan.component";


const routes: Routes = [
  {
    path: '',
    component: RequestNewLoanComponent

  }
];


export const RequestNewLoanRouting = RouterModule.forChild(routes);
