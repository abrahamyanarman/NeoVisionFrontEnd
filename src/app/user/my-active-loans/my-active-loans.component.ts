import {Component, OnInit, ViewChild} from '@angular/core';
import {ApplicationService} from "../../shared/services/application.service";
import {MatTableDataSource} from "@angular/material/table";
import {LoanRequest} from "../../shared/model/model/loanRequest";
import {MatPaginator} from "@angular/material/paginator";
import {LoanServiceService} from "../../shared/services/loan-service.service";
import {DatePipe} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {Loan} from "../../shared/model/model/loan";
import {AmortizationShedule} from "../../shared/model/model/amortizationShedule";
import {LoanScheduleDialogComponent} from "./loan-schedule-dialog/loan-schedule-dialog.component";

@Component({
  selector: 'app-my-active-loans',
  templateUrl: './my-active-loans.component.html',
  styleUrls: ['./my-active-loans.component.css']
})
export class MyActiveLoansComponent implements OnInit {
  displayedColumns: string[] = ['Loan Id','Loan Amount', 'Loan Term', 'Loan Interest Rate', 'Loan Type','Crated','edit'];
  dataSource = new MatTableDataSource<Loan>();
  loans = new Map<number, Loan>();
  schedules: AmortizationShedule[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private loanService: LoanServiceService,
              private datepipe: DatePipe,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getLoans()
  }

  getLoans(){
    const username = JSON.parse(localStorage.getItem(ApplicationService.me)).username;
    this.loanService.getLoans(username).subscribe(values => {
      console.log(values);
      this.dataSource = new MatTableDataSource<Loan>(values);
      values.forEach(value => {
        value.createDate = this.datepipe.transform(value.createDate, 'yyyy-MM-dd');
        this.loans.set(value.id,value)
      });
    })
  }

  formatDate(date: Date): string{
    return this.datepipe.transform(date, 'yyyy/MM/dd');
  }



  cancel(id: any) {

  }

  showAmortization(id: any) {
    this.loanService.getLoanSchedule(id).subscribe(value => {
      console.log(value);
      this.schedules = value.sort((a:any,b:any) =>{
        let date1 = new Date(a.paymentDate);
        let date2 = new Date(b.paymentDate);
        if (date1 > date2) {
          return 1;
        } else if (date1 < date2) {
          return -1;
        } else {
          return 0;
        }
      });
      const dialogRef = this.dialog.open(LoanScheduleDialogComponent, {
        width: '900px',
        height: 'auto',
        data: {schedules: value}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.schedules = null;
      });
    });
  }
}
