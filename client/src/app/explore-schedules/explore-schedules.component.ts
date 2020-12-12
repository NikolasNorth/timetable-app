import { Component, OnInit } from '@angular/core';
import {Schedule} from '../@types/schedule';
import {ScheduleService} from '../schedule.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-explore-schedules',
  templateUrl: './explore-schedules.component.html',
  styleUrls: ['./explore-schedules.component.scss']
})
export class ExploreSchedulesComponent implements OnInit {
  public schedules: Schedule[];

  constructor(private scheduleService: ScheduleService,) { }

  ngOnInit(): void {
    this.getPublicSchedules();
  }

  getPublicSchedules(): void {
    this.scheduleService.getPublicSchedules().subscribe(
      (schedules: Schedule[]) => {
        this.schedules = schedules;
      },
      (err: HttpErrorResponse) => {
        console.error(err);
      }
    )
  }
}
