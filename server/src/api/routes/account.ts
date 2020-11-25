import {Router, Request, Response} from 'express';
import {Account, IAccount} from '../models/account';
import * as bcrypt from 'bcrypt';

export const router = Router();

/** POST /v1/accounts */
router.post('/', async (req: Request, res: Response) => {
    const name: string = req.body.name;
    const email: string = req.body.email;
    try {
        const account: IAccount | null = await Account.findOne({email: email}).exec();
        if (account) {
            res.status(409).json({
                message: `An account has already been created for ${email}.`
            });
        } else {
            const password: string = await bcrypt.hash(req.body.password, 10);
            let newAccount: IAccount = await Account.create({
                name: name,
                email: email,
                password: password,
                isConfirmed: false,
                isAdmin: false,
                isActive: true,
                numSchedules: 0,
                schedules: [],
            });
            newAccount = await newAccount.save();
            res.status(201).json(newAccount);
        }
    } catch (err) {
        console.error('Caught Error:', err);
        res.status(500).json({
            message: 'Internal server error.'
        });
    }
});
