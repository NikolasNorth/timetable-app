import { Component, OnInit } from '@angular/core';
import {AccountService} from '../account.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Account} from '../@types/account';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  showErrorMsg: boolean
  account: Account;

  constructor(
    private accountService: AccountService,
    private authService: AuthService,
    ) { }

  ngOnInit(): void {
    const id: string | null = localStorage.getItem('timetable-id');
    if (!id || !this.authService.isLoggedIn()) {
      this.showErrorMsg = true;
    } else {
      this.accountService.getAccount(id).subscribe(
        (res: Account) => {
          this.showErrorMsg = false;
          this.account = res;
        },
        (err: HttpErrorResponse) => {
          this.showErrorMsg = true;
        }
      )
    }
  }
}
