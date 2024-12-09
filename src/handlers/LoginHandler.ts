import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/UserRepository';
import { IHandler } from '../interfaces/IHandler';


class LoginHandler implements IHandler {
    private userRepository: UserRepository;
    private jwtSecret = process.env.JWT_SECRET_KEY as string;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async handleRequest(req: Request, res: Response): Promise<void> {
        const { username, password } = req.body;

        const user = await this.userRepository.findOneByUsername(username);
        if (!user) {
            res.status(401).json({ message: 'Invalid username or password' });
            return;
        }

        const isPasswordValid = password == user.password;
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid username or password' });
            return;
        }

        const token = jwt.sign({ id: user.username, username: user.username, roles: user.roles , num_usp: user.num_usp}, this.jwtSecret , {
            expiresIn: '1h',
        });

        res.status(200).json({ token });
        
    }
}

export { LoginHandler };