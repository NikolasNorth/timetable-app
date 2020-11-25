import {Router, Request, Response} from 'express';
import {Account, IAccount} from '../models/account';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {Config} from '../../etc/config';
import {transporter} from '../../app';

export const router = Router();

/**
 * POST /v1/accounts/create
 *
 * Create a new user account.
 */
router.post('/create', async (req: Request, res: Response) => {
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
            jwt.sign(
                {_id: newAccount._id},
                Config.jwt.key,
                {expiresIn: '1h'},
                (err: Error | null, token: string | undefined) => {
                    const confirmUrl: string = `${Config.client.hostname}/v1/accounts/confirm/${token}`;
                    transporter.sendMail({
                        to: newAccount.email,
                        subject: 'Confirm Email',
                        html: `Confirm your email: <a href="${confirmUrl}">${confirmUrl}</a>`,
                    });
                }
            );
            res.status(201).json({
                _id: newAccount._id,
                _isConfirmed: newAccount.isConfirmed,
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});


router.get('/confirm/:token', (req: Request, res: Response) => {
    const token: string = req.params.token;
    const payload: any = jwt.verify(token, Config.jwt.key);
    res.redirect(`${Config.client.hostname}/login`, 200);
    res.status(200).json({message: '200 OK.'});
});

/**
 * POST /v1/accounts/find
 *
 * Find a user account.
 */
router.post('/find', async (req: Request, res: Response) => {
    const email: string = req.body.email;
    const password: string = req.body.password;
    try {
        const account: IAccount | null = await Account.findOne({email: email}).exec();
        if (!account) {
            res.status(401).json({
                message: `Invalid email or password for ${email}.`
            });
        } else {
            const isValidPassword: boolean = await bcrypt.compare(password, account.password);
            if (!isValidPassword) {
                res.status(401).json({
                    message: `Invalid email or password for ${email}.`
                });
            } else if (!account.isConfirmed) {
                res.status(401).json({
                    message: `Account has not been confirmed for ${email}.`
                });
            } else {
                const token: string = jwt.sign(
                    {_id: account._id, email: email},
                    Config.jwt.key,
                    {expiresIn: '1h'}
                )
                res.status(200).json(token);
            }
        }
    } catch (err) {
        console.error(err)
        res.status(500).json(err);
    }
})
