import {ApplicationService} from '../services/application.service';
import {UserInfo} from './model/userInfo';

export class BaseComponent {
  protected user: UserInfo;
  public userRoles: string;
  constructor() {
  }

  protected generateUserInfo() {
    this.user = JSON.parse(localStorage.getItem(ApplicationService.me));

    this.generateUserRoles();
  }

  protected generateUserRoles() {
    const roles = this.user.authorities;
    if (roles) {
      this.userRoles =  roles.map(role => role.authority).join(', ');

    }
  }
}
