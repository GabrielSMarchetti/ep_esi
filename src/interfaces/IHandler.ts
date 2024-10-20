import { Request, Response } from 'express';

export interface IHandler {

    handleRequest(req: Request, res: Response): Promise<void>;

}
