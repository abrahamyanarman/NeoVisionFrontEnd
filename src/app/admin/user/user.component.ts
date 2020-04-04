import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {BaseComponent} from '../../shared/model/baseComponent';
import {DataService} from '../shared/dataservice';
import {RolePopup} from './shared/role-popup/role-popup';
import {LoginCredentials} from '../../login/shared/model/loginCredentials';
import {ApplicationService} from '../../shared/services/application.service';
import {HttpResponse} from '@angular/common/http';
import {RegistrationService} from '../../registration/shared/registration.service';
import {ConfirmDialog} from '../../shared/popup/confirm.dialog/confirm.dialog';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends BaseComponent implements OnInit {
  public isEditMode: boolean;
  private id: string;
  public roles: Array<any>;
  public isReady = false;
  public loginCredentials: LoginCredentials;

  constructor(private cookieService: CookieService,
              private route: Router,
              private activatedRoute: ActivatedRoute,
              private dataService: DataService,
              public dialog: MatDialog) {
    super();
    this.isEditMode = false;
  }

  private resetValidations(): void {
    this.loginCredentials = {
      loginMessage: '',
      passwordMessage: '',
      invalidUser: '',
      emailMessage: ''
    };
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.init();
  }

  private init(): void {
    this.dataService.getUserById(this.id).subscribe(value => {
      this.user = value;
      this.isEditMode = true;
      this.isReady = true;
    });
  }

  private validate(username: string, password: string, email: string): boolean {
    this.resetValidations();
    let valid = true;
    if (username === null || username.length === 0) {
      valid = false;
      this.loginCredentials.loginMessage = 'username is required';
    }
    if (password === null || password.length === 0) {
      valid = false;
      this.loginCredentials.passwordMessage = 'password is required';
    }
    if (email === null || email.length === 0) {
      valid = false;
      this.loginCredentials.emailMessage = 'mail is required';
    } else {
      if (!this.validateEmail(email)) {
        valid = false;
        this.loginCredentials.emailMessage = 'mail is incorrect';
      }

      return valid;
    }
  }

  private validateEmail(email: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  private openDialog() {
    const dialogRef = this.dialog.open(RolePopup, {
      width: '300px',
      data: {currentRoles: this.user.authorities, allRoles: this.roles}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.user.authorities = result;
        this.generateUserRoles();
      }
    });
  }

  public save() {
    this.dataService.saveUser(this.user).subscribe(value => {
      this.navigate();
    }, error => {
      console.log(error);
    });
  }

  public navigate() {
      this.route.navigateByUrl('/admin/users');
  }

  // public delete() {
  //   this.openDeleteDialog();
  // }
  //
  // private openDeleteDialog(){
  //   const dialogRef = this.dialog.open(ConfirmDialog, {
  //     width: '300px',
  //     height: '220px'
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result){
  //       this.dataService.deleteUser(this.user.id)
  //         .subscribe(value =>{
  //           this.navigate();
  //         }, error => {
  //           console.log(error);
  //         } );
  //     }
  //   });
  // }

  public createUser(username: string, password: string, email: string) {
    // if (this.validate(username, password, email)) {
    //   this.user.username = username;
    //   this.user.password = password;
    //   this.dataService.addUser(this.user)
    //     .subscribe(value => {
    //       this.navigate();
    //     },error => {
    //       this.loginCredentials.invalidUser = error.error;
    //     })
    // }
  }
}
