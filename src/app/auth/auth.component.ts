import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  isLoginMode = false;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const { email, password } = form.value;

    this.isLoading = true;

    if (this.isLoginMode) {
      this.authService.signUp(email, password).subscribe({
        next: this._sign.bind(this),
        error: this._catchError.bind(this),
      });
    } else {
      this.authService.login(email, password).subscribe({
        next: this._sign.bind(this),
        error: this._catchError.bind(this),
      });
    }

    form.reset();
  }

  private _sign(res) {
    console.log(res);
    this.isLoading = false;
  }

  private _catchError(err) {
    console.warn(err);
    this.error = err;
    this.isLoading = false;
  }
}
