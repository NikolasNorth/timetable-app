import { Component, OnInit } from '@angular/core';
import {Review} from '../@types/review';
import {ReviewService} from '../review.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-manage-reviews',
  templateUrl: './manage-reviews.component.html',
  styleUrls: ['./manage-reviews.component.scss']
})
export class ManageReviewsComponent implements OnInit {
  public searchResults: Review[];

  constructor(
    private reviewService: ReviewService,
  ) { }

  ngOnInit(): void {
  }

  searchReviews(title: string, authorId: string, courseId: string): void {
    this.reviewService.searchReviews(title, authorId, courseId).subscribe(
      (reviews: Review[]) => {
        this.searchResults = reviews;
      },
      (e: HttpErrorResponse) => console.error(e)
    )
  }

  showReview(id: string): void {
    this.reviewService.changeReviewVisibility(id, true).subscribe(
      (review: Review) => {
        this.searchResults = this.searchResults.map((r: Review) => {
          if (r._id == review._id) r.isVisible = review.isVisible;
          return r;
        });
      },
      (e: HttpErrorResponse) => console.error(e)
    );
  }

  hideReview(id: string): void {
    this.reviewService.changeReviewVisibility(id, false).subscribe(
      (review: Review) => {
        this.searchResults = this.searchResults.map((r: Review) => {
          if (r._id == review._id) r.isVisible = review.isVisible;
          return r;
        });
      },
      (e: HttpErrorResponse) => console.error(e)
    );
  }
}
