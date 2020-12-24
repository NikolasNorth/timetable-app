import {Router, Request, Response} from 'express';
import {authenticate} from 'passport';
import {Account, IAccount} from '../models/account';

export const router = Router();

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
