import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {LoanRequest} from "../../shared/model/model/loanRequest";
import {MatPaginator} from "@angular/material/paginator";
import {LoanServiceService} from "../../shared/services/loan-service.service";
import {DatePipe} from "@angular/common";
import {LoanRequestStatus} from "../../shared/model/model/loanRequestStatus";

@Component({
  selector: 'app-approved-loan-requests',
  templateUrl: './approved-loan-requests.component.html',
  styleUrls: ['./approved-loan-requests.component.css']
})
export class ApprovedLoanRequestsComponent implements OnInit {
  displayedColumns: string[] = ['UserName', 'Loan Amount', 'Loan Term', 'Loan Interest Rate', 'Payment Date', 'Loan Type', 'Crated', 'Status', 'edit'];
  dataSource = new MatTableDataSource<LoanRequest>();
  editMode = false;
  loanRequests = new Map<number, LoanRequest>();


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private loanService: LoanServiceService,
              private datepipe: DatePipe) { }

  ngOnInit() {
    this.getLoanRequests()
  }

  getLoanRequests(){
    this.loanService.getLoanRequestsWithStatus(LoanRequestStatus.APPROVED).subscribe(values => {
      console.log(values);
      this.dataSource = new MatTableDataSource<LoanRequest>(values);
      values.forEach(value => {
        value.preferredPaymentDate = this.datepipe.transform(value.preferredPaymentDate, 'yyyy-MM-dd');
        this.loanRequests.set(value.id,value)
      });
      console.log(this.loanRequests);
    })
  }
  formatDate(date: Date): string{
    return this.datepipe.transform(date, 'yyyy/MM/dd');
  }

  createLoan(id: any) {
    this.loanService.createLoan(this.loanRequests.get(id)).subscribe(value => {
      console.log(value);
      this.getLoanRequests()
    })
  }

  cancel(id: any) {
    this.loanRequests.get(id).status = LoanRequestStatus.CANCELED;
    this.loanService.updateLoanRequest(this.loanRequests.get(id)).subscribe(value => {
      this.getLoanRequests()
    });
  }
}
