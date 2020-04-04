import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, ReplaySubject} from 'rxjs';

@Injectable()
export class ApplicationService {

  static readonly token = 'access_token';

  public static readonly me = 'me';

  static readonly url =  'http://localhost:8080/';

  constructor(private http: HttpClient) {}


  public checkToken(token: string): Observable<any> {
    const result = new ReplaySubject();
    this.http.get(ApplicationService.url + 'checktoken')
        .subscribe(value => result.next(value), error => result.error(error));
    return result;
  }
}
