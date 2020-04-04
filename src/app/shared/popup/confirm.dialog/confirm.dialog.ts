import {Component, OnInit} from '@angular/core';
import { MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-confirm.dialog',
  templateUrl: './confirm.dialog.html',
  styleUrls: ['./confirm.dialog.css']
})
export class ConfirmDialog implements OnInit {

  constructor( public dialogRef: MatDialogRef<ConfirmDialog>) { }

  ngOnInit() {}

  cancel() {
    this.dialogRef.close();
  }
  submitChanges(){
    this.dialogRef.close(true);
  }

}
