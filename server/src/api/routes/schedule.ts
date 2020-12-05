import {Router, Request, Response} from 'express';

export const router = Router();

router.post('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'gtg'
    });
});
