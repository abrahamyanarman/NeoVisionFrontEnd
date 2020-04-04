import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {LoginService} from '../../login/shared/login.service';
import {Router} from '@angular/router';
import {EditModeService} from "../../shared/services/edit-mode.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {

  userIsLogined: boolean ;
  isAdmin: boolean;
  constructor(private loginService: LoginService, private router: Router, private editModeService: EditModeService) {
    this.router.events.subscribe(event => {
      this.checkUserIsLoggedInAndUserType();
    });
  }



  ngOnInit() {
    this.checkUserIsLoggedInAndUserType();
  }

  checkUserIsLoggedInAndUserType(): void {
    this.userIsLogined = !(localStorage.getItem('me') === null);
    if (this.userIsLogined) {
      JSON.parse(localStorage.getItem('me')).authorities.forEach(authority =>
        authority.authority === 'ROLE_ADMIN' ? this.isAdmin = true : this.isAdmin = false);
    }
  }


  setEditModeTrue() {
    this.editModeService.setEditModeTrue();
  }
}
