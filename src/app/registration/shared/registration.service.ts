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
  public register(username: string, firstName: string, lastName: string, password: string, email: string, photoUri: string): Observable<Response> {
     const user = {
       username,
       password,
       repasword: password,
       email,
       firstName,
       lastName,
       photoUri,
       roles: [1]
     };
     return this.http.post(ApplicationService.url + 'api/user/register', JSON.stringify(user),
            {headers: this.header});
  }
}
