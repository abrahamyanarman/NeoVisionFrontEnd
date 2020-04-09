import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataService} from '../shared/dataservice';
import {Router} from '@angular/router';
import {ConfirmDialog} from '../../shared/popup/confirm.dialog/confirm.dialog';
import {MatDialog} from '@angular/material';
import {User} from '../../shared/model/User';
import {UserInfo} from "../../shared/model/model/userInfo";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public isReady: boolean;
  public users: Array<UserInfo>;
  private enabled  = new FormControl();

  constructor(private dataService: DataService,
              private router: Router,
              public dialog: MatDialog) {
    this.isReady = false;
    this.users = new Array<UserInfo>();
  }

  ngOnInit() {
    this.dataService.getAllUsers()
      .subscribe((value: any) => {
        value.forEach((user: UserInfo) => {
          if (user.id !== JSON.parse(localStorage.getItem('me')).id) {
            this.users.push(user);
          }
        });

        this.initRoles();
        this.isReady = true;
      });
  }

  private initRoles() {
    if (this.users) {
      this.users.forEach(user => {
        const roles = user.authorities;
        if (roles) {
          // @ts-ignore
          user.authorities = roles.map(role => role.authority).join(', ');

        }
      });
    }
  }


  public editUser(id: number) {
    this.router.navigate(['/admin/user', id]);
  }

  public deleteUser(userId: number) {
    this.openDeleteDialog(userId);
  }

  private openDeleteDialog(userId: number){
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '300px',
      height: '220px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.deleteUser(+userId)
          .subscribe(value => {
            this.users = this.users.filter(user => +user.id !== +userId);
          }, error => {
            console.log(error);
          } );
      }
    });
  }

  onEnableSlideTogleChange(event: MatSlideToggleChange, id: number) {
    if (event.checked) {
      this.activateUser(id);
    } else {
      this.deactivateUser(id);
    }
  }

  activateUser(id: number) {
    this.dataService.acticateUserById(id).subscribe(value => {
      console.log(value);
    });
  }

  deactivateUser(id: number) {
    this.dataService.deacticateUserById(id).subscribe(value => {
      console.log(value);
    });
  }
}
