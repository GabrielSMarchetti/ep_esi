import { LoginHandler } from "../handlers/LoginHandler";
import { IFactory } from "../interfaces/IFactory";
import { UserRepository } from "../repositories/UserRepository";

export class LoginHandlerFactory implements IFactory<LoginHandler> {

    constructor() {}

    create(userRepository: UserRepository): LoginHandler {
        return new LoginHandler(userRepository);
    }
}