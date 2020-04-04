import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {OldPwdValidators} from './pwd-change/old-pwd.validatos';
import {ActivatedRoute} from '@angular/router';
import {ResetService} from '../shared/services/reset.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  form1: FormGroup;
  public isConfirmPwdValid = true;
  public isNewPwdValid = true;
  private emailCode: string;
  value: any;

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private resetService: ResetService) {
  }

  ngOnInit() {
    this.form1 = this.fb.group({
      newPwd: ['', Validators.required],
      confirmPwd: ['', Validators.required]
    }, {
      validator: OldPwdValidators.matchPwds
    });
    this.emailCode = this.activatedRoute.snapshot.params.emailCode;
  }

  get newPwd() {
    return this.form1.get('newPwd');
  }

  get confirmPwd() {
    return this.form1.get('confirmPwd');
  }

  public onChangePasswordClicked(): void {
    if (this.validate()) {
      this.resetService.changePassword(this.emailCode, this.newPwd.value)
        .subscribe(value => {
          console.log(value);
          this.value = value.message;
        });
    }
  }
  private validate(): boolean {
    this.isConfirmPwdValid =  this.confirmPwd.valid;
    this.isNewPwdValid =  this.newPwd.valid;
    return this.isConfirmPwdValid && this.isNewPwdValid && this.form1.valid;
  }

  private onConfirmPwdChanged(value: string): void {
    this.isConfirmPwdValid = value !== '';
  }
  private onNewPwdChanged(value: string): void {
    this.isNewPwdValid = value !== '';
  }
}
