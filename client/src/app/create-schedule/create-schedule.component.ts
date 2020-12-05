import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Account} from '../@types/account';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.scss']
})
export class CreateScheduleComponent implements OnInit {
  showErrorMsg: boolean;
  account: Account;
  visibility: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.showErrorMsg = false;
    this.visibility = 'private';
  }

  createSchedule(visibility: string, name: string, desc: string): void {
    const isPrivate: boolean = visibility === 'private';
    console.log(isPrivate, name, desc);
  }
}
