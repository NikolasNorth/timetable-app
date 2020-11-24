import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor() { }

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
  }
}
