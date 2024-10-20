import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error', error: err.message , status: 500 });
}

export function asyncErrorHandler(fn: Function) {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}