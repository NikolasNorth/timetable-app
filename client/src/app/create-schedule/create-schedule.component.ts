import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Account} from '../@types/account';
import {ScheduleService} from '../schedule.service';
import {HttpErrorResponse} from '@angular/common/http';

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
    ) { }

  ngOnInit(): void {
    this.showErrorMsg = false;
    this.visibility = 'private';
  }

  createSchedule(name: string, desc: string, visibility: string): void {
    const isPrivate: boolean = visibility === 'private';
    this.scheduleService.createSchedule(name, desc, isPrivate).subscribe(
      (schedule) => {
        console.log(schedule);
      },
      (err: HttpErrorResponse) => {
        console.error(err);
      }
    )
  }
}
