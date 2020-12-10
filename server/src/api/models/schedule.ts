import mongoose from 'mongoose';
import {ICourse} from './course';

export interface ISchedule extends mongoose.Document {
    name: string,
    description: string,
    isPrivate: boolean,
    lastModified: number,
    authorId: string,
    size?: number,
    courses?: ICourse[],
}

const scheduleSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    isPrivate: {type: Boolean, required: true},
    lastModified: {type: Number, required: true},
    authorId: {type: String, required: true},
    size: {type: Number, required: false, default: 0},
    courses: {type: Array, required: false, default: []},
});

export const Schedule = mongoose.model<ISchedule>('Schedule', scheduleSchema);
