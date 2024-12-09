import { IController } from "../interfaces/IController";
import { Request, Response } from 'express';
import { StudentRepository } from "../repositories/StudentRepository";
import { HandlerFactory } from "../factories/HandlerFactory";
import { CreateStudentHandler } from "../handlers/CreateStudentHandler";
import { UpdateStudentHandler } from "../handlers/UpdateStudentHandler";
import { GetAllMentorStudentsHandler } from "../handlers/GetAllMentorStudentsHandler";

export class StudentController implements IController {
    private _studentRepository: StudentRepository;
    private _handlerFactory: HandlerFactory<StudentRepository>;

    constructor(studentRepository: StudentRepository) {
        this._studentRepository = studentRepository;
        this._handlerFactory = new HandlerFactory(this._studentRepository);
    }

    public async create(req: Request, res: Response): Promise<void> {
        return this._handlerFactory.create(CreateStudentHandler).handleRequest(req, res);
    }

    public async update(req: Request, res: Response): Promise<any> {
        return this._handlerFactory.create(UpdateStudentHandler).handleRequest(req, res);
    }

    public async getByMentor(req: Request, res: Response): Promise<void> {
        return this._handlerFactory.create(GetAllMentorStudentsHandler).handleRequest(req, res);
    }

    public async getAllStudents(req: Request, res: Response): Promise<void> {
        const students = await this._studentRepository.find();
        res.json(students);
    }
}