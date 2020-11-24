import mongoose from 'mongoose';
import {Review} from './review';

const courseSchema = new mongoose.Schema({
    subject: {type: String, required: true},
    code: {type: String, required: true},
    title: {type: String, required: true},
    classSection: {type: String, required: true},
    startTime: {type: String, required: false, default: ''},
    endTime: {type: String, required: false, default: ''},
    days: {type: [String], required: false, default: []},
    rating: {type: Number, required: false},
    reviews: {type: [Review], required: false, default: []},
});

export const Course = mongoose.model('Course', courseSchema);
