import { Request, Response } from 'express';
import { ReportRepository } from '../repositories/ReportRepository';
import { IHandler } from '../interfaces/IHandler';

export class GetAllReportsByStudentHandler implements IHandler {
    private reportRepository: ReportRepository

    constructor(reportRepository: ReportRepository) {
        this.reportRepository = reportRepository;
    }

    public async handleRequest(req: Request, res: Response): Promise<void> {
        if (!req.query.num_usp) {
            res.status(400).json({ error: 'Invalid num_usp' });
            return;
        }
        const report = await this.reportRepository.findAllByStudent(req.query.num_usp.toString());
        res.status(200).json(report);
    }
}