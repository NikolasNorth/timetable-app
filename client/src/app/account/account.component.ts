import { Component, OnInit } from '@angular/core';
import {AccountService} from '../account.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Account} from '../@types/account';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {ScheduleService} from '../schedule.service';
import {Schedule} from '../@types/schedule';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  public showFlashMsg: boolean;
  public flashMsg: string;
  public account: Account;

  constructor(
    private accountService: AccountService,
    private authService: AuthService,
    private scheduleService: ScheduleService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.flashMsg = '';
    this.showFlashMsg = false;
    const id: string | null = this.authService.getId();
    if (this.authService.isSignedIn()) {
      this.getAccount(id);
    } else {
      this.router.navigate(['signin']);
    }
  }

  deleteSchedule(id: string): void {
    if (confirm("Are you sure you want to delete?")) {
      this.scheduleService.deleteSchedule(id).subscribe(
        (res: any) => {
          this.flashMsg = 'Schedule deleted.'
          this.showFlashMsg = true;
          this.getAccount(this.account._id);
        },
        (err: HttpErrorResponse) => {
          console.error(err);
          this.flashMsg = err.error.message;
          this.showFlashMsg = true;
        }
      )
    }
  }

  getAccount(id: string): void {
    this.accountService.getAccount(id).subscribe(
      (account: Account) => {
        this.account = account;
      },
      (err: HttpErrorResponse) => {
        console.error(err);
        this.flashMsg = err.error.message;
        this.showFlashMsg = true;
      }
    )
  }
}
