import { Component, OnInit } from '@angular/core';
import {Schedule} from '../@types/schedule';
import {ActivatedRoute, Router} from '@angular/router';
import {ScheduleService} from '../schedule.service';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.scss']
})
export class EditScheduleComponent implements OnInit {
  public schedule: Schedule;
  public visibility: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private scheduleService: ScheduleService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (!this.authService.isSignedIn()) {
      this.router.navigate(['signin']);
    } else {
      const id: string = this.activatedRoute.snapshot.paramMap.get('id');
      this.scheduleService.getSchedule(id).subscribe(
        (schedule: Schedule) => {
          this.schedule = schedule;
          this.visibility = (schedule.isPrivate ? 'private' : 'public');
        },
        (err: HttpErrorResponse) => {
          console.error(err);
        }
      )
    }
  }

  editSchedule(name: string, desc: string, visibility: string): void {
    const isPrivate: boolean = (visibility === 'private');
    const schedule: any = {
      _id: this.schedule._id,
      name: name || this.schedule.name,
      description: desc || this.schedule.description,
      isPrivate: isPrivate,
    }
    this.scheduleService.editSchedule(schedule as Schedule).subscribe(
      (newSchedule: Schedule) => this.router.navigate(['account']),
      (err: HttpErrorResponse) => console.error(err)
    )
  }
}
