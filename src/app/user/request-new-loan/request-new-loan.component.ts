import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {LoanServiceService} from "../../shared/services/loan-service.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {AmortizationShedule} from "../../shared/model/model/amortizationShedule";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {DatePipe} from "@angular/common";
import {LoanRequest} from "../../shared/model/model/loanRequest";
import {LoanType} from "../../shared/model/model/loanType";
import {LoanRequestStatus} from "../../shared/model/model/loanRequestStatus";
import {ApplicationService} from "../../shared/services/application.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {DialogData} from "../userinfo/userinfo.component";
import {Router} from "@angular/router";
import {ErrorDialogComponent} from "../shared/dialog/error-dialog/error-dialog.component";

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
  loanRequest: LoanRequest;

    constructor(private loanService: LoanServiceService,
                public datepipe: DatePipe,
                public dialog: MatDialog,
                private router: Router) {
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

  sendLoanRequest() {
      this.loanRequest = new LoanRequest();
      this.loanRequest.crated = this.datepipe.transform(Date.now(), 'yyyy/MM/dd');
      this.loanRequest.loanType = LoanType.UNSECURED;
      this.loanRequest.preferredLoanAmount = this.loanAmount;
      this.loanRequest.preferredLoanInterestRate = this.loanInterest;
      this.loanRequest.preferredLoanTerm = this.loanTerm;
      this.loanRequest.preferredPaymentDate = this.datepipe.transform(this.startDate, 'yyyy/MM/dd');
      this.loanRequest.status = LoanRequestStatus.REQUESTED;
      this.loanRequest.preferredStartDate =  this.datepipe.transform(this.startDate, 'yyyy/MM/dd');
      this.loanRequest.user = JSON.parse(localStorage.getItem(ApplicationService.me));
      this.loanService.sendLoanRequest(this.loanRequest).subscribe(value => {
        console.log(value);
        const dialogRef = this.dialog.open(ErrorDialogComponent, {
          width: '500px',
          data: {name: 'Success!', message: 'You are successfully requested for new loan.' +
              ' You can see your loan requests in My Loan Requests menu!'}
        });
        setTimeout(() => {
          this.router.navigate(['user/loans']);
        }, 3000);
      })
  }
}
@Component({
  selector: 'dialog-data-example-dialog',
  template: '<h1 mat-dialog-title>Favorite Animal</h1>\n' +
    '<div mat-dialog-content>\n' +
    '  <span>{{data.message}}</span>'+
    '</div>',
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
