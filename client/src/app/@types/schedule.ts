import {Course} from './course';

export interface Schedule {
  id: string,
  name: string,
  description: string,
  isPublic: boolean,
  lastModified: Date,
  authorId: string,
  size: number,
  courses: Course[],
}
