import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestNewLoanRouting } from './request-new-loan.routing';
import { RequestNewLoanComponent } from './request-new-loan.component';
import {ComboBoxModule} from "@syncfusion/ej2-angular-dropdowns";
import {ToolbarModule} from "@syncfusion/ej2-angular-navigations";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [RequestNewLoanComponent],
  imports: [
    CommonModule,
    RequestNewLoanRouting,
    ComboBoxModule,
    ToolbarModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class RequestNewLoanModule { }
