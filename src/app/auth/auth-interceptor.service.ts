import { AuthService } from './auth.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take, exhaustMap } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authServ: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authServ.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }
        const modifierRequest = req.clone({
          params: new HttpParams().set('auth', user.token),
        });
        return next.handle(modifierRequest);
      })
    );
  }
}
