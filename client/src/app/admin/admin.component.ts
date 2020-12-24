import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {AccountService} from '../account.service';
import {Account} from '../@types/account';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public account: Account;

  constructor(
    private authService: AuthService,
    private accountService: AccountService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.accountService.getAccount(this.authService.getId()).subscribe(
      (account: Account) => {
        console.log(account);
        if (!this.authService.isSignedIn()) {
          this.router.navigate(['signin']);
        } else if (!account.isAdmin) {
          this.router.navigate(['account']);
        } else {
          this.account = account;
        }
      },
      (e: HttpErrorResponse) => console.error(e)
    );
  }
}
