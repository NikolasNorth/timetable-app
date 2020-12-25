import { Component, OnInit } from '@angular/core';
import {AccountService} from '../account.service';
import {Account} from '../@types/account';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-manage-accounts',
  templateUrl: './manage-accounts.component.html',
  styleUrls: ['./manage-accounts.component.scss']
})
export class ManageAccountsComponent implements OnInit {
  public searchResults: Account[];

  constructor(
    private accountService: AccountService,
  ) { }

  ngOnInit(): void {
  }

  searchAccounts(name: string, email: string): void {
    this.accountService.searchAccounts(name, email).subscribe(
      (accounts: Account[]) => this.searchResults = accounts,
      (e: HttpErrorResponse) => console.error(e)
    )
  }

  activateAccount(id: string): void {
    this.accountService.changeActiveStatus(id, true).subscribe(
      (account: Account) => {
        this.searchResults = this.searchResults.map((a: Account) => {
          if (a._id === account._id) a.isActive = account.isActive;
          return a;
        });
      },
      (e: HttpErrorResponse) => console.error(e)
    )
  }

  deactivateAccount(id: string): void {
    this.accountService.changeActiveStatus(id, false).subscribe(
      (account: Account) => {
        this.searchResults = this.searchResults.map((a: Account) => {
          if (a._id === account._id) a.isActive = account.isActive;
          return a;
        });
      },
      (e: HttpErrorResponse) => console.error(e)
    )
  }
}
