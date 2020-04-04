import { Component, OnInit } from '@angular/core';
import {RegistrationService} from './shared/registration.service';
import {Router} from '@angular/router';
import { RegistrationCredentials } from './shared/model/registrationCredentials';
import {MatDialog} from '@angular/material';
import {MessagePopup} from '../shared/popup/message/message';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private registrationService: RegistrationService,
              private route: Router,
              public dialog: MatDialog) { }

  public registrationCredentials: RegistrationCredentials;

  ngOnInit() {
  this.resetValidations();
  }

  private resetValidations(): void {
    this.registrationCredentials = {
      usernameMessage: '',
      passwordMessage: '',
      confirmPasswordMessage: '',
      passwordNotMatches: '',
      errorMessage: '',
      emailMessage: ''
    };
  }

  // tslint:disable-next-line:variable-name
  // register(username: string, password: string, confirm_password: string, email: string) {
  //   if (this.validate(username, password, confirm_password, email)) {
  //     this.registrationService.register(username, password, email).subscribe(value => {
  //    this.openDialog(value);
  //     }, error => {
  //       this.registrationCredentials.errorMessage = error.error;
  //     });
  //   }
  // }

  openDialog(message: string) {
    const dialogRef = this.dialog.open(MessagePopup, {
      width: '300px',
      data: {message}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.route.navigateByUrl('/login');
    });
  }

  // tslint:disable-next-line:variable-name
  private validate(password: string, confirm_password: string): boolean {
    this.resetValidations();
    let valid = true;
    if (valid) {
        if (password !== confirm_password) {
          valid = false;
          this.registrationCredentials.passwordNotMatches = 'passwords must match';
        }
      }

    return valid;
  }


  public register(username: string, firstName: string, lastName: string, address: string, country: string, password: string, confirmPassword: string, email: string) {
    this.registrationService.register(username, firstName, lastName, address, country, password, email).subscribe(value => {
         this.openDialog(value.message);
          }, error => {
            this.registrationCredentials.errorMessage = error.error;
          });
  };
}
