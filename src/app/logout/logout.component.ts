import {Component} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {ApplicationService} from '../shared/services/application.service';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'logout-button',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private cookieService: CookieService, private route: Router) {}

 public logout(): void {
    localStorage.clear();
    this.cookieService.delete(ApplicationService.token);
    this.route.navigateByUrl('/login');
  }
}
