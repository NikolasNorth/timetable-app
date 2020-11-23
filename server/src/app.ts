import express, {Application, Request, Response} from 'express';
import mongoose from 'mongoose';
import {Config} from './etc/config';

export const app: Application = express();

const dbUrl: string = `mongodb://127.0.0.1:27017/${Config.db.name}`
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.once('open', (_) => {
    console.log('Database connected:', dbUrl);
});
mongoose.connection.on('error', (err) => {
    console.error('Database connection error:', err);
});
