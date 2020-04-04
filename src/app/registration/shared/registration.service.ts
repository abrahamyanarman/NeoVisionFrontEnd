import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApplicationService} from '../../shared/services/application.service';
import {Observable} from 'rxjs';
import {Response} from '../../shared/model/model/responses';


@Injectable()
export class RegistrationService {
  private readonly header: HttpHeaders;

  constructor(private http: HttpClient, private applicationService: ApplicationService) {
    this.header = new HttpHeaders({'Content-Type': 'application/json'});
  }
  public register(username: string, firstName: string, lastName: string, address: string, country: string, password: string, email: string): Observable<Response> {
     const user = {
       userName: username,
       password,
       email,
       firstName,
       lastName,
       address,
       country
     };
     return this.http.post(ApplicationService.url + 'register/user', JSON.stringify(user),
            {headers: this.header});
  }
}
