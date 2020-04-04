import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {UserInfo} from "../model/model/userInfo";
import {DataService} from "../../admin/shared/dataservice";

@Injectable({
  providedIn: 'root'
})
export class EditModeService {

  idEditMode: BehaviorSubject<boolean>;
  tmpUser: BehaviorSubject<UserInfo>;


  constructor(private dataService: DataService) {
    this.idEditMode = new BehaviorSubject<boolean>(false);
    this.tmpUser = new BehaviorSubject<UserInfo>(null);
  }

  initTmpUser(id: number) {
    console.log(id);
    console.log(this.dataService);
    this.dataService.getUserById(id.toString()).subscribe(userInfo => {
      console.log(userInfo + 'editmodesevice');
      this.tmpUser.next(userInfo);
      console.log(this.tmpUser);
      this.tmpUser.next(userInfo);
      console.log(this.tmpUser);

    });

  }

  setEditModeTrue() {
    this.idEditMode.next(true);
  }
  setEditModeFalse() {
    this.idEditMode.next(false);
  }

}
