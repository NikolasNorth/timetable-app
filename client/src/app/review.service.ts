import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Review} from './@types/review';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private hostname: string = 'http://localhost:3000';
  private resource: string = 'v1/reviews';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(
    private httpClient: HttpClient,
  ) { }

  createReview(review: Review): Observable<Review> {
    const url: string = `${this.hostname}/${this.resource}/course/${review.courseId}`;
    return this.httpClient.post<Review>(url, review, this.httpOptions);
  }

  getReviewsByCourse(id: string): Observable<Review[]> {
    const url: string = `${this.hostname}/${this.resource}/course/${id}`;
    return this.httpClient.get<Review[]>(url);
  }

  searchReviews(title: string, authorId: string, courseId: string): Observable<Review[]> {
    const url: string = `${this.hostname}/${this.resource}`;
    const token: string = localStorage.getItem('timetable-token');
    const options = {
      headers: new HttpHeaders({'Authorization': `Bearer ${token}`})
    };
    const body: any = {
      title: title,
      authorId: authorId,
      courseId: courseId
    };
    return this.httpClient.post<Review[]>(url, body, options);
  }

  changeReviewVisibility(id: string, newIsVisible): Observable<Review> {
    const url: string = `${this.hostname}/${this.resource}/${id}`;
    const token: string = localStorage.getItem('timetable-token');
    const options = {
      headers: new HttpHeaders({'Authorization': `Bearer ${token}`})
    };
    const body: any = {
      isVisible: newIsVisible
    };
    return this.httpClient.post<Review>(url, body, options);
  }
}
