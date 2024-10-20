import { Request, Response } from "express";

export interface IController {
    get?(req: Request, res: Response): Promise<any>;
    post?(req: Request, res: Response): Promise<any>;
    put?(req: Request, res: Response): Promise<any>;
    delete?(req: Request, res: Response): Promise<any>;
}