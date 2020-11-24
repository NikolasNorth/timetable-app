import mongoose from 'mongoose';
import {Course} from './course';

const scheduleSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    isPublic: {type: Boolean, required: true},
    lastModified: {type: Date, required: true},
    authorId: {type: String, required: true},
    size: {type: Number, required: false, default: 0},
    courses: {type: [Course], required: false, default: []},
});

export const Schedule = mongoose.model('Schedule', scheduleSchema);
