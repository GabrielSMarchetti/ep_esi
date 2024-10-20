import { IFactory } from "../interfaces/IFactory";
import { CreateOrUpdateUserHandler } from "../handlers/CreateOrUpdateUserHandler";
import { UserRepository } from "../repositories/UserRepository";

export class CreateOrUpdateUserHandlerFactory implements IFactory<CreateOrUpdateUserHandler> {

    constructor() {}

    public create(user_repository: UserRepository): CreateOrUpdateUserHandler {
        return new CreateOrUpdateUserHandler(user_repository);
    }
}