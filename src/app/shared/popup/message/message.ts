import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-message',
  templateUrl: './message.html',
  styleUrls: ['./message.css']
})
export class MessagePopup implements OnInit {
  message: String;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
               public dialogRef: MatDialogRef<MessagePopup>,) { }

  ngOnInit() {
    this.message = this.data.message;
  }

  close() {
    this.dialogRef.close();
  }
}
