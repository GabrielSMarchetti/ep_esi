import { Request, Response } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import { IHandler } from '../interfaces/IHandler';

export class GetUserByUsernameHandler implements IHandler {
    private userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async handleRequest(req: Request, res: Response): Promise<void> {
        const username = req.body.username;
        if (!username) {
            const allUsers = await this.userRepository.find();
            res.status(200).json(allUsers);
            return;
        }
        const user = await this.userRepository.findOneBy(username);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    }
}