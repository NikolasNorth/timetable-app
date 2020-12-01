import { Component, OnInit } from '@angular/core';
import {AccountService} from '../account.service';
import {Account} from '../@types/account';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-request-password-reset',
  templateUrl: './request-password-reset.component.html',
  styleUrls: ['./request-password-reset.component.scss']
})
export class RequestPasswordResetComponent implements OnInit {
  showMsg: boolean;
  msg: string;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.showMsg = false;
    this.msg = '';
  }

  requestPasswordReset(email: string): void {
    this.showMsg = true;
    const account: any = {email: email};
    this.accountService.requestPasswordReset(account as Account).subscribe(
      (res: any) => {
        if (res.success) {
          this.msg = res.message;
        }
      },
      (err: HttpErrorResponse) => {
        this.msg = err.error.message;
      }
    )
  }
}
