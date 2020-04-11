import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSliderChange} from '@angular/material/slider';
import {LoanServiceService} from "../../shared/services/loan-service.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {AmortizationShedule} from "../../shared/model/model/amortizationShedule";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-request-new-loan',
  templateUrl: './request-new-loan.component.html',
  styleUrls: ['./request-new-loan.component.css']
})
export class RequestNewLoanComponent implements OnInit {

  displayedColumns: string[] = ['Payment Date', 'Payment', 'Principal', 'Interest', 'Total Interest', 'Balance'];
  dataSource = new MatTableDataSource<AmortizationShedule>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  loanAmount = 5000;
  loanInterest = 5.00;
  showMonthly = true;
  loanTerm = this.showMonthly ? 12 : 1;
  loanMonthlyPayment: number;
  showAmortization = false;
  startDate = new Date();

   ELEMENT_DATA: AmortizationShedule[];

    constructor(private loanService: LoanServiceService,
                public datepipe: DatePipe) {
      this.startDate.setMonth(this.startDate.getMonth() + 1);
    }

  ngOnInit() {
    this.getLoanMonthlyPaymentWithUniformPayments(this.loanAmount, this.loanInterest, this.loanTerm);


    this.dataSource.paginator = this.paginator;
  }

  formatLabel(value: number) {
    this.loanAmount = value;
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  formatInterest(value: number) {
      return value + '%';
  }

  formatTerm(value: number) {
    if (this.showMonthly) {
      return value + 'M';
    } else {
      return value + 'Y';
    }
  }

  onSliderToggleChange() {
    this.showMonthly = !this.showMonthly;
    if (this.showMonthly) {
      this.loanTerm = this.loanTerm * 12;
    } else {
      this.loanTerm = Math.round(this.loanTerm / 12);

    }
  }


  getLoanMonthlyPaymentWithUniformPayments(loanAmount: number, loanIntrest: number, loanTerm: number){
    this.loanService.getLoanMonthlyPaymentWithUniformPayments(loanAmount, loanIntrest, loanTerm)
      .subscribe(value => {
        this.loanMonthlyPayment = value.monthlyPayment;
      });
  }

  getLoanPaymentSchedule(loanAmount: number, loanIntrest: number, loanTerm: number, startDate: string) {
    console.log(startDate);
    this.loanService.getLoanPaymentSchedule(loanAmount, loanIntrest, loanTerm, startDate).subscribe(values => {
        this.dataSource = new MatTableDataSource<AmortizationShedule>(values);
        console.log(values);
      });
  }

  termChange() {
    this.getLoanMonthlyPaymentWithUniformPayments(this.loanAmount, this.loanInterest, this.loanTerm);
  }

  interestChange() {
    this.getLoanMonthlyPaymentWithUniformPayments(this.loanAmount, this.loanInterest, this.loanTerm);
  }

  amountChange() {
    this.getLoanMonthlyPaymentWithUniformPayments(this.loanAmount, this.loanInterest, this.loanTerm);
  }

  getTotalPayedInterest(): number {
    return Math.round(((this.loanMonthlyPayment * this.loanTerm) - this.loanAmount) * 100) / 100;
  }

  generateAmortization() {
      this.showAmortization = !this.showAmortization;
      if (this.showAmortization) {
        this.getLoanPaymentSchedule(this.loanAmount, this.loanInterest, this.loanTerm, this.datepipe.transform(this.startDate, 'yyyy/MM/dd'));
      }
  }

  startDateChange($event: MatDatepickerInputEvent<never>) {
    console.log(this.startDate);
    this.startDate = $event.value;
    console.log(this.startDate);

  }
}
