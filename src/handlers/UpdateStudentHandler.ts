import { Request, Response } from 'express';
import { StudentRepository } from '../repositories/StudentRepository';
import { IHandler } from '../interfaces/IHandler';
import { validateCourseType } from '../enums/CourseTypes';

export class UpdateStudentHandler implements IHandler {
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
        const student = await this.StudentRepository.findOneByNumeroUSP(studentData.num_usp);
        if (!student) {
            res.status(404).json({ message: 'Student not found' });
            return;
        }
        await this.StudentRepository.update(student.num_usp, studentData);
        res.status(200).json(await this.StudentRepository.findOneByNumeroUSP(studentData.num_usp));
    }
}