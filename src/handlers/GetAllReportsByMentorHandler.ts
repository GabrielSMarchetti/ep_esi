import { Request, Response } from 'express';
import { ReportRepository } from '../repositories/ReportRepository';
import { StudentRepository } from '../repositories/StudentRepository';
import { IHandler } from '../interfaces/IHandler';

export class GetAllReportsByMentorHandler implements IHandler {
    private reportRepository: ReportRepository
    private studentRepository: StudentRepository;

    constructor(reportRepository: ReportRepository, studentRepository: StudentRepository) {
        this.reportRepository = reportRepository;
        this.studentRepository = studentRepository;
    }

    public async handleRequest(req: Request, res: Response): Promise<void> {
        if (!req.decodedJwt) {
            res.status(400).json({ error: 'Invalid token' });
            return;
        }
        const mentor = req.decodedJwt.username;
        const report = await this.reportRepository.findAllByMentor(mentor, this.studentRepository);
        res.status(200).json(report);
    }
}