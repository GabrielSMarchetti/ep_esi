import { LoginHandler } from "../handlers/login_handler";
import { IFactory } from "../interfaces/Ifactory";
import { UserRepository } from "../repositories/user_repository";

export class LoginHandlerFactory implements IFactory {
    create(user_repository: UserRepository): LoginHandler{
        return new LoginHandler(user_repository);
    }
}