import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ResetService} from '../shared/services/reset.service';

@Component({
  selector: 'app-reset-email',
  templateUrl: './reset-email.component.html',
  styleUrls: ['./reset-email.component.css']
})
export class ResetEmailComponent implements OnInit {

  RequestResetForm: FormGroup;
  forbiddenEmails: any;
  errorMessage: string;
  successMessage: string;
  IsValidForm = true;
  value: any;
  constructor(private resetService: ResetService) { }

  ngOnInit() {
    this.RequestResetForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
    });
  }

  RequestResetUser(requestResetForm: FormGroup) {
    this.IsValidForm = requestResetForm.get('email').valid;
    if (this.IsValidForm) {
      const email = requestResetForm.get('email').value;
      this.resetService.sendResetPasswordEmail(email).subscribe(value => {
        console.log(value);
        this.successMessage = value.responseMessage;
        console.log(this.successMessage);
        this.value = value.message;
      },error => {
        console.log(error);
      });
    }
  }

  // onResetPasswordButtonClicked() {
  //
  // }
}
