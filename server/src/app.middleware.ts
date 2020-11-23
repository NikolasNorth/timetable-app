import {Request, Response, NextFunction} from 'express';

/** Log incoming requests */
export const requestLogger = (
    req: Request, res: Response, next: NextFunction
): void => {
    console.info(`${req.method} ${req.originalUrl}`);
    const start: number = new Date().getTime();
    res.on('finish', () => {
        const elapsed: number = new Date().getTime() - start;
        console.info(
            req.method, req.originalUrl, res.statusCode, `${elapsed}ms`
        );
    });
    next();
};

/** Prevent CORS errors. */
export const preventCorsErrors = (
    req: Request, res: Response, next: NextFunction
): Response | void => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'GET, POST, DELETE'
        );
        return res.status(200).json({});
    }
    next();
};
