import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApplicationService} from "./application.service";
import {Observable} from "rxjs";
import {AmortizationShedule} from "../model/model/amortizationShedule";
import {LoanRequest} from "../model/model/loanRequest";
import {DatePipe} from "@angular/common";
import {LoanRequestStatus} from "../model/model/loanRequestStatus";
import {Loan} from "../model/model/loan";

@Injectable({
  providedIn: 'root'
})
export class LoanServiceService {
  private readonly header: HttpHeaders;


  constructor(private http: HttpClient,private datepipe: DatePipe) {
    this.header = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  public getLoanMonthlyPaymentWithUniformPayments(loanAmount: number, loanIntrest: number, loanTerm: number): Observable<any> {
   return  this.http.post<any>(ApplicationService.url + 'api/loan/monthlyPaymentWithUniForm?loanAmount=' + loanAmount +
    '&loanInterest=' + loanIntrest + '&loanTerm=' + loanTerm, null, {headers: this.header});
  }

  getLoanPaymentSchedule(loanAmount: number, loanIntrest: number, loanTerm: number, startDate: string): Observable<AmortizationShedule[]> {
    return this.http.post<any>(ApplicationService.url + 'api/loan/loanPaymentSchedule?loanAmount=' + loanAmount +
      '&loanInterest=' + loanIntrest + '&loanTerm=' + loanTerm + '&startDate=' + startDate, null, {headers: this.header});
  }

  sendLoanRequest(loanRequest: LoanRequest) {
    return this.http.post<any>(ApplicationService.url + 'api/loan/createLoanRequest?created='+loanRequest.crated+
      '&preferredPaymentDate='+loanRequest.preferredPaymentDate+'&preferredStartDate='+loanRequest.preferredStartDate, loanRequest, {headers: this.header});
  }

  getLoanRequests(username: string): Observable<LoanRequest[]> {
    return this.http.get<any>(ApplicationService.url + 'api/loan/getLoanrequests?username='+username, {headers: this.header});
  }

  getLoanRequestsWithStatusRequested(): Observable<LoanRequest[]> {
    return this.http.get<any>(ApplicationService.url + 'api/loan/getLoanRequestsWithStatusRequested', {headers: this.header});

  }

  updateLoanRequest(loanRequest: LoanRequest) {
    loanRequest.crated = this.datepipe.transform(loanRequest.crated, 'yyyy-MM-dd');
    loanRequest.preferredPaymentDate = this.datepipe.transform(loanRequest.preferredPaymentDate, 'yyyy-MM-dd');
    return this.http.post<any>(ApplicationService.url + 'api/loan/updateLoanRequest?created='+loanRequest.crated+
      '&preferredPaymentDate='+loanRequest.preferredPaymentDate, loanRequest, {headers: this.header});
  }

  updateLoanRequestStatusByUser(loanRequest: LoanRequest){
    return this.http.post<any>(ApplicationService.url + 'api/loan/updateLoanRequestStatusByUser', loanRequest, {headers: this.header});
  }

  getLoanRequestsWithStatus(status: LoanRequestStatus): Observable<LoanRequest[]> {
    // @ts-ignore
    return this.http.get<any>(ApplicationService.url + 'api/loan/getLoanRequestsWithStatus?status='+status, {headers: this.header});
  }

  createLoan(loanRequest: LoanRequest) {
    loanRequest.crated = this.datepipe.transform(loanRequest.crated, 'yyyy/MM/dd');
    loanRequest.preferredPaymentDate = this.datepipe.transform(loanRequest.preferredPaymentDate, 'yyyy/MM/dd');
    loanRequest.preferredStartDate = this.datepipe.transform(loanRequest.preferredStartDate, 'yyyy/MM/dd');
    return this.http.post<any>(ApplicationService.url + 'api/loan/createLoan?preferredStartDate='+loanRequest.preferredStartDate+
      '&preferredPaymentDate='+loanRequest.preferredPaymentDate, loanRequest, {headers: this.header});
  }

  getLoans(username: string): Observable<Loan[]>  {
    return this.http.get<Loan[]>(ApplicationService.url + 'api/loan/getLoans?username='+username, {headers: this.header});

  }

  getLoanSchedule(id: any):Observable<AmortizationShedule[]> {
    return this.http.get<any>(ApplicationService.url + 'api/loan/getLoanSchedule/'+id, {headers: this.header});

  }
}
