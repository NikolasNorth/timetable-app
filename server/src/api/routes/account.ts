import {Router, Request, Response} from 'express';
import {authenticate} from 'passport';
import {Account, IAccount} from '../models/account';

export const router = Router();


router.get('/', authenticate('jwt', {session: false}), async (req: Request, res: Response) => {
    try {
        const accounts: IAccount[] = await Account.find({}).exec();
        res.status(200).json(accounts);
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

router.get('/:id', authenticate('jwt', {session: false}), async (req: Request, res: Response) => {
    const id: string | null = req.params.id;
    try {
        const account: IAccount | null = await Account.findById(id).exec();
        if (!account) {
            res.status(404).json({
                message: 'Account does not exist.',
            });
        } else {
            res.status(200).json({
                _id: account._id,
                name: account.name,
                email: account.email,
                isAdmin: account.isAdmin,
                numSchedules: account.numSchedules,
                schedules: account.schedules,
            });
        }
    } catch (err) {
        res.status(500).json({
            message: 'Internal server error.',
        });
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const query: any = {};
        if (req.body.name) query.name = {
            $regex: req.body.name,
            $options: 'i'
        }
        if (req.body.email) query.email = req.body.email;
        const results: IAccount[] = await Account.find(query).exec();
        res.status(200).json(results);
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
})

router.post('/:id', async (req: Request, res: Response) => {
    const id: string | null = req.params.id;
    try {
        let account: IAccount | null = await Account.findById(id).exec();
        if (!account) {
            res.status(404).json({
                message: 'Account does not exist.',
            });
        } else {
            if (req.body.isAdmin !== undefined) account.isAdmin = req.body.isAdmin;
            if (req.body.isActive !== undefined) account.isActive = req.body.isActive;
            account = await account.save();
            res.status(201).json({
                _id: account._id,
                name: account.name,
                email: account.email,
                isActive: account.isActive,
                isAdmin: account.isAdmin,
                numSchedules: account.numSchedules,
                schedules: account.schedules,
            });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
})
