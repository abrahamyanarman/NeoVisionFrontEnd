import { Component, OnInit } from '@angular/core';
import {DataService} from '../shared/dataservice';
import {Router} from '@angular/router';
import {ConfirmDialog} from '../../shared/popup/confirm.dialog/confirm.dialog';
import {MatDialog} from '@angular/material';
import {User} from '../../shared/model/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public isReady: boolean;
  public users: Array<User>;

  constructor(private dataService: DataService,
              private router: Router,
              public dialog: MatDialog) {
    this.isReady = false;
  }

  ngOnInit() {
    this.dataService.getAllUsers()
      .subscribe((value: any) => {
        this.users = value;
        this.initRoles();
        this.isReady = true;
      })
  }

  private initRoles() {
    if (this.users) {
      this.users.forEach(user => {
        let roles = user.authorities;
        if (roles) {
          // @ts-ignore
          user.roles = roles.map(role => role).join(', ');

        }
      })
    }
  }


  public editUser(id: string) {
    this.router.navigate(['/admin/user',id]);
  }

  public deleteUser(userId: string) {
    this.openDeleteDialog(userId);
  }

  private openDeleteDialog(userId: string){
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
}
