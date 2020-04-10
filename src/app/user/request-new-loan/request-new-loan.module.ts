import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestNewLoanRouting } from './request-new-loan.routing';
import { RequestNewLoanComponent } from './request-new-loan.component';
import {ComboBoxModule} from "@syncfusion/ej2-angular-dropdowns";
import {ToolbarModule} from "@syncfusion/ej2-angular-navigations";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSliderModule} from "@angular/material/slider";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import {NgApexchartsModule} from "ng-apexcharts";


@NgModule({
  declarations: [RequestNewLoanComponent, PieChartComponent],
  imports: [
    CommonModule,
    RequestNewLoanRouting,
    ComboBoxModule,
    ToolbarModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSliderModule,
    FormsModule,
    MatSlideToggleModule,
    NgApexchartsModule
  ]
})
export class RequestNewLoanModule { }
