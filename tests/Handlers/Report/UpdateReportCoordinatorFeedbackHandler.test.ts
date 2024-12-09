import { Request, Response } from 'express';
import { UpdateReportCoordinatorFeedbackHandler } from '../../../src/handlers/UpdateReportCoordinatorFeedbackHandler';
import { ReportRepository } from '../../../src/repositories/ReportRepository';
import { jest } from '@jest/globals';
import { reportFixture } from './reportFixture';
import { MockDataSource } from '../../mocks/mockDataSource';

const mockDataSource = new MockDataSource();

jest.mock('../../../src/repositories/ReportRepository');

describe('UpdateReportCoordinatorFeedbackHandler', () => {
    let reportRepository: jest.Mocked<ReportRepository>;
    let updateReportCoordinatorFeedbackHandler: UpdateReportCoordinatorFeedbackHandler;
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        reportRepository = new ReportRepository(mockDataSource) as jest.Mocked<ReportRepository>;
        updateReportCoordinatorFeedbackHandler = new UpdateReportCoordinatorFeedbackHandler(reportRepository);

        req = {
            body: {
                num_usp: '123456',
                coordinatorOpinion: 'Aprovado',
                coordinatorComment: 'Good progress',
            },
        };
        res = {
            status: jest.fn().mockReturnThis() as unknown as (code: number) => Response,
            send: jest.fn() as unknown as (body: any) => Response,
        };
    });

    it('should update the coordinator feedback and return 200', async () => {
        reportRepository.findLatestByNumeroUSP.mockResolvedValue(reportFixture);
        reportRepository.save.mockResolvedValue(reportFixture);

        await updateReportCoordinatorFeedbackHandler.handleRequest(req as Request, res as Response);

        expect(reportRepository.findLatestByNumeroUSP).toHaveBeenCalledWith('123456');
        expect(reportRepository.save).toHaveBeenCalledWith(expect.objectContaining({
            coordenadorParecer: 'Aprovado',
            coordenadorComentario: 'Good progress',
        }));
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(reportFixture);
    });

    it('should return 404 if report is not found', async () => {
        reportRepository.findLatestByNumeroUSP.mockResolvedValue(undefined);

        await updateReportCoordinatorFeedbackHandler.handleRequest(req as Request, res as Response);

        expect(reportRepository.findLatestByNumeroUSP).toHaveBeenCalledWith('123456');
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalled();
    });
});