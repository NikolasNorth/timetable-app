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

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.showErrorMsg = false;
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
    const account: Object = {
      email: email,
      password: password,
    };
    this.authService.signInAccount(account as Account)
      .subscribe(
        (res: any) => {
          this.authService.addToLocalStorage(res);
        },
        (err: HttpErrorResponse) => {
          this.errorMsg = err.error.message;
          this.showErrorMsg = true;
          console.error(err);
        },
        () => {
          // this.router.navigate(['account']);
        }
      );
  }
}
