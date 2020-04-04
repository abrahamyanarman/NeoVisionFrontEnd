import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApplicationService} from '../../shared/services/application.service';
import {Response} from '../../shared/model/model/responses';

@Injectable()
export class ConfirmService {

  constructor(private http: HttpClient) { }

  public confirmAccount(code: string): Observable<Response> {
    return this.http.get(ApplicationService.url + 'register/confirm/' + code);
  }
}
