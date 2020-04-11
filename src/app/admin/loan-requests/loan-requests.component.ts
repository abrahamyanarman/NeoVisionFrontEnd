import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {LoanRequest} from "../../shared/model/model/loanRequest";
import {MatPaginator} from "@angular/material/paginator";
import {LoanServiceService} from "../../shared/services/loan-service.service";
import {DatePipe} from "@angular/common";
import {ApplicationService} from "../../shared/services/application.service";

@Component({
  selector: 'app-loan-requests',
  templateUrl: './loan-requests.component.html',
  styleUrls: ['./loan-requests.component.css']
})
export class LoanRequestsComponent implements OnInit {
  displayedColumns: string[] = ['UserName', 'Loan Amount', 'Loan Term', 'Loan Interest Rate', 'Payment Date', 'Loan Type', 'Crated', 'Status', 'edit'];
  dataSource = new MatTableDataSource<LoanRequest>();
  editMode = false;
  loanRequests: LoanRequest[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private loanService: LoanServiceService,
              private datepipe: DatePipe) { }


  ngOnInit() {
    this.getLoanRequests()
  }

  getLoanRequests(){
    this.loanService.getLoanRequestsWithStatusRequested().subscribe(values => {
      console.log(values);
      this.dataSource = new MatTableDataSource<LoanRequest>(values);
      this.loanRequests = values;
      console.log(this.loanRequests[1]);
    })
  }

  formatDate(date: Date): string{
    return this.datepipe.transform(date, 'yyyy/MM/dd');
  }

  setEditMode(id: number) {
    if (this.editMode){
      this.saveChanges(id);
    }
    this.editMode = !this.editMode
  }

  private saveChanges(id: number) {

    const loanRequest = this.loanRequests[id-1];
    loanRequest.crated = this.datepipe.transform(loanRequest.crated, 'yyyy/MM/dd');
    loanRequest.preferredPaymentDate = this.datepipe.transform(loanRequest.preferredPaymentDate, 'yyyy/MM/dd');
    this.loanService.updateLoanRequest(loanRequest).subscribe(value => {
      console.log(value);
    });
    console.log(this.loanRequests);
  }
}
