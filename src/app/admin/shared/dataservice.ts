import {Injectable} from '@angular/core';
import {ApplicationService} from '../../shared/services/application.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Role, User} from '../../shared/model/User';
import {Observable} from 'rxjs';
import {UserInfo} from "../../shared/model/model/userInfo";


@Injectable()
export class DataService {

  constructor(private applicationService: ApplicationService,
              private http: HttpClient,
              private cookieService: CookieService) {
  }

  public getAllUsers(): Observable<any> {
    return this.http.get<any>(ApplicationService.url + 'api/user/getAll');
  }

  public getUserById(id: string): Observable<UserInfo> {
    return this.http.get<UserInfo>(ApplicationService.url + 'api/user/info/' + id);
  }

  saveUser(user: any): Observable<any> {
    return this.http.post(ApplicationService.url + 'api/user/updateUser', user);
  }

  deleteUser(id: number) {
    return this.http.delete(ApplicationService.url + 'user/' + id);
  }

 /* saveUserPhoto(uploadData: FormData, id: number):Observable<Blob> {
    return this.http.post(ApplicationService.url + 'api/user/updateUserPhoto/'+id, uploadData,{responseType: "blob"});
  }

  getUserPhoto(id: number):Observable<Blob> {
    return this.http.get<Blob>(ApplicationService.url + 'api/user/getUserPhoto/' + id);

  }*/
  isValid() {
    return (localStorage.getItem('me') != null || localStorage.getItem('access_token') != null);
  }

  activateUser(emailCode: string): Observable<any> {
    return this.http.post<any>(ApplicationService.url + 'api/user/activateProfile?emailCode=' + emailCode, null);
  }

  acticateUserById(id: number): Observable<any> {
    return this.http.post<any>(ApplicationService.url + 'api/user/activateProfileById/' + id, null);
  }
  deacticateUserById(id: number): Observable<any> {
    return this.http.post<any>(ApplicationService.url + 'api/user/deactivateProfileById/' + id, null);
  }
}
