import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.scss']
})
export class ConfirmAccountComponent implements OnInit {
  showVerificationMsg: boolean;

  constructor(
    private authService: AuthService,
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
    this.authService.confirmAccount(token)
      .subscribe((res: any) => {
        if (res.success) this.showVerificationMsg = true;
      });
  }
}
