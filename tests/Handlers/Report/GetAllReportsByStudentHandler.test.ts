import { Request, Response } from 'express';
import { GetAllReportsByStudentHandler } from '../../../src/handlers/GetAllReportsByStudentHandler';
import { ReportRepository } from '../../../src/repositories/ReportRepository';
import { jest } from '@jest/globals';
import { reportFixture } from './reportFixture';
import { MockDataSource } from '../../mocks/mockDataSource';

const mockDataSource = new MockDataSource();
jest.mock('../../../src/repositories/ReportRepository');

describe('GetAllReportsByStudentHandler', () => {
    let reportRepository: jest.Mocked<ReportRepository>;
    let getAllReportsByStudentHandler: GetAllReportsByStudentHandler;
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        reportRepository = new ReportRepository(mockDataSource) as jest.Mocked<ReportRepository>;
        getAllReportsByStudentHandler = new GetAllReportsByStudentHandler(reportRepository);

        req = {
            query: {
                num_usp: '123456',
            },
        };
        res = {
            status: jest.fn().mockReturnThis() as unknown as (code: number) => Response,
            json: jest.fn() as unknown as (body: any) => Response,
        };
    });

    it('should return reports for the student', async () => {
        reportRepository.findAllByStudent.mockResolvedValue([reportFixture]);

        await getAllReportsByStudentHandler.handleRequest(req as Request, res as Response);

        expect(reportRepository.findAllByStudent).toHaveBeenCalledWith('123456');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([reportFixture]);
    });
});