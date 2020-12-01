import { Component, OnInit } from '@angular/core';
import {AccountService} from '../account.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Account} from '../@types/account';

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
    private activatedRoute: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    const id: string | null = this.activatedRoute.snapshot.paramMap.get('id');
    this.showErrorMsg = false;
    this.accountService.getAccount(id).subscribe(
      (res: Account) => {
        this.account = res;
        console.log(this.account);
      },
      (err: HttpErrorResponse) => {
        this.showErrorMsg = true;
      }
    )
  }
}
