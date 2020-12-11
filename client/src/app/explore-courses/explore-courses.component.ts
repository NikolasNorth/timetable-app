import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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

  @Input() showAddCourseBtn: boolean;
  @Input() schedule: Course[];
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

  /** Search for courses with given arguments. */
  searchCourses(title: string, subject: string, code: string, component: string): void {
    title = title.replace(/\s/g, '+');
    if (subject === 'Select Subject') subject = undefined;
    this.courseService.searchCourses(title, subject, code, component).subscribe(
      (courses: Course[]) => {
        if (courses) {
          this.results = courses;
          this.filterCourseResults();
        }
      },
      (err: HttpErrorResponse) => {
        console.error(err);
      }
    );
  }

  /** Emits a selected course to the schedule component **/
  selectCourse(course: Course): void {
    this.selectedCourse.emit(course);
    this.filterCourseResults();
  }

  /**
   * Removes courses from search results that have already been added to the
   * schedule.
   */
  filterCourseResults(): void {
    if (this.schedule) {
      for (let i = 0; i < this.schedule.length; i++) {
        this.results = this.results.filter((c: Course) => c._id !== this.schedule[i]._id);
      }
    }
  }
}
