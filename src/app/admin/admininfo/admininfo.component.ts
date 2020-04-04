import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../login/shared/login.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {BaseComponent} from '../../shared/model/baseComponent';

@Component({
  selector: 'app-admininfo',
  templateUrl: './admininfo.component.html',
  styleUrls: ['./admininfo.component.css']
})
export class AdminInfoComponent extends BaseComponent implements OnInit {

  constructor(private cookieService: CookieService,
              private route: Router) {
    super();
  }

  ngOnInit(): void {
    this.generateUserInfo();
  }


}
