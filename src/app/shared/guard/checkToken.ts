import {Injectable} from '@angular/core';
import {CanLoad, Route, Router, UrlSegment} from '@angular/router';
import {Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {ApplicationService} from '../services/application.service';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class CheckToken implements CanLoad {

  public constructor(private cookieService: CookieService,
                     private applicationService: ApplicationService,
                     private router: Router,
                     private http: HttpClient) {}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return  new Promise(resolve => {
     const token = localStorage.getItem(ApplicationService.token);
     if (token) {
       this.applicationService.checkToken(token)
         .subscribe(value => {
           if (this.checkUserType(route)) {
             resolve(true);
           } else {
             resolve(false);
             this.navigateByDefault();
           }
         }, error => {
           this.restoreDataFromStorage();
           resolve(false);
           this.navigateByDefault();
         });
     } else {
       this.restoreDataFromStorage();
       resolve(false);
       this.navigateByDefault();
     }
    });
  }

  private navigateByDefault() {
    this.router.navigateByUrl('/');
  }

  private restoreDataFromStorage() {
    this.cookieService.delete(ApplicationService.url);
    localStorage.clear();
  }

  private checkUserType(route: Route): boolean {
    const type = 'admin';
    if (route.path.includes(type)) {
      const me = JSON.parse(localStorage.getItem(ApplicationService.me));
      return me.authorities.find(role => role.authority === type);
    }
    return true;
  }

}
