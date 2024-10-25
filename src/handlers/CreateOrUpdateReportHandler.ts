import { Request, Response } from 'express';
import { ReportRepository } from '../repositories/ReportRepository';
import { StudentRepository } from '../repositories/StudentRepository';
import { IHandler } from '../interfaces/IHandler';
import { ReportDto } from '../dtos/ReportDto';
import jwt from 'jsonwebtoken';

export class CreateOrUpdateReportHandler implements IHandler {
    private _ReportRepository: ReportRepository
    private _StudentRepository: StudentRepository;
    constructor(reportRepository: ReportRepository, StudentRepository: StudentRepository) {
        this._ReportRepository = reportRepository;
        this._StudentRepository = StudentRepository;
    }

    private getUsernameFromToken(req: Request): string | null {
        const authHeader = req.headers.authorization;
        if (!authHeader) return null;

        const token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, 'your_secret_key') as { username: string };
            return decoded.username;
        } catch (error) {
            return null;
        }
    }

    public async handleRequest(req: Request, res: Response): Promise<void> {
        const reportDto: ReportDto = req.body;
        const username: string | null = this.getUsernameFromToken(req);
        if (!username) {
            res.status(404).send();
            return;
        }
        
        const student = await this._StudentRepository.findOneByNumeroUSP(username);
        if (!student) {
            res.status(404).send();
            return;
        }

        const report = await this._ReportRepository.findLatestByNumeroUSP(username);
        if (report) {
            report.title = reportDto.title;
            report.content = reportDto.content;
            report.updatedAt = new Date();
            await this._ReportRepository.save(report);
        } else {
            const newReport = this._ReportRepository.create({
            numeroUSP: username,
            createdAt: new Date(),
            updatedAt: new Date(),
            ip: req.ip
            });
            await this._ReportRepository.save(newReport);
        }
        res.status(200).send();
    }
}