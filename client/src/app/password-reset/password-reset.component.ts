import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AccountService} from '../account.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const token: string | null = this.activatedRoute.snapshot.paramMap.get('token');
    if (token) {
      this.resetPassword(token);
    }
  }

  resetPassword(token: string): void {
    this.accountService.resetPassword(token).subscribe(
      (res: any) => {
        //
      },
      (err: any) => {
        //
      }
    );
  }
}
