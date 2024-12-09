import { Request, Response } from 'express';
import { reportFixture } from './reportFixture';

interface CustomRequest extends Request {
    decodedJwt?: {
        username: string;
        roles: string[];
        num_usp: string;
    };
}
import { GetAllReportsByMentorHandler } from '../../../src/handlers/GetAllReportsByMentorHandler';
import { ReportRepository } from '../../../src/repositories/ReportRepository';
import { StudentRepository } from '../../../src/repositories/StudentRepository';
import { jest } from '@jest/globals';
import { MockDataSource } from '../../mocks/mockDataSource';

const mockDataSource = new MockDataSource();

jest.mock('../../../src/repositories/ReportRepository');
    let req: Partial<CustomRequest>;

describe('GetAllReportsByMentorHandler', () => {
    let reportRepository: jest.Mocked<ReportRepository>;
    let studentRepository: jest.Mocked<StudentRepository>;
    let getAllReportsByMentorHandler: GetAllReportsByMentorHandler;
    let req: Partial<CustomRequest>;
    let res: Partial<Response>;

    beforeEach(() => {
        reportRepository = new ReportRepository(mockDataSource) as jest.Mocked<ReportRepository>;
        studentRepository = new StudentRepository(mockDataSource) as jest.Mocked<StudentRepository>;
        getAllReportsByMentorHandler = new GetAllReportsByMentorHandler(reportRepository, studentRepository);

        req = {
            body: {},
            decodedJwt: {
                username: 'mentor123',
                roles: ['mentor'],
                num_usp: '123456',
            },
        };
        res = {
            status: jest.fn().mockReturnThis() as unknown as (code: number) => Response,
            json: jest.fn() as unknown as (body: any) => Response,
        };
    });

    it('should return 400 if token is invalid', async () => {
        req.decodedJwt = undefined;

        await getAllReportsByMentorHandler.handleRequest(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Invalid token' });
    });

    it('should return reports for the mentor from the token', async () => {
        const mockReports = [reportFixture];
        reportRepository.findAllByMentor.mockResolvedValue(mockReports);

        await getAllReportsByMentorHandler.handleRequest(req as Request, res as Response);

        expect(reportRepository.findAllByMentor).toHaveBeenCalledWith('mentor123', studentRepository);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockReports);
    });

    it('should return reports for the mentor from the request body', async () => {
        req.body = { mentor: 'mentor456' };
        const mockReports = [reportFixture];
        reportRepository.findAllByMentor.mockResolvedValue(mockReports);

        await getAllReportsByMentorHandler.handleRequest(req as Request, res as Response);

        expect(reportRepository.findAllByMentor).toHaveBeenCalledWith('mentor456', studentRepository);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockReports);
    });
});