import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    subject: {type: String, required: true},
    code: {type: String, required: true},
    title: {type: String, required: true},
    classSection: {type: String, required: true},
    startTime: {type: String, required: false},
    endTime: {type: String, required: false},
    days: {type: Array, required: false},
    rating: {type: Number, required: false},
    reviews: {type: Array, required: false},
});

export const Course = mongoose.model('Course', courseSchema);
