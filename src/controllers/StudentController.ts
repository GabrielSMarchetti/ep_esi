import { IController } from "../interfaces/IController";
import { Request, Response } from 'express';
import { StudentRepository } from "../repositories/StudentRepository";
import { CreateOrUpdateStudentHandlerFactory } from "../factories/CreateOrUpdateStudentHandlerFactory";

export class StudentController implements IController {
    private _studentRepository: StudentRepository;

    constructor(studentRepository: StudentRepository) {
        this._studentRepository = studentRepository;
    }

    public async createOrUpdate(req: Request, res: Response): Promise<void> {
        return new CreateOrUpdateStudentHandlerFactory().create(this._studentRepository).handleRequest(req, res);
    }

}