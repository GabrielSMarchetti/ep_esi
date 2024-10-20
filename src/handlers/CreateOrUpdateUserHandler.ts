import { Request, Response } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import { IHandler } from '../interfaces/IHandler';

export class CreateOrUpdateUserHandler implements IHandler {
    private user_repository: UserRepository

    constructor(user_repository: UserRepository) {
        this.user_repository = user_repository;
    }

    public async handleRequest(req: Request, res: Response): Promise<void> {
        const userData = req.body;
        const user = await this.user_repository.createOrUpdate(userData);
        res.status(200).json(user);
    }
}