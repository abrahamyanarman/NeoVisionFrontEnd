import { Component, OnInit } from '@angular/core';
import {RegistrationService} from './shared/registration.service';
import {Router} from '@angular/router';
import { RegistrationCredentials } from './shared/model/registrationCredentials';
import {MatDialog} from '@angular/material';
import {MessagePopup} from '../shared/popup/message/message';
import * as _ from 'lodash';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {


  imageError: string;
  isImageSaved = false;
  cardImageBase64: string;

  constructor(private registrationService: RegistrationService,
              private route: Router,
              public dialog: MatDialog) { }

  public registrationCredentials: RegistrationCredentials;

  ngOnInit() {
  this.resetValidations();
  console.log(this.cardImageBase64);
  console.log(this.cardImageBase64 === 'undefined');
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


  public register(username: string, firstName: string, lastName: string, password: string, confirmPassword: string, email: string) {
    this.registrationService.register(username, firstName, lastName, password, email, this.cardImageBase64).subscribe(value => {
         this.openDialog(value.message);
          }, error => {
            this.registrationCredentials.errorMessage = error.error;
          });
  }

  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      // tslint:disable-next-line:variable-name
      const max_size = 20971520;
      // tslint:disable-next-line:variable-name
      const allowed_types = ['image/png', 'image/jpeg'];
      // tslint:disable-next-line:variable-name
      const max_height = 15200;
      // tslint:disable-next-line:variable-name
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }

      if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
        this.imageError = 'Only Images are allowed ( JPG | PNG )';
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {

          const elem = document.createElement('canvas');
          elem.width = 219;
          elem.height = 230;
          const ctx = elem.getContext('2d');
          ctx.drawImage(image, 0, 0, 219, 230);
          const data = ctx.canvas.toDataURL();
          this.cardImageBase64 = data;

          this.isImageSaved = true;

        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
}
