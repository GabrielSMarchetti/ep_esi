import { Request, Response } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import { IHandler } from '../interfaces/IHandler';

export class UpdateUserHandler implements IHandler {
    private UserRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.UserRepository = userRepository;
    }

    public async handleRequest(req: Request, res: Response): Promise<void> {
        const userData = req.body;        
        const user = await this.UserRepository.findOneByUsername(userData.username);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        await this.UserRepository.update(user.username, userData);
        res.status(200).json(await this.UserRepository.findOneByUsername(userData.username));
    }
}