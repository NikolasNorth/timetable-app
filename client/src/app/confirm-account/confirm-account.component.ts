import { Component, OnInit } from '@angular/core';
import {AccountService} from '../account.service';
import {ActivatedRoute} from '@angular/router';
import {Account} from '../@types/account';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.scss']
})
export class ConfirmAccountComponent implements OnInit {
  showVerificationMsg: boolean;

  constructor(
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.showVerificationMsg = false;
    const token: string | null = this.activatedRoute.snapshot.paramMap.get('token');
    if (token) {
      this.confirmAccount(token);
    }
  }

  confirmAccount(token: string): void {
    this.accountService.confirmAccount(token)
      .subscribe((res: any) => {
        if (res.success) {
          this.showVerificationMsg = true;
        }
      });
  }
}
