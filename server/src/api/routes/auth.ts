import {Router, Request, Response} from 'express';
import {Account, IAccount} from '../models/account';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {Config} from '../../etc/config';
import * as utils from '../../lib/utils';
import {authenticate} from 'passport';

export const router = Router();

/**
 * POST /v1/auth/signup
 *
 * Create a new user account.
 */
router.post('/signup', async (req: Request, res: Response) => {
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
                isActive: false,
                numSchedules: 0,
                schedules: [],
            });
            newAccount = await newAccount.save();
            utils.sendConfirmationEmail(newAccount);
            res.status(202).json({
                _id: newAccount._id,
                _isConfirmed: false,
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

/**
 * GET /v1/auth/confirm/:token
 *
 * Verifies a user jwt token and confirms the account if it is valid.
 */
router.get('/confirm/:token', async (req: Request, res: Response) => {
    const token: string | null = req.params.token;
    try {
        const payload: any = jwt.verify(token, Config.jwt.PUBLIC_KEY);
        const account: IAccount | null = await Account.findById(payload.sub).exec();
        if (!account) {
            res.status(404).json({
                success: false,
                message: 'Account does not exist.',
            });
        } else if (payload.exp < Date.now()) {
            res.status(401).json({
                success: false,
                message: 'JSON Web Token has expired.',
            });
        } else {
            account.isConfirmed = true;
            account.isActive = true;
            await account.save();
            res.status(200).json({success: true});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

/**
 * POST /v1/accounts/find
 *
 * Find a user account.
 */
router.post('/signin', async (req: Request, res: Response) => {
    const email: string = req.body.email;
    const password: string = req.body.password;
    try {
        const account: IAccount | null = await Account.findOne({email: email}).exec();
        if (!account) {
            res.status(401).json({
                success: false,
                message: `Invalid email, password, or account has not been confirmed.`,
            });
        } else {
            const isValidPassword: boolean = await bcrypt.compare(password, account.password);
            if (!isValidPassword) {
                res.status(401).json({
                    success: false,
                    message: `Invalid email, password, or account has not been confirmed.`,
                });
            } else if (!account.isConfirmed) {
                res.status(401).json({
                    success: false,
                    message: `Invalid email, password, or account has not been confirmed.`,
                });
            } else if (!account.isActive) {
                res.status(401).json({
                    success: false,
                    message: `Account has been deactivated.`,
                })
            } else {
                const token: string = utils.issueJwt(account);
                res.status(200).json({
                    success: true,
                    token: token,
                    exp: utils.getJwtExpiration(token),
                });
            }
        }
    } catch (err) {
        console.error(err)
        res.status(500).json(err);
    }
});

/** Redirect user to sign in via Google */
router.get('/signin/google', authenticate('google', {scope: ['profile', 'email']}));

/** Redirect user after they signed in via Google */
router.get('/signin/google/redirect', authenticate('google', {
        failureRedirect: '/signin',
        session: false
    }),
    (req: Request, res: Response) => {
        const account: any = req.user;
        const token: string = utils.issueJwt(account);
        res.status(200).json({
            success: true,
            token: token,
            exp: utils.getJwtExpiration(token),
        });
    });

/** Generic protected route for testing */
router.get('/protected', authenticate('jwt', {session: false}),
    (req: Request, res: Response) => {
        res.status(200).json({
            success: true,
            message: 'Welcome!',
        });
    });

router.post('/request-password-reset', async (req: Request, res: Response) => {
    const email: string = req.body.email;
    const account: IAccount | null = await Account.findOne({email: email}).exec();
    if (!account) {
        res.status(404).json({
            success: false,
            message: 'There is no account associated with this email.',
        });
    } else {
        utils.sendPasswordResetEmail(account);
        res.status(202).json({
            success: true,
            message: 'Check email for a link to reset password.',
        });
    }
});

router.post('/password-reset', async (req: Request, res: Response) => {
    const id: string = req.body.sub;
    const token: string = req.body.token;
    try {
        let account: IAccount | null = await Account.findById(id).exec();
        if (!account) {
            res.status(404).json({
                success: false,
                message: 'Account does not exist.',
            });
        } else {
            const payload: any = jwt.verify(token, account.password);
            account = await Account.findById(payload.sub).exec();
            if (!account) {
                res.status(404).json({
                    success: false,
                    message: 'Account does not exist.',
                });
            } else {
                account.password = await bcrypt.hash(req.body.password, 10);
                await account.save();
                res.status(200).json({
                    sub: account._id,
                    success: true,
                    message: 'Password reset successfully.',
                });
            }
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
        });
    }
});
