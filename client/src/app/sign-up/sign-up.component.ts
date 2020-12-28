import {Component, OnInit} from '@angular/core';
import {Account} from '../@types/account';
import {AuthService} from '../auth.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  showVerificationMsg: boolean;
  public showErrorMsg;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.showVerificationMsg = false;
    this.showErrorMsg = false;
  }

  /**
   * Creates a new user account.
   *
   * @param name
   * @param email
   * @param password
   * @param confirmPassword
   *
   * @return void
   */
  signUp(name: string, email: string, password: string, confirmPassword: string): void {
    const account: Object = {
      name: name,
      email: email,
      password: password,
    };
    this.authService.signUpAccount(account as Account)
      .subscribe(
        (newAccount: Account) => {
          if (newAccount) {
            this.showVerificationMsg = true;
          }
        },
        (e: HttpErrorResponse) => {
          this.showErrorMsg = true;
        });
  }
}
