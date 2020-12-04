import { Component, OnInit } from '@angular/core';
import {Course} from '../@types/course';

@Component({
  selector: 'app-explore-courses',
  templateUrl: './explore-courses.component.html',
  styleUrls: ['./explore-courses.component.scss']
})
export class ExploreCoursesComponent implements OnInit {
  results: Course[];

  constructor() { }

  ngOnInit(): void {
  }

  searchCourses(title: string, subject: string, code: string, component: string): void {
    const course: Course = {
      _id: "1",
      subject: subject,
      code: code,
      title: title,
      classSection: "001",
      startTime: "12:00 PM",
      endTime: "1:00 PM",
      days: [],
      rating: 5.0,
      reviews: [],
    };
    if (!this.results) this.results = [];
    this.results.push(course);
  }
}
