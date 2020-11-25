import { Component, OnInit } from '@angular/core';
import {AccountService} from '../account.service';
import {Account} from '../@types/account';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
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
    this.accountService.findAccount(account as Account).subscribe();
  }
}
