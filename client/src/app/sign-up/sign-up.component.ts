import { Component, OnInit } from '@angular/core';
import {AccountService} from '../account.service';
import {Account} from '../@types/account';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
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
  createAccount(name: string, email: string, password: string, confirmPassword: string): void {
    // TODO
    const account: Object = {
      name: name,
      email: email,
      password: password,
    };
    this.accountService.createAccount(account as Account).subscribe();
  }
}
