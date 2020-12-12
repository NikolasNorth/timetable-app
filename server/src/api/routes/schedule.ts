import {Router, Request, Response} from 'express';
import {ISchedule, Schedule} from '../models/schedule';
import {Account, IAccount} from '../models/account';
import {ICourse} from '../models/course';

export const router = Router();

router.get('/', async (req: Request, res: Response) => {
   try {
       const schedules: ISchedule[] = await Schedule.find({isPrivate: false})
           .sort({lastModified: 'desc'}).exec();
       res.status(200).json(schedules);
   } catch (err) {
       console.error(err);
       res.status(500).json(err);
   }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const account: IAccount | null = await Account.findById(req.body.authorId);
        if (!account) {
            res.status(404).json({
                message: `Account with ID '${req.body.authorId}' does not exist.`
            });
        } else {
            const name: string = req.body.name;
            const desc: string = req.body.description;
            const isPrivate: boolean = req.body.isPrivate;
            const lastModified: number = Date.now();
            const authorId: string = req.body.authorId;
            const courses: ICourse[] = req.body.courses || [];
            const schedule: ISchedule = await Schedule.create({
                name: name,
                description: desc,
                isPrivate: isPrivate,
                lastModified: lastModified,
                authorId: authorId,
                courses: courses,
            });
            account.schedules.push(schedule);
            account.numSchedules++;
            await schedule.save();
            await account.save();
            res.status(201).json(schedule);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});
