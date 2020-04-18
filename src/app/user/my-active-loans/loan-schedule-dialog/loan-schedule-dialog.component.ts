import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../../userinfo/userinfo.component";
import {AmortizationShedule} from "../../../shared/model/model/amortizationShedule";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-loan-schedule-dialog',
  templateUrl: './loan-schedule-dialog.component.html',
  styleUrls: ['./loan-schedule-dialog.component.css']
})
export class LoanScheduleDialogComponent implements OnInit {

  displayedColumns: string[] = ['Payment Date', 'Payment', 'Principal', 'Interest', 'Total Interest', 'Balance'];
  dataSource = new MatTableDataSource<AmortizationShedule>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public dialogRef: MatDialogRef<LoanScheduleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public schedules: AmortizationShedule[]) { }

  ngOnInit() {
    // @ts-ignore
    console.log(this.schedules.schedules);
    // @ts-ignore
    this.dataSource = new MatTableDataSource<AmortizationShedule>(this.schedules.schedules)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
