import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const TOKEN = localStorage.getItem('token');
    if (TOKEN) {

      const cloned = req.clone({
        headers: req.headers.set('Authorization',
          'Bearer ' + TOKEN)
      });
      console.log('Token from Interceptor ', cloned);
      return next.handle(cloned);
    } else {

      return next.handle(req);
    }
  }

}
