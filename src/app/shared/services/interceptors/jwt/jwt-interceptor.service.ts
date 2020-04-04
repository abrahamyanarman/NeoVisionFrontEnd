import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApplicationService} from '../../application.service';


@Injectable()
export class JwtInterceptorService implements HttpInterceptor {
  private firstTime = true;
  constructor(private applicationService: ApplicationService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(ApplicationService.token);
    if (token) {
      const authReq = req.clone({
        headers: req.headers.append(
          'Authorization', 'Bearer ' + token
        )
      });
      console.log(req.headers);
      return next.handle(authReq);
    }


    return next.handle(req);
  }
}
