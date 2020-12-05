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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.showErrorMsg = !this.authService.isLoggedIn();
  }
}
