import { Request, Response } from "express";

export interface IController {
    get?(req: Request, res: Response): Promise<any>;
    create?(req: Request, res: Response): Promise<any>;
    update?(req: Request, res: Response): Promise<any>;
    delete?(req: Request, res: Response): Promise<any>;
}