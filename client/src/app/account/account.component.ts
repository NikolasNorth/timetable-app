import { Component, OnInit } from '@angular/core';
import {AccountService} from '../account.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  showErrorMsg: boolean
  showMsg: boolean;
  msg: string;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.showErrorMsg = false;
    this.showMsg = false;
    this.accountService.accessProtectedRoute().subscribe(
      (res: any) => {
        if (res.success) {
          this.showMsg = true;
          this.msg = res.message;
        }
      },
      (err: HttpErrorResponse) => {
        this.showErrorMsg = true;
      }
    )
  }
}
