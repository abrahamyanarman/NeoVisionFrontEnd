import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-role-popup',
  templateUrl: './role-popup.html',
  styleUrls: ['./role-popup.css']
})
export class RolePopup implements OnInit {
  public allRoles: Array<any>;
  public currentRoles: Array<any>;
  constructor( public dialogRef: MatDialogRef<RolePopup>,
               @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.allRoles = this.data.allRoles;
    this.currentRoles = this.data.currentRoles;
  }

  cancel() {
    this.dialogRef.close();
  }
  submitChanges(){
    this.dialogRef.close(this.currentRoles);
  }
}
