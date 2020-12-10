import {Course} from './course';

export interface Schedule {
  _id: string,
  name: string,
  description: string,
  isPrivate: boolean,
  lastModified: Date,
  authorId: string,
  size: number,
  courses: Course[],
}
