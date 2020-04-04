import {Component, Input, OnInit} from '@angular/core';
import {UserInfo} from "../../shared/model/model/userInfo";
import {DataService} from "../../admin/shared/dataservice";
import {User} from "../../shared/model/User";
import {BaseComponent} from "../../shared/model/baseComponent";
import {LoginCredentials} from "../../login/shared/model/loginCredentials";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {RolePopup} from "../../admin/user/shared/role-popup/role-popup";
import {EditModeService} from "../../shared/services/edit-mode.service";
import * as _ from 'lodash';
import {ErrorDialogComponent} from "../shared/dialog/error-dialog/error-dialog.component";
import {DomSanitizer} from "@angular/platform-browser";


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent extends BaseComponent implements OnInit {


  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;

  public isEditMode: boolean;
  public roles: Array<any>;
  public isReady = false;
  public loginCredentials: LoginCredentials;
  public valueFieldColSize = 10;
  private tmpUser: UserInfo;
  constructor( private cookieService: CookieService,
               private route: Router,
               private activatedRoute: ActivatedRoute,
               private dataService: DataService,
               public dialog: MatDialog,
               private editModeService: EditModeService,
               private sanitize: DomSanitizer) {
    super();
    this.generateUserInfo();
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

  ngOnInit() {
    if (this.tmpUser === undefined) {
      this.editModeService.initTmpUser(JSON.parse(localStorage.getItem('me')).id);
    }
    this.editModeService.tmpUser.subscribe(tmpUser => {
      this.tmpUser = tmpUser;
      console.log('ssss' + tmpUser);
    });
    console.log(this.tmpUser);
    this.editModeService.idEditMode.subscribe(isEditMode => {
      this.isEditMode = isEditMode;
      if (isEditMode) {
        this.valueFieldColSize = 8;
      } else {
        this.valueFieldColSize = 10;
      }
    });

    this.init();
  }

  private init(): void {
    this.generateUserInfo();
    this.isReady = true;
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


  saveChanges() {
    this.dataService.saveUser(this.user).subscribe(userInfo => {

      this.user = userInfo;

      this.editModeService.tmpUser.next(userInfo);
    }, error => {
      const dialogRef = this.dialog.open(ErrorDialogComponent, {
        width: '250px',
        data: {name: 'Error', message: 'Something went wrong, please try again!'}
      });
    });
    this.editModeService.setEditModeFalse();
  }

  edit(id: string) {
    document.getElementById(id).style.display = 'none';
    document.getElementById(id + 'edit').style.display = 'block';
    document.getElementById(id + 'editbtn').style.display = 'none';
    document.getElementById(id + 'successbtn').style.display = 'block';
    document.getElementById('phodoEditInput').style.background = 'url("../../../assets/images/editImage.png") no-repeat';
  }

  success(id: string) {
    document.getElementById(id).style.display = 'block';
    document.getElementById(id + 'edit').style.display = 'none';
    document.getElementById(id + 'editbtn').style.display = 'block';
    document.getElementById(id + 'successbtn').style.display = 'none';
  }

  cancelChanges() {
    this.isImageSaved = false;
    this.editModeService.setEditModeFalse();
    this.editModeService.initTmpUser(JSON.parse(localStorage.getItem('me')).id);
    console.log(this.isEditMode);
    console.log(this.user);
    console.log(this.tmpUser);
    this.user = this.tmpUser;
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

          this.user.photoUri = this.cardImageBase64;
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }


  removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
  }
}
