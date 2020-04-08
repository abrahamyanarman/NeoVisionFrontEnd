import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApplicationService} from './application.service';
import {Response} from '../model/model/responses';

@Injectable()
export class ResetService {
  private readonly header: HttpHeaders;


  constructor(private http: HttpClient) {
    this.header = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  public sendResetPasswordEmail(email: string): Observable<any> {
    return this.http.post(ApplicationService.url + 'api/user/resetPassword?userEmail=' + email, null, {headers: this.header});
  }

  public changePassword(emailCode: string, newPassword: string): Observable<Response> {
    return this.http.post(ApplicationService.url + 'api/user/changePasswordByEmailCode/' + emailCode + '?password=' + newPassword, null);
  }
}
