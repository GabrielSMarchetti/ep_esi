import { Request, Response } from 'express';
import { IController } from '../interfaces/IController';
import { UserRepository } from '../repositories/UserRepository';
import { HandlerFactory } from '../factories/HandlerFactory';
import { LoginHandler } from '../handlers/LoginHandler';

export class LoginController implements IController {
    private userRepository: UserRepository;
    private handlerFactory: HandlerFactory<UserRepository>;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
        this.handlerFactory = new HandlerFactory(this.userRepository);
    }

    public async create(req: Request, res: Response): Promise<void> {
        return this.handlerFactory.create(LoginHandler).handleRequest(req, res);
    }
}
