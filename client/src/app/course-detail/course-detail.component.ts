import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CourseService} from '../course.service';
import {Course} from '../@types/course';
import {HttpErrorResponse} from '@angular/common/http';
import {ReviewService} from '../review.service';
import {Review} from '../@types/review';
import {AccountService} from '../account.service';
import {Account} from '../@types/account';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  public account:Account;
  public course:Course;
  public showErrorMsg:boolean;
  public showNewComment:boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
    private reviewService: ReviewService,
    private accountService: AccountService,
  ) { }

  ngOnInit(): void {
    this.showErrorMsg = false;
    this.showNewComment = false;
    const id:string = this.activatedRoute.snapshot.paramMap.get('id');
    this.courseService.getCourse(id).subscribe(
      (course:Course) => this.course = course,
      (err:HttpErrorResponse) => this.showErrorMsg = true,
    )
  }

  toggleNewComment():void {
    this.showNewComment = !this.showNewComment;
  }

  postReview(title:string, desc:string):void {
    const review:any = {
      title: title,
      description: desc,

    }
  }
}
