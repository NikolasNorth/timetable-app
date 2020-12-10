import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Account} from '../@types/account';
import {ScheduleService} from '../schedule.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Schedule} from '../@types/schedule';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.scss']
})
export class CreateScheduleComponent implements OnInit {
  showErrorMsg: boolean;
  account: Account;
  visibility: string;

  constructor(
    private authService: AuthService,
    private scheduleService: ScheduleService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.showErrorMsg = false;
    this.visibility = 'private';
  }

  createSchedule(name: string, desc: string, visibility: string): void {
    const isPrivate: boolean = visibility === 'private';
    const schedule: any = {
      name: name,
      description: desc,
      isPrivate: isPrivate,
      authorId: this.authService.getId(),
    };
    this.scheduleService.createSchedule(schedule as Schedule).subscribe(
      (schedule) => {
        this.router.navigate(['account']);
      },
      (err: HttpErrorResponse) => {
        console.error(err);
      }
    )
  }
}
