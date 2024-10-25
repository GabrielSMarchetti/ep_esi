import { Request, Response } from 'express';
import { ReportRepository } from '../repositories/ReportRepository';
import { IHandler } from '../interfaces/IHandler';

export class UpdateReportCoordinatorAvaliationHandler implements IHandler {
    private _ReportRepository: ReportRepository;

    constructor(reportRepository: ReportRepository) {
        this._ReportRepository = reportRepository;
    }

    public async handleRequest(req: Request, res: Response): Promise<void> {
        const studentUsername = req.body.studentId;
        const coordinatorOpinion = req.body.coordinatorOpinion;
        const coordinatorComment = req.body.coordinatorComment;
        const report = await this._ReportRepository.findLatestByNumeroUSP(studentUsername);
        if (!report) {
            res.status(404).send();
            return;
        }
        report.coordenadorParecer = coordinatorOpinion;
        report.coordenadorComentario = coordinatorComment;
        this._ReportRepository.create((report));
        res.status(200).send();
    }
}