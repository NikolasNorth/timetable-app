import {Router, Request, Response} from 'express';
import {ICourse, Course} from '../models/course';

export const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const query: any = {}
        if (req.query.title) query.title = {
            $regex: req.query.title,
            $options: 'i',
        };
        if (req.query.subject) query.subject = {
            $regex: '^' + req.query.subject + '$',
            $options: 'i',
        };
        if (req.query.code) query.code = {
            $regex: req.query.code,
            $options: 'i',
        };
        if (req.query.component) query.component = {
            $regex: '^' + req.query.component + '$',
            $options: 'i',
        };
        const results: ICourse[] = await Course.find(query).exec();
        res.status(200).json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/subjects', async (req: Request, res: Response) => {
    try {
        const courses: string[] = await Course.find({}).distinct('subject').exec();
        res.status(200).json(courses);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});
