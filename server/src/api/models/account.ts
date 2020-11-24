import mongoose from 'mongoose';
import {Schedule} from './schedule';

const accountSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, required: true, default: false},
    isActive: {type: Boolean, required: true, default: true},
    numSchedules: {type: Number, required: false, default: 0},
    schedules: {type: [Schedule], required: false, default: []},
});

export const Account = mongoose.model('Account', accountSchema);
