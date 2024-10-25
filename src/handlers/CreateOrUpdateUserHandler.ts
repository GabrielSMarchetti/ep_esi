import { Request, Response } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import { IHandler } from '../interfaces/IHandler';
import bcrypt from 'bcrypt';
import { validateUserType } from '../enums/UserTypes';

export class CreateOrUpdateUserHandler implements IHandler {
    private userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async handleRequest(req: Request, res: Response): Promise<void> {
        const userData = req.body;        
        if (!validateUserType(userData.user_type)) {
            res.status(400).json({ error: 'Invalid usertype' });
            return;
        }
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(userData.password, salt);
        userData.salt = salt;
        const user = await this.userRepository.createOrUpdate(userData);
        res.status(200).json(user);
    }
}