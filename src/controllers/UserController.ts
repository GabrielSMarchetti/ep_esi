import { IController } from "../interfaces/IController";
import { Request, Response } from 'express';
import { UserRepository } from "../repositories/UserRepository";
import { HandlerFactory } from "../factories/HandlerFactory";
import { CreateUserHandler } from "../handlers/CreateUserHandler";
import { UpdateUserHandler } from "../handlers/UpdateUserHandler";
import { GetUserByUsernameHandler } from "../handlers/GetUserByUsernameHandler";
import { GetAllMentorsHandler } from "../handlers/GetAllMentorsHandler";

export class UserController implements IController {
    private userRepository: UserRepository;
    private handlerFactory: HandlerFactory<UserRepository>;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
        this.handlerFactory = new HandlerFactory(this.userRepository);
    }

    public async create(req: Request, res: Response): Promise<void> {
        return this.handlerFactory.create(CreateUserHandler).handleRequest(req, res);
    }

    public async update(req: Request, res: Response): Promise<void> {
        return this.handlerFactory.create(UpdateUserHandler).handleRequest(req, res);
    }

    public async getUserByUsername(req: Request, res: Response): Promise<void> {
        return this.handlerFactory.create(GetUserByUsernameHandler).handleRequest(req, res);
    }

    public async getAllUsers(req: Request, res: Response): Promise<void> {
        const users = await this.userRepository.find();
        res.json(users);
    }

    public async getAllMentors(req: Request, res: Response): Promise<void> {
        return this.handlerFactory.create(GetAllMentorsHandler).handleRequest(req, res);
    }
}