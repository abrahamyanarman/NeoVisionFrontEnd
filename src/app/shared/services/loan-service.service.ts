import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApplicationService} from "./application.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoanServiceService {
  private readonly header: HttpHeaders;


  constructor(private http: HttpClient) {
    this.header = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  public getLoanMonthlyPaymentWithUniformPayments(loanAmount: number, loanIntrest: number, loanTerm: number): Observable<any> {
   return  this.http.post<any>(ApplicationService.url + 'api/loan/monthlyPaymentWithUniForm?loanAmount=' + loanAmount +
    '&loanInterest=' + loanIntrest + '&loanTerm=' + loanTerm, null, {headers: this.header});
  }
}
