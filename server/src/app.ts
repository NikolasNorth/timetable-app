import express, {Application, Request, Response, NextFunction} from 'express';
import mongoose from 'mongoose';
import {Config} from './etc/config';
import bodyParser from 'body-parser';

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

// Extract JSON data from body of requests
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Prevent CORS errors
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
        return res.status(200).json({});
    }
    next();
});
