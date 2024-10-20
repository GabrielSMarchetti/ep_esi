import { Request, Response } from 'express';
import { LoginHandlerFactory } from '../factories/LoginHandlerFactory';
import { IController } from '../interfaces/IController';
import { UserRepository } from '../repositories/UserRepository';

export class LoginController implements IController {
    private static userRepository: UserRepository;
    public static async post(req: Request, res: Response): Promise<void> {
        return new LoginHandlerFactory().create(this.userRepository).handleRequest(req, res);
    }
}
