import { Component, OnInit } from '@angular/core';
import {AccountService} from '../account.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Account} from '../@types/account';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

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
    private router: Router,
    ) { }

  ngOnInit(): void {
    const id: string | null = this.authService.getId();
    if (!this.authService.isSignedIn()) {
      this.router.navigate(['signin']);
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
