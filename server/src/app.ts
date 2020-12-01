import {Config} from './etc/config';
import express, {Application} from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import {requestLogger, preventCorsErrors} from "./app.middleware";
import {router as accountRouter} from './api/routes/account';
import {router as authRouter} from './api/routes/auth';
import * as nodemailer from 'nodemailer';
import passport from 'passport';
import {initializePassport} from './config/passport';

export const app: Application = express();
export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: Config.email.user,
        pass: Config.email.password,
    }
});

const dbUrl: string = `mongodb://127.0.0.1:27017/${Config.db.name}`
// const dbUrl = `mongodb+srv://${Config.db.user}:${Config.db.password}@timetable-api.xmw9o.mongodb.net/${Config.db.name}?retryWrites=true&w=majority`;
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

initializePassport(passport);
app.use(passport.initialize());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(preventCorsErrors);
app.use(requestLogger);
app.use('/v1/auth', authRouter);
app.use('/v1/accounts', accountRouter);
