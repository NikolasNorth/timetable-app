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
}
