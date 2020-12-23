export interface Review {
  _id: string,
  title: string,
  description: string,
  authorId: string,
  dateOfPublish: number,
  isVisible: boolean,
  courseId: string,
}
