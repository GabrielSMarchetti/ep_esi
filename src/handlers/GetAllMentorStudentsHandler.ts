import { Request, Response } from 'express';
import { StudentRepository } from '../repositories/StudentRepository';
import { IHandler } from '../interfaces/IHandler';

export class GetAllMentorStudentsHandler implements IHandler {
    private studentRepository: StudentRepository

    constructor(studentRepository: StudentRepository) {
        this.studentRepository = studentRepository;
    }

    public async handleRequest(req: Request, res: Response): Promise<void> {
        const mentor = req.params.mentor;
        const students = await this.studentRepository.findAllByMentor(mentor);
        res.status(200).json(students);
    }
}