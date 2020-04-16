import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {LoanRequest} from "../../shared/model/model/loanRequest";
import {LoanServiceService} from "../../shared/services/loan-service.service";
import {ApplicationService} from "../../shared/services/application.service";
import {DatePipe} from "@angular/common";
import {LoanRequestStatus} from "../../shared/model/model/loanRequestStatus";
import {ErrorDialogComponent} from "../shared/dialog/error-dialog/error-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-myloans',
  templateUrl: './myloans.component.html',
  styleUrls: ['./myloans.component.css']
})
export class MyloansComponent implements OnInit {

  displayedColumns: string[] = ['Loan Amount', 'Loan Term', 'Loan Interest Rate', 'Payment Date', 'Loan Type', 'Crated', 'Status','edit'];
  dataSource = new MatTableDataSource<LoanRequest>();
  loanRequests = new Map<number, LoanRequest>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private loanService: LoanServiceService,
              private datepipe: DatePipe,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getLoanRequests()
  }

  getLoanRequests(){
    const username = JSON.parse(localStorage.getItem(ApplicationService.me)).username;
    this.loanService.getLoanRequests(username).subscribe(values => {
      console.log(values);
      this.dataSource = new MatTableDataSource<LoanRequest>(values);
      values.forEach(value => {
        value.preferredPaymentDate = this.datepipe.transform(value.preferredPaymentDate, 'yyyy-MM-dd');
        this.loanRequests.set(value.id,value)
      });
    })
  }

  formatDate(date: Date): string{
    return this.datepipe.transform(date, 'yyyy/MM/dd');
  }

  approve(id: any) {
    let loanRequest = this.loanRequests.get(id)
    loanRequest.status = LoanRequestStatus.APPROVEDBYUSER;
    this.loanService.updateLoanRequestStatusByUser(loanRequest).subscribe(value => {
      const dialogRef = this.dialog.open(ErrorDialogComponent, {
        width: '500px',
        data: {name: 'Success!', message: 'You are successfully your loan request.'}
      });
      setTimeout(() => {
         this.getLoanRequests()
      }, 1500);
    })
  }

  cancel(id: any) {

  }
}
