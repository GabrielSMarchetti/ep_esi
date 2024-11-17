import { IController } from "../interfaces/IController";
import { Request, Response } from 'express';
import { ReportRepository } from "../repositories/ReportRepository";
import { HandlerFactory } from "../factories/HandlerFactory";
import { CreateReportHandler } from "../handlers/CreateReportHandler";
import { UpdateReportProfessorFeedbackHandler } from "../handlers/UpdateReportMentorAvaliationHandler";
import { UpdateReportCoordinatorAvaliationHandler as UpdateReportCoordinatorFeedbackHandler } from "../handlers/UpdateReportCoordinatorAvaliationHandler";
import { GetAllReportsByMentorHandler } from "../handlers/GetAllReportsByMentorHandler";
import { StudentRepository } from "../repositories/StudentRepository";
import { GetAllReportsByStudentHandler } from "../handlers/GetAllReportsByStudentHandler";

export class ReportController implements IController {
    private _ReportRepository: ReportRepository;
    private _StudentRepository: StudentRepository;
    private _HandlerFactory: HandlerFactory<ReportRepository>;

    constructor(ReportRepository: ReportRepository, StudentRepository: StudentRepository) {
        this._ReportRepository = ReportRepository;
        this._StudentRepository = StudentRepository;
        this._HandlerFactory = new HandlerFactory(this._ReportRepository);
    }

    public async create(req: Request, res: Response): Promise<void> {
        return this._HandlerFactory.create(CreateReportHandler).handleRequest(req, res);
    }

    public async getByStudent(req: Request, res: Response): Promise<void> {
        return this._HandlerFactory.create(GetAllReportsByStudentHandler).handleRequest(req, res);
    }

    public async getByMentor(req: Request, res: Response): Promise<void> {
        return new GetAllReportsByMentorHandler(this._ReportRepository, this._StudentRepository).handleRequest(req, res);
    }

    public async updateMentorFeedback(req: Request, res: Response): Promise<void> {
        return this._HandlerFactory.create(UpdateReportProfessorFeedbackHandler).handleRequest(req, res);
    }

    public async updateCoordinatorFeedback(req: Request, res: Response): Promise<void> {
        return this._HandlerFactory.create(UpdateReportCoordinatorFeedbackHandler).handleRequest(req, res);
    }

    public async getAllReports(req: Request, res: Response): Promise<void> {
        const reports = await this._ReportRepository.find();
        res.json(reports);
    }

}