import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-schedule-page',
  templateUrl: './create-schedule-page.component.html',
  styleUrls: ['./create-schedule-page.component.scss']
})
export class CreateSchedulePageComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['signin']);
    }
  }

}
