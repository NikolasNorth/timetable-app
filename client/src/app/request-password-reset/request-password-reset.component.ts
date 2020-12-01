import { Component, OnInit } from '@angular/core';
import {Account} from '../@types/account';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-request-password-reset',
  templateUrl: './request-password-reset.component.html',
  styleUrls: ['./request-password-reset.component.scss']
})
export class RequestPasswordResetComponent implements OnInit {
  showMsg: boolean;
  msg: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.showMsg = false;
    this.msg = '';
  }

  requestPasswordReset(email: string): void {
    const account: any = {email: email};
    this.authService.requestPasswordReset(account as Account).subscribe(
      (res: any) => {
        if (res.success) {
          this.msg = res.message;
          this.showMsg = true;
        }
      },
      (err: HttpErrorResponse) => {
        this.msg = err.error.message;
        this.showMsg = true;
      }
    )
  }
}
