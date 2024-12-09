import { Request, Response } from 'express';

interface CustomRequest extends Request {
    decodedJwt?: {
        username: string;
        roles: string[];
        num_usp: string;
    };
}
import { UpdateReportHandler } from '../../../src/handlers/UpdateReportHandler';
import { ReportRepository } from '../../../src/repositories/ReportRepository';
import { jest } from '@jest/globals';
import { reportFixture } from './reportFixture';
import { MockDataSource } from '../../mocks/mockDataSource';

const mockDataSource = new MockDataSource();
    let req: Partial<CustomRequest>;
jest.mock('../../../src/repositories/ReportRepository');

describe('UpdateReportHandler', () => {
    let reportRepository: jest.Mocked<ReportRepository>;
    let updateReportHandler: UpdateReportHandler;
    let req: Partial<CustomRequest>;
    let res: Partial<Response>;

    beforeEach(() => {
        reportRepository = new ReportRepository(mockDataSource) as jest.Mocked<ReportRepository>;
        updateReportHandler = new UpdateReportHandler(reportRepository);

        req = {
            body: {
                ...reportFixture,
            },
            decodedJwt: {
                username: 'user123',
                roles: ['mentor'],
                num_usp: '123456',
            },
        };
        res = {
            status: jest.fn().mockReturnThis() as unknown as (code: number) => Response,
            send: jest.fn() as unknown as (body: any) => Response,
        };
    });

    it('should update the report and return 200', async () => {
        reportRepository.findLatestByNumeroUSP.mockResolvedValue(reportFixture);

        await updateReportHandler.handleRequest(req as Request, res as Response);

        expect(reportRepository.findLatestByNumeroUSP).toHaveBeenCalledWith('user123');
        expect(reportRepository.update).toHaveBeenCalledWith('user123', req.body);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalled();
    });

    it('should return 404 if username is not provided', async () => {
        req.decodedJwt = undefined;

        await updateReportHandler.handleRequest(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalled();
    });

    it('should return 404 if report is not found', async () => {
        reportRepository.findLatestByNumeroUSP.mockResolvedValue(undefined);

        await updateReportHandler.handleRequest(req as Request, res as Response);

        expect(reportRepository.findLatestByNumeroUSP).toHaveBeenCalledWith('user123');
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalled();
    });
});