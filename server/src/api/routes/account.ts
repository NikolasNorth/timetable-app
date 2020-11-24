import {Router, Request, Response} from 'express';
import {Account} from '../models/account';

export const router = Router();

router.post('/', async (req: Request, res: Response) => {
    const name: string = req.body.name;
    const email: string = req.body.email;
    const password: string = req.body.password;
    res.status(201).json({message: '200 OK.'})
});
