import { IController } from "../interfaces/IController";
import { Request, Response } from 'express';
import { ReportRepository } from "../repositories/ReportRepository";
import { StudentRepository } from "../repositories/StudentRepository";
import { CreateOrUpdateReportHandlerFactory } from "../factories/CreateOrUpdateReportHandlerFactory";

export class ReportController implements IController {
    private _ReportRepository: ReportRepository;
    private _StudentRepository: ReportRepository;

    constructor(ReportRepository: ReportRepository, StudentRepository: ReportRepository) {
        this._ReportRepository = ReportRepository;
        this._StudentRepository = StudentRepository;
    }

    public async createOrUpdate(req: Request, res: Response): Promise<void> {
        return new CreateOrUpdateReportHandlerFactory().create(this._ReportRepository).handleRequest(req, res);
    }

    public async updateProfessorAvaliation(req: Request, res: Response): Promise<void> {
        return new CreateOrUpdateReportHandlerFactory().create(this._ReportRepository).handleRequest(req, res);
    }

}