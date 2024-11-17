import { Request, Response } from 'express';
import { ReportRepository } from '../repositories/ReportRepository';
import { IHandler } from '../interfaces/IHandler';

export class GetAllReportsByStudentHandler implements IHandler {
    private reportRepository: ReportRepository

    constructor(reportRepository: ReportRepository) {
        this.reportRepository = reportRepository;
    }

    public async handleRequest(req: Request, res: Response): Promise<void> {
        const student = req.body.studentId;
        const report = await this.reportRepository.findAllByStudent(student);
        res.status(200).json(report);
    }
}