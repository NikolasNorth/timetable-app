import {Router, Request, Response} from 'express';
import {ISchedule, Schedule} from '../models/schedule';
import {Account, IAccount} from '../models/account';
import {ICourse} from '../models/course';
import {authenticate} from 'passport';

export const router = Router();

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

router.post('/', authenticate('jwt', {session: false}), async (req: Request, res: Response) => {
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
                const courses: any = req.body.courses || [];
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

router.post('/:id', authenticate('jwt', {session: false}), async (req: Request, res: Response) => {
    try {
        let schedule: ISchedule | null = await Schedule.findById(req.params.id).exec();
        if (schedule) {
            if (req.body.name) schedule.name = req.body.name;
            if (req.body.description) schedule.description = req.body.description;
            if (req.body.isPrivate) schedule.isPrivate = req.body.isPrivate;
            schedule.lastModified = Date.now();
            schedule = await schedule.save();

            let account: IAccount | null = await Account.findById(schedule.authorId).exec();
            if (account) {
                // @ts-ignore  FIXME
                account.schedules = account.schedules.map((s: ISchedule) => {
                    if (s._id.toString() === schedule?._id.toString())
                        return schedule;
                    else
                        return s;
                });
                await account.save()
                res.status(201).json(schedule);
            } else {
                res.status(404).json({
                    message: 'Accound not found',
                });
            }
        } else {
            res.status(404).json({
                message: 'Schedule not found.',
            });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

router.delete('/:id', authenticate('jwt', {session: false}), async (req: Request, res: Response) => {
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
