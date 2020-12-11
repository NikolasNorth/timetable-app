import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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
  subjects: string[] = ['Select Subject'];

  @Output() selectedCourse = new EventEmitter<Course>();

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.results = [];
    this.courseService.getSubjects().subscribe(
      (subjects: string[]) => {
        this.subjects = [].concat(this.subjects, subjects);
      },
      (err: HttpErrorResponse) => {
        console.error(err);
      }
    );
  }

  searchCourses(title: string, subject: string, code: string, component: string): void {
    title = title.replace(/\s/g, '+');
    if (subject === 'Select Subject') subject = undefined;
    this.courseService.searchCourses(title, subject, code, component).subscribe(
      (courses: Course[]) => {
        if (courses) this.results = courses;
      },
      (err: HttpErrorResponse) => {
        console.error(err);
      }
    );
  }

  selectCourse(course: Course): void {
    this.selectedCourse.emit(course);
    this.results = this.results.filter((c) => c._id !== course._id);
  }
}
