import mongoose from 'mongoose';
import {ISchedule} from './schedule';

export interface IAccount extends mongoose.Document {
    name: string,
    email: string,
    password: string,
    isConfirmed: boolean,
    isAdmin: boolean,
    isActive: boolean,
    numSchedules?: number,
    schedules?: ISchedule[],
}

const accountSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {type: String, required: true},
    isConfirmed: {type: Boolean, required: true, default: false},
    isAdmin: {type: Boolean, required: true, default: false},
    isActive: {type: Boolean, required: true, default: true},
    numSchedules: {type: Number, required: false, default: 0},
    schedules: {type: Array, required: false, default: []},
});

export const Account = mongoose.model<IAccount>('Account', accountSchema);
