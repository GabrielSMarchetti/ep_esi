import { IFactory } from "../interfaces/IFactory";
import { CreateOrUpdateUserHandler } from "../handlers/CreateOrUpdateUserHandler";
import { UserRepository } from "../repositories/UserRepository";

export class CreateOrUpdateUserHandlerFactory implements IFactory<CreateOrUpdateUserHandler> {

    constructor() {}

    public create(userRepository: UserRepository): CreateOrUpdateUserHandler {
        return new CreateOrUpdateUserHandler(userRepository);
    }
}