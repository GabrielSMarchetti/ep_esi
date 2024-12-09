import { Request, Response } from 'express';
import { ReportRepository } from '../repositories/ReportRepository';
import { IHandler } from '../interfaces/IHandler';
import { ReportDto } from '../dtos/ReportDto';

export class UpdateReportHandler implements IHandler {
    private _ReportRepository: ReportRepository;

    constructor(reportRepository: ReportRepository) {
        this._ReportRepository = reportRepository;
    }

    public async handleRequest(req: Request, res: Response): Promise<void> {
        const reportDto: ReportDto = req.body;
        const username: string | undefined = req.decodedJwt?.username;
        if (!username) {
            res.status(404).send();
            return;
        }
        
        let report = await this._ReportRepository.findLatestByNumeroUSP(username);
        if (!report) {
            res.status(404).send();
            return;
        }
        
        this._ReportRepository.update(username, reportDto);
        res.status(200).send();
    }
}