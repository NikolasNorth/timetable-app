import express, {Application} from 'express';
import mongoose from 'mongoose';
import {Config} from './etc/config';
import bodyParser from 'body-parser';
import {requestLogger, preventCorsErrors} from "./app.middleware";

export const app: Application = express();

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

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(preventCorsErrors);
app.use(requestLogger);
