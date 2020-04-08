import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApplicationService} from '../../shared/services/application.service';
import {UserInfo} from '../../shared/model/model/userInfo';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class LoginService {
  private readonly header: HttpHeaders;


  constructor(private http: HttpClient) {
    this.header = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

 public login(username: string, password: string): Observable<any> {
    const body = {
      username,
      password
    };
    return  this.http.post(ApplicationService.url + 'api/login', JSON.stringify(body), {headers: this.header});
 }

 public getMe(): Observable<any> {

    return this.http.get<any>(ApplicationService.url + 'api/user/info',
    {headers: this.header});
 }
}
