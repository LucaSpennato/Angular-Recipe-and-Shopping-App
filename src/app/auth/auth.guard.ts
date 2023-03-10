import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, map, tap, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.authService.user.pipe(
      // ! usiamo il take 1 perchè vogliamo che la guard funzioni SOLO UNA VOLTA, cioè quando gli arriva la chiamata e basta
      // perchè potrebbe continuare ad ascoltare e fa cose strane in casi particolari
      take(1),
      // ? esempio con urltree
      // map((user) => {
      //   const isAuth = !!user;
      //   if (isAuth) {
      //     return true;
      //   }
      //   return this.router.createUrlTree(['/auth']);
      // }),
      map((user) => {
        return !!user;
      }),
      // dato che sopra si ritorna un boolean possiamo prenderlo con il tap, ed eventualmente fare il redirect se falzo
      tap((isAuth) => {
        if (!isAuth) {
          this.router.navigate(['/auth']);
        }
      })
    );
  }
}
