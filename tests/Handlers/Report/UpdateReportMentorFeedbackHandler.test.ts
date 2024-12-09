import { Request, Response } from 'express';
import { UpdateReportMentorFeedbackHandler } from '../../../src/handlers/UpdateReportMentorFeedbackHandler';
import { ReportRepository } from '../../../src/repositories/ReportRepository';
import { jest } from '@jest/globals';
import { reportFixture } from './reportFixture';
import { MockDataSource } from '../../mocks/mockDataSource';

const mockDataSource = new MockDataSource();

jest.mock('../../../src/repositories/ReportRepository');

describe('UpdateReportMentorFeedbackHandler', () => {
    let reportRepository: jest.Mocked<ReportRepository>;
    let updateReportMentorFeedbackHandler: UpdateReportMentorFeedbackHandler;
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        reportRepository = new ReportRepository(mockDataSource) as jest.Mocked<ReportRepository>;
        updateReportMentorFeedbackHandler = new UpdateReportMentorFeedbackHandler(reportRepository);

        req = {
            body: {
                studentId: '123456',
                professorOpinion: 'Aprovado',
                professorComment: 'Good progress',
            },
        };
        res = {
            status: jest.fn().mockReturnThis() as unknown as (code: number) => Response,
            send: jest.fn() as unknown as (body: any) => Response,
        };
    });

    it('should update the mentor feedback and return 200', async () => {
        reportRepository.findLatestByNumeroUSP.mockResolvedValue(reportFixture);
        reportRepository.save.mockResolvedValue(reportFixture);

        await updateReportMentorFeedbackHandler.handleRequest(req as Request, res as Response);

        expect(reportRepository.findLatestByNumeroUSP).toHaveBeenCalledWith('123456');
        expect(reportRepository.save).toHaveBeenCalledWith(expect.objectContaining({
            professorParecer: 'Aprovado',
            professorComentario: 'Good progress',
        }));
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(reportFixture);
    });

    it('should return 404 if report is not found', async () => {
        reportRepository.findLatestByNumeroUSP.mockResolvedValue(undefined);

        await updateReportMentorFeedbackHandler.handleRequest(req as Request, res as Response);

        expect(reportRepository.findLatestByNumeroUSP).toHaveBeenCalledWith('123456');
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalled();
    });
});