import { IFactory } from "../interfaces/IFactory";
import { CreateOrUpdateStudentHandler } from "../handlers/CreateOrUpdateStudentHandler";
import { StudentRepository } from "../repositories/StudentRepository";

export class CreateOrUpdateStudentHandlerFactory implements IFactory<CreateOrUpdateStudentHandler> {

    constructor() {}

    public create(studentRepository: StudentRepository): CreateOrUpdateStudentHandler {
        return new CreateOrUpdateStudentHandler(studentRepository);
    }
}