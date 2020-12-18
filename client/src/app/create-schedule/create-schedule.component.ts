import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Account} from '../@types/account';
import {ScheduleService} from '../schedule.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Schedule} from '../@types/schedule';
import {Router} from '@angular/router';
import {Course} from '../@types/course';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.scss']
})
export class CreateScheduleComponent implements OnInit {
  showErrorMsg: boolean;
  errorMsg: string;
  account: Account;
  visibility: string;
  showCourseSearch: boolean;
  schedule: Course[] = [];
  course: Course;

  constructor(
    private authService: AuthService,
    private scheduleService: ScheduleService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.errorMsg = '';
    this.showErrorMsg = false;
    if (!this.authService.isSignedIn()) {
      this.router.navigate(['signin']);
    } else {
      this.showErrorMsg = false;
      this.showCourseSearch = false;
      this.visibility = 'private';
    }
  }

  /** Creates a new schedule. */
  createSchedule(name: string, desc: string, visibility: string): void {
    const isPrivate: boolean = visibility === 'private';
    const schedule: any = {
      name: name,
      description: desc,
      isPrivate: isPrivate,
      authorId: this.authService.getId(),
      courses: this.schedule,
    };
    this.scheduleService.createSchedule(schedule as Schedule).subscribe(
      (schedule: Schedule) => {
        this.router.navigate(['account']);
      },
      (err: HttpErrorResponse) => {
        console.error(err);
        this.errorMsg = err.error.message;
        this.showErrorMsg = true;
      }
    )
  }

  /** Toggles visibility of ExploreCourses component. */
  toggleShowCourseSearch(): void {
    this.showCourseSearch = !this.showCourseSearch;
  }

  /** Adds a course to the schedule (if it has not been added already). */
  addCourseToSchedule($event: Course): void {
    for (let i = 0; i < this.schedule.length; i++) {
      if (this.schedule[i]._id === $event._id) return;
    }
    this.schedule.push($event);
  }

  /** Removes a course from from the schedule builder. */
  removeCourse(course): void {
    this.schedule = this.schedule.filter((c: Course) => c._id !== course._id);
  }
}
