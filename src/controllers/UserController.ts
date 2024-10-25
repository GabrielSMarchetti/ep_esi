import { IController } from "../interfaces/IController";
import { Request, Response } from 'express';
import { CreateOrUpdateUserHandlerFactory } from '../factories/CreateOrUpdateUserHandlerFactory';
import { UserRepository } from "../repositories/UserRepository";
import { GetUserByUsernameHandlerFactory } from '../factories/GetUserByUsernameHandlerFactory';

export class UserController implements IController {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async createOrUpdate(req: Request, res: Response): Promise<void> {
        return new CreateOrUpdateUserHandlerFactory().create(this.userRepository).handleRequest(req, res);
    }

    public async getUserByUsername(req: Request, res: Response): Promise<void> {
        return new GetUserByUsernameHandlerFactory().create(this.userRepository).handleRequest(req, res);
    }
}