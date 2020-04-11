import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {AmortizationShedule} from "../../shared/model/model/amortizationShedule";
import {MatPaginator} from "@angular/material/paginator";
import {LoanRequest} from "../../shared/model/model/loanRequest";
import {LoanServiceService} from "../../shared/services/loan-service.service";
import {stringify} from "querystring";
import {ApplicationService} from "../../shared/services/application.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-myloans',
  templateUrl: './myloans.component.html',
  styleUrls: ['./myloans.component.css']
})
export class MyloansComponent implements OnInit {

  displayedColumns: string[] = ['Loan Amount', 'Loan Term', 'Loan Interest Rate', 'Payment Date', 'Loan Type', 'Crated', 'Status'];
  dataSource = new MatTableDataSource<LoanRequest>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private loanService: LoanServiceService,
              private datepipe: DatePipe) { }

  ngOnInit() {
    this.getLoanRequests()
  }

  getLoanRequests(){
    const username = JSON.parse(localStorage.getItem(ApplicationService.me)).username;
    this.loanService.getLoanRequests(username).subscribe(values => {
      console.log(values);
      this.dataSource = new MatTableDataSource<LoanRequest>(values);
    })
  }

  formatDate(date: Date): string{
    return this.datepipe.transform(date, 'yyyy/MM/dd');
  }

}
