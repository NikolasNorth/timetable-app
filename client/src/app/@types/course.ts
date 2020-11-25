import {Review} from './review';

export interface Course {
  _id: string,
  subject: string,
  code: string,
  title: string,
  classSection: string,
  startTime: string,
  endTime: string,
  days: string[],
  rating: number,
  reviews: Review[],
}
