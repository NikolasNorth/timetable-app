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
  public accounts: Account[];
  public adminAccounts: Account[];
  public nonAdminAccounts: Account[];

  constructor(
    private authService: AuthService,
    private accountService: AccountService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.accountService.getAccount(this.authService.getId()).subscribe(
      (account: Account) => {
        if (!this.authService.isSignedIn()) {
          this.router.navigate(['signin']);
        } else if (!account.isAdmin) {
          this.router.navigate(['account']);
        } else {
          this.account = account;
          this.getAccounts();
        }
      },
      (e: HttpErrorResponse) => console.error(e)
    );
  }

  getAccounts(): void {
    this.accountService.getAccounts().subscribe(
      (accounts: Account[]) => {
        this.accounts = accounts;
        this.getAdminAccounts();
        this.getNonAdminAccounts();
      },
      (e: HttpErrorResponse) => {
        console.error(e);
      }
    )
  }

  getAdminAccounts(): void {
    this.adminAccounts = this.accounts.filter((a: Account) => a.isAdmin);
  }

  getNonAdminAccounts(): void {
    this.nonAdminAccounts = this.accounts.filter((a: Account) => !a.isAdmin);
  }

  createAdmin(id: string): void {
    this.accountService.changeAdminStatus(id, true).subscribe(
      (_) => {
        this.getAccounts();
      },
      (e: HttpErrorResponse) => {
        console.error(e);
      }
    );
  }

  removeAdmin(id: string): void {
    this.accountService.changeAdminStatus(id, false).subscribe(
      (_) => {
        this.getAccounts();
      },
      (e: HttpErrorResponse) => {
        console.error(e);
      }
    );
  }
}
