import {Router, Request, Response} from 'express';
import {ICourse, Course} from '../models/course';

export const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const query: any = {}
        if (req.query.title) query.title = req.query.title;
        if (req.query.subject) query.subject = req.query.subject;
        if (req.query.code) query.code = req.query.code;
        if (req.query.component) query.component = req.query.component;
        const results: ICourse[] = await Course.find(query);
        res.status(200).json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});
