import { IController } from "../interfaces/IController";
import { Request, Response } from 'express';
import { CreateOrUpdateUserHandlerFactory } from '../factories/CreateOrUpdateUserHandlerFactory';
import { UserRepository } from "../repositories/UserRepository";

export class UserController implements IController {
    private user_repository: UserRepository;

    constructor(user_repository: UserRepository) {
        this.user_repository = user_repository;
    }

    public async post(req: Request, res: Response): Promise<void> {
        return new CreateOrUpdateUserHandlerFactory().create(this.user_repository).handleRequest(req, res);
    }
}