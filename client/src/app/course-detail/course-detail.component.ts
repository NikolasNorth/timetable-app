import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CourseService} from '../course.service';
import {Course} from '../@types/course';
import {HttpErrorResponse} from '@angular/common/http';
import {ReviewService} from '../review.service';
import {Review} from '../@types/review';
import {AccountService} from '../account.service';
import {Account} from '../@types/account';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  public accountId: string;
  public course: Course;
  public showErrorMsg: boolean;
  public showNewComment: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
    private reviewService: ReviewService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.showErrorMsg = false;
    this.showNewComment = false;
    this.accountId = this.authService.getId();
    const courseId: string = this.activatedRoute.snapshot.paramMap.get('id');
    this.courseService.getCourse(courseId).subscribe(
      (course: Course) => this.course = course,
      (err: HttpErrorResponse) => this.showErrorMsg = true,
    );
  }

  toggleNewComment():void {
    this.showNewComment = !this.showNewComment;
  }

  createReview(title:string, desc:string, courseId: string): void {
    const review: any = {
      title: title,
      description: desc,
      authorId: this.accountId,
      courseId: courseId,
    };
    this.reviewService.createReview(review as Review).subscribe(
      (review: Review) => console.log(review),
      (e: HttpErrorResponse) => console.error(e)
    )
  }
}
