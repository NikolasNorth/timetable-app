import { Component, OnInit } from '@angular/core';
import {Account} from '../@types/account';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  errorMsg: string;
  showErrorMsg: boolean;
  showVerificationMsg: boolean;
  public showVerificationLink: boolean;
  public accountId: string;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.errorMsg = '';
    this.showVerificationLink = false;
    this.showVerificationMsg = false;
    this.accountId = '';

    if (this.authService.isSignedIn()) {
      this.router.navigate(['account']);
    }
  }

  /**
   * Sign in user.
   *
   * @param email
   * @param password
   *
   * @return void
   */
  signIn(email: string, password: string): void {
    if (email === '') {
      this.errorMsg = 'Please enter email';
      this.showErrorMsg = true;
    } else if (password === '') {
      this.errorMsg = 'Please enter password';
      this.showErrorMsg = true;
    } else {
      const account: Object = {
        email: email,
        password: password,
      };
      this.authService.signInAccount(account as Account)
        .subscribe(
          (res: any) => {
            this.authService.addToLocalStorage(res);
            this.router.navigate(['account']);
          },
          (err: HttpErrorResponse) => {
            if (err.error.id) {
              this.showVerificationLink = true;
              this.accountId = err.error.id;
            }
            this.errorMsg = err.error.message;
            this.showErrorMsg = true;
            console.error(err);
          }
        );
    }
  }

  resendVerificationLink(): void {
    this.authService.resendVerificationLink(this.accountId).subscribe(
      (_) => {
        this.showVerificationMsg = true;
      },
      (e: HttpErrorResponse) => {
        console.error(e);
      }
    )
  }
}
