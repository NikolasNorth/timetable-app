import { Component, OnInit } from '@angular/core';
import {AccountService} from '../account.service';
import {Account} from '../@types/account';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  errorMsg: string;
  showErrorMsg: boolean;

  constructor(private accountService: AccountService) { }

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
    this.accountService.signInAccount(account as Account)
      .subscribe(
        (account: Account) => {
          // TODO: Login successful
        },
        (err: HttpErrorResponse) => {
          this.errorMsg = err.error.message;
          this.showErrorMsg = true;
          console.error(err);
        }
      );
  }
}
