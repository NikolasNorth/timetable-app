import {Router, Request, Response} from 'express';
import {ISchedule, Schedule} from '../models/schedule';
import {Account, IAccount} from '../models/account';
import {ICourse} from '../models/course';
import {authenticate} from 'passport';

export const router = Router();

/** GET /v1/schedules */
router.get('/', async (req: Request, res: Response) => {
   try {
       const schedules: ISchedule[] = await Schedule.find({isPrivate: false})
           .sort({lastModified: 'desc'}).limit(10).exec();
       res.status(200).json(schedules);
   } catch (err) {
       console.error(err);
       res.status(500).json(err);
   }
});

/** GET /v1/schedules/:id */
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const id: string | null = req.params.id;
        const schedule: ISchedule | null = await Schedule.findById(id).exec();
        if (schedule) {
            res.status(200).json(schedule);
        } else {
            res.status(404).json({
                message: 'Schedule does not exist.'
            });
        }
    } catch (e) {
        res.status(500).json(e);
    }
})

/** POST /v1/schedules */
router.post('/', async (req: Request, res: Response) => {
    try {
        const account: IAccount | null = await Account.findById(req.body.authorId);
        if (!account) {
            res.status(404).json({
                message: `Account with ID '${req.body.authorId}' does not exist.`
            });
        } else {
            const isNameExists: ISchedule | undefined = account.schedules.find(
                s => s.name === req.body.name
            );
            if (isNameExists) {
                res.status(400).json({
                    message: `Schedule name '${req.body.name}' already exists.`
                });
            } else if (account.schedules.length > 20) {
                res.status(400).json({
                   message: 'Account cannot exceed 20 schedules.',
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
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

/** POST /v1/schedules/:id */
router.post('/:id', (req: Request, res: Response) => {
    try {
        //
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
})

/** DELETE /v1/schedules/:id */
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id: string | null = req.params.id;
        const schedule: ISchedule | null = await Schedule.findByIdAndDelete(id).exec();
        if (!schedule) {
            res.status(404).json({message: 'Schedule does not exist.'});
        } else {
            const account: IAccount | null = await Account.findById(schedule.authorId).exec();
            if (account) {
                account.schedules = account.schedules.filter((s: ISchedule) => {
                    if (s._id.toString() === schedule._id.toString()) {
                        account.numSchedules--;
                    }
                    return s._id.toString() !== schedule._id.toString();
                });
                await account.save();
            }
            res.status(204).json();
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});
