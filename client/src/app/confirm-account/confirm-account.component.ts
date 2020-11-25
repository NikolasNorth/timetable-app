import { Component, OnInit } from '@angular/core';
import {AccountService} from '../account.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.scss']
})
export class ConfirmAccountComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const token: string | null = this.activatedRoute.snapshot.paramMap.get('token');
    if (token) {
      this.verifyAccount(token);
    }
  }

  verifyAccount(token: string): void {

  }
}
