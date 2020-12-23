import mongoose from 'mongoose';

export interface IReview extends mongoose.Document {
    title: string,
    description: string,
    authorId: string,
    dateOfPublish: number,
    isVisible: boolean,
    courseId: string,
}

const reviewSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    authorId: {type: String, required: true},
    dateOfPublish: {type: Number, required: true},
    isVisible: {type: Boolean, required: true},
    courseId: {type: String, required: true},
});

export const Review = mongoose.model<IReview>('Review', reviewSchema);
