import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApplicationService} from './application.service';
import {Response} from '../model/model/responses';

@Injectable()
export class ResetService {

  constructor(private http: HttpClient) {
  }

  public sendResetPasswordEmail(email: string): Observable<Response> {
    return this.http.get(ApplicationService.url + 'reset/user/' + email);
  }

  public changePassword(emailCode: string, newPassword: string): Observable<Response> {
    return this.http.post(ApplicationService.url + 'reset/user/' + emailCode + '?password=' + newPassword, null);
  }
}
