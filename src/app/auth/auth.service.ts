import { User } from './user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, tap, BehaviorSubject } from 'rxjs';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

// ! Auth docs
// https://firebase.google.com/docs/reference/rest/auth#section-create-email-password

@Injectable({ providedIn: 'root' })
export class AuthService {
  // salviamo lo user e lo emittiamo ogni volta che logghiamo o slogghiamo il token temporale scade
  // ! controlla i pipe sotto, va fatto lì, nel tap, perchè è lì che ci arrivano le info
  // ? behaviorSubject ci permette di prendere le info di quel che è stato emittato anche prima che noi facessimo il subscribe
  // ? partiamo con null perchè semplicemente non abbiamo uno user all'inizio
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errorRes) => {
          return this._handleError(errorRes);
        }),
        tap((resData) => {
          const { email, localId, idToken, expiresIn } = resData;
          this._handleAuth(email, localId, idToken, +expiresIn);
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errorRes) => {
          return this._handleError(errorRes);
        }),
        tap((resData) => {
          const { email, localId, idToken, expiresIn } = resData;
          this._handleAuth(email, localId, idToken, +expiresIn);
        })
      );
  }

  private _handleAuth(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    // creiamo una nuova data, a partire dal momento in cui c'è in signUp(nsomma un now),
    // prendiamo il timestamp in millisecondi con il getTime
    // aggiungiamo l'expires in (parsato) per mille per convertire quest'ultimo in millisecondi
    // avendolo wrappato in un new Date, lo converte in un timestamp pulito e non più millisecondi
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);

    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
  }

  private _handleError(errorRes: HttpErrorResponse) {
    let errMessage = 'An unknown error occurred!';
    console.log(errorRes.error.error.message, 'error from service');
    if (errorRes.error.hasOwnProperty('error')) {
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errMessage = 'This email already extists';
          break;
        case 'EMAIL_NOT_FOUND':
          errMessage = 'This email do not exists';
          break;
        case 'OPERATION_NOT_ALLOWED':
          errMessage = 'Password sign-in is disabled for this project';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          errMessage =
            'We have blocked all requests from this device due to unusual activity. Try again later';
          break;
        case 'INVALID_PASSWORD':
          errMessage =
            'The password is invalid or the user does not have a password';
          break;
        case 'USER_DISABLED':
          errMessage = 'The user account has been disabled by an administrator';
          break;
      }
    }
    return throwError(() => new Error(errMessage));
  }
}
