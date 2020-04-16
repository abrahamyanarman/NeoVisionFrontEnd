import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApplicationService} from '../../application.service';
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";


@Injectable()
export class JwtInterceptorService implements HttpInterceptor {
  private firstTime = true;
  constructor(private applicationService: ApplicationService,private router: Router) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(ApplicationService.token);
    if (token) {
      const authReq = req.clone({
        headers: req.headers.append(
          'Authorization', 'Bearer ' + token
        )
          .append('Content-Type', 'application/json')
      });
      console.log(req.headers);
      return next.handle(authReq).pipe( tap(() => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status !== 401) {
              return;
            }
            this.router.navigate(['login']);
          }
        }));
    }

    console.log(req.headers);

    return next.handle(req).pipe( tap(() => {},
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401) {
            return;
          }
          this.router.navigate(['login']);
        }
      }));
  }
}
