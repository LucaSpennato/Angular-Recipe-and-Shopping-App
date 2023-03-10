import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

interface AuthResponseData {
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
        })
      );
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
      }
    }
    return throwError(() => new Error(errMessage));
  }
}
