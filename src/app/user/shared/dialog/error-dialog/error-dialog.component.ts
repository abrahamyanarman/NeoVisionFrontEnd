import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

export interface DialogData {
  name: string;
  message: string;
}
@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent implements OnInit {
  name: string;
  message: string;

  constructor( public dialogRef: MatDialogRef<ErrorDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
