import { Request, Response } from 'express';
import { StudentRepository } from '../repositories/StudentRepository';
import { IHandler } from '../interfaces/IHandler';
import { validateCourseType } from '../enums/CourseTypes';

export class CreateStudentHandler implements IHandler {
    private StudentRepository: StudentRepository

    constructor(studentRepository: StudentRepository) {
        this.StudentRepository = studentRepository;
    }

    public async handleRequest(req: Request, res: Response): Promise<void> {
        const studentData = req.body;        
        if (!validateCourseType(studentData.curso)) {
            res.status(400).json({ error: 'Invalid curso' });
            return;
        }
        const studentExists = await this.StudentRepository.findBy({ num_usp: studentData.num_usp });
        if (studentExists && studentExists.length > 0) {
            res.status(409).json({ error: 'Student already exists' });
            return;
        }
        const student = await this.StudentRepository.save(studentData);
        res.status(200).json(student);
    }
}