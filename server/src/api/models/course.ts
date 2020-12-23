import mongoose from 'mongoose';
import {IReview} from './review';

export interface ICourse extends mongoose.Document {
    subject: string,
    code: string,
    title: string,
    component: string,
    classSection: string,
    startTime?: string,
    endTime?: string,
    days?: string[],
    rating?: number,
    reviews: IReview[],
}

const courseSchema = new mongoose.Schema({
    subject: {type: String, required: true},
    code: {type: String, required: true},
    title: {type: String, required: true},
    component: {type: String, required: true},
    classSection: {type: String, required: true},
    startTime: {type: String, required: false, default: ''},
    endTime: {type: String, required: false, default: ''},
    days: {type: Array, required: false, default: []},
    rating: {type: Number, required: false},
    reviews: {type: Array, required: false, default: []},
});

export const Course = mongoose.model<ICourse>('Course', courseSchema);
