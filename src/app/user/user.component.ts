import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../shared/model/baseComponent';
import {HttpClient} from '@angular/common/http';
import {ApplicationService} from '../shared/services/application.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends BaseComponent implements OnInit {
  public isReady = false;
  isEditPartOpened = false;


  constructor(private http: HttpClient) {
    super();
  }

  ngOnInit(): void {
    this.init();
  }

  private init(): void {
     this.generateUserInfo();
     this.isReady = true;
  }

  public updateUserInfo() {
    this.http.put(ApplicationService.url + 'user/updateUser', this.user).subscribe(value => {
      console.log(value);
      this.isEditPartOpened = false;
    });
  }
}
