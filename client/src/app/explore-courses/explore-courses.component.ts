import { Component, OnInit } from '@angular/core';
import {Course} from '../@types/course';
import {CourseService} from '../course.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-explore-courses',
  templateUrl: './explore-courses.component.html',
  styleUrls: ['./explore-courses.component.scss']
})
export class ExploreCoursesComponent implements OnInit {
  results: Course[];

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.results = [];
  }

  searchCourses(title: string, subject: string, code: string, component: string): void {
    title = title.replace(/\s/g, '+');
    this.courseService.searchCourses(title, subject, code, component).subscribe(
      (courses: Course[]) => {
        if (courses) this.results = courses;
      },
      (err: HttpErrorResponse) => {
        console.error(err);
      }
    );
  }
}
