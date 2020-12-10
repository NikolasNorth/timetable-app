import {Router, Request, Response} from 'express';
import {ISchedule, Schedule} from '../models/schedule';

export const router = Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const name: string = req.body.name;
        const desc: string = req.body.description;
        const isPrivate: boolean = req.body.isPrivate;
        const lastModified: number = Date.now();
        const authorId: string = req.body.authorId;
        const schedule: ISchedule = await Schedule.create({
            name: name,
            description: desc,
            isPrivate: isPrivate,
            lastModified: lastModified,
            authorId: authorId,
        });
        await schedule.save()
        res.status(201).json(schedule);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});
