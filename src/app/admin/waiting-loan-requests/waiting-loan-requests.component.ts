import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {LoanRequest} from "../../shared/model/model/loanRequest";
import {MatPaginator} from "@angular/material/paginator";
import {LoanServiceService} from "../../shared/services/loan-service.service";
import {DatePipe} from "@angular/common";
import {LoanRequestStatus} from "../../shared/model/model/loanRequestStatus";

@Component({
  selector: 'app-waiting-loan-requests',
  templateUrl: './waiting-loan-requests.component.html',
  styleUrls: ['./waiting-loan-requests.component.css']
})
export class WaitingLoanRequestsComponent implements OnInit {

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
    this.loanService.getLoanRequestsWithStatus(LoanRequestStatus.WAITING).subscribe(values => {
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

  setEditMode(id: number) {
    document.getElementById('preferredLoanRequest'+id).style.display = 'none';
    document.getElementById('preferredLoanTerm'+id).style.display = 'none';
    document.getElementById('preferredLoanInterestRate'+id).style.display = 'none';
    document.getElementById('preferredPaymentDate'+id).style.display = 'none';
    document.getElementById('edit'+id).style.display = 'none';

    document.getElementById('approve'+id).style.display = 'none';
    document.getElementById('cancel'+id).style.display = 'none';

    document.getElementById('preferredLoanRequestEdit'+id).style.display = 'block';
    document.getElementById('preferredLoanTermEdit'+id).style.display = 'block';
    document.getElementById('preferredLoanInterestRateEdit'+id).style.display = 'block';
    document.getElementById('preferredPaymentDateEdit'+id).style.display = 'block';
    document.getElementById('save'+id).style.display = 'block';

  }

  private saveChanges(id: number) {
    document.getElementById('preferredLoanRequest'+id).style.display = 'block';
    document.getElementById('preferredLoanTerm'+id).style.display = 'block';
    document.getElementById('preferredLoanInterestRate'+id).style.display = 'block';
    document.getElementById('preferredPaymentDate'+id).style.display = 'block';
    document.getElementById('edit'+id).style.display = 'inline-block';

    document.getElementById('approve'+id).style.display = 'inline-block';
    document.getElementById('cancel'+id).style.display = 'inline-block';

    document.getElementById('preferredLoanRequestEdit'+id).style.display = 'none';
    document.getElementById('preferredLoanTermEdit'+id).style.display = 'none';
    document.getElementById('preferredLoanInterestRateEdit'+id).style.display = 'none';
    document.getElementById('preferredPaymentDateEdit'+id).style.display = 'none';
    document.getElementById('save'+id).style.display = 'none';

    const loanRequest = this.loanRequests.get(id);
    loanRequest.crated = this.datepipe.transform(loanRequest.crated, 'yyyy-MM-dd');
    loanRequest.preferredPaymentDate = this.datepipe.transform(loanRequest.preferredPaymentDate, 'yyyy-MM-dd');
    this.loanService.updateLoanRequest(loanRequest).subscribe(value => {
      console.log(value);
      this.getLoanRequests()
    });
    console.log(this.loanRequests);
  }


  approve(id: any) {
    this.loanRequests.get(id).status = LoanRequestStatus.APPROVED;
    this.loanService.updateLoanRequest(this.loanRequests.get(id)).subscribe(value => {
      this.getLoanRequests()
    });
  }

  cancel(id: any) {
    this.loanRequests.get(id).status = LoanRequestStatus.CANCELED;
    this.loanService.updateLoanRequest(this.loanRequests.get(id)).subscribe(value => {
      this.getLoanRequests()
    });
  }




}
