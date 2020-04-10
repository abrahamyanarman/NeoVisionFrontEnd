import { Component, OnInit } from '@angular/core';
import {MatSliderChange} from '@angular/material/slider';
import {LoanServiceService} from "../../shared/services/loan-service.service";

@Component({
  selector: 'app-request-new-loan',
  templateUrl: './request-new-loan.component.html',
  styleUrls: ['./request-new-loan.component.css']
})
export class RequestNewLoanComponent implements OnInit {

  loanAmount = 5000;
  loanInterest = 5.00;
  showMonthly = true;
  loanTerm = this.showMonthly ? 12 : 1;
  loanMonthlyPayment: number;

  constructor(private loanService: LoanServiceService) { }

  ngOnInit() {
    this.getLoanMonthlyPaymentWithUniformPayments(this.loanAmount, this.loanInterest, this.loanTerm);
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

  onSliderToggleChange(){
    this.showMonthly = !this.showMonthly;
    if (this.showMonthly){
      this.loanTerm = this.loanTerm * 12;
    } else {
      this.loanTerm = Math.round(this.loanTerm / 12);

    }
  }


  getLoanMonthlyPaymentWithUniformPayments(loanAmount: number, loanIntrest: number, loanTerm: number){
    this.loanService.getLoanMonthlyPaymentWithUniformPayments(loanAmount, loanIntrest, loanTerm)
      .subscribe(value => {
        console.log(value.monthlyPayment);
        this.loanMonthlyPayment = value.monthlyPayment;
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
}
