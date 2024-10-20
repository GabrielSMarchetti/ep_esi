import { LoginHandler } from "../handlers/LoginHandler";
import { IFactory } from "../interfaces/IFactory";
import { UserRepository } from "../repositories/UserRepository";

export class LoginHandlerFactory implements IFactory<LoginHandler> {

    constructor() {}

    create(user_repository: UserRepository): LoginHandler {
        return new LoginHandler(user_repository);
    }
}