export interface Review {
  id: string,
  title: string,
  description: string,
  authorId: string,
  dateOfPublish: Date,
  isVisible: boolean,
  courseId: string,
}
