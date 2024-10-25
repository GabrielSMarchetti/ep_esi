import { IFactory } from "../interfaces/IFactory";
import { GetUserByUsernameHandler } from "../handlers/GetUserByUsernameHandler";
import { UserRepository } from "../repositories/UserRepository";

export class GetUserByUsernameHandlerFactory implements IFactory<GetUserByUsernameHandler> {

    constructor() {}

    public create(userRepository: UserRepository): GetUserByUsernameHandler {
        return new GetUserByUsernameHandler(userRepository);
    }
}