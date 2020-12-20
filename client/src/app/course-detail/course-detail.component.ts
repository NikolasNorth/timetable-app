import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CourseService} from '../course.service';
import {Course} from '../@types/course';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  public course:Course;
  public showErrorMsg:boolean;
  public showNewComment:boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
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

  postComment(title:string, desc:string):void {
    console.log(title);
    console.log(desc);
  }
}
