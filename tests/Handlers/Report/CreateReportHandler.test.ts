import { Request, Response } from 'express';
import { CreateReportHandler } from '../../../src/handlers/CreateReportHandler';
import { ReportRepository } from '../../../src/repositories/ReportRepository';
import { Report } from '../../../src/entities/Report';
import { jest } from '@jest/globals';
import { MockDataSource } from '../../mocks/mockDataSource';

const mockDataSource = new MockDataSource();
jest.mock('../../../src/repositories/ReportRepository');

describe('CreateReportHandler', () => {
    let reportRepository: jest.Mocked<ReportRepository>;
    let createReportHandler: CreateReportHandler;
    let req: Partial<Request> & { decodedJwt?: { num_usp: string } };
    let res: Partial<Response>;

    beforeEach(() => {
        reportRepository = new ReportRepository(mockDataSource) as jest.Mocked<ReportRepository>;
        createReportHandler = new CreateReportHandler(reportRepository);

        req = {
            body: {
                dataAtualizacaoLattes: '2023-01-01',
                resultadoUltimoRelatorio: 'Aprovado',
                disciplinasAprovacoes: 5,
                disciplinasReprovacoes: 1,
                disciplinasReprovacoesDesdeInicio: 2,
                exameProficienciaIdiomas: 'Passed',
                exameQualificacao: 'Passed',
                prazoQualificacao: '2023-06-01',
                prazoDissertacao: '2024-01-01',
                artigosFaseEscrita: 1,
                artigosSubmetidos: 2,
                artigosAceitosPublicados: 3,
                atividadesAcademicas: 'Research',
                resumoAtividadesPesquisa: 'Summary',
                declaracaoAdicional: 'Additional declaration',
                dificuldadeApoio: 'None',
                coordenadorComentario: 'Sem comentário',
                coordenadorParecer: 'Sem parecer',
                professorComentario: 'Sem comentário',
                professorParecer: 'Sem parecer',
            },
            decodedJwt: {
                num_usp: '123456',
            },
        } as Partial<Request> & { decodedJwt: { num_usp: string } };
        res = {
            status: jest.fn().mockReturnThis() as unknown as (code: number) => Response,
            send: jest.fn() as unknown as (body?: any) => Response,
        };
    });

    it('should create a report and return 200', async () => {
        const mockReport = new Report(
            '123456',
            '2023-01-01',
            'Aprovado',
            5,
            1,
            2,
            'Aprovado',
            'Aprovado',
            '2023-06-01',
            '2024-01-01',
            1,
            2,
            3,
            'Research',
            'Summary',
            'Additional declaration',
            'Sim'
        );
        reportRepository.save.mockResolvedValue(mockReport);

        await createReportHandler.handleRequest(req as Request, res as Response);

        expect(reportRepository.save).toHaveBeenCalledWith(expect.objectContaining({
            num_usp: '123456',
            dataAtualizacaoLattes: '2023-01-01',
            resultadoUltimoRelatorio: 'Aprovado',
            disciplinasAprovacoes: 5,
            disciplinasReprovacoes: 1,
            disciplinasReprovacoesDesdeInicio: 2,
            exameProficienciaIdiomas: 'Passed',
            exameQualificacao: 'Passed',
            prazoQualificacao: '2023-06-01',
            prazoDissertacao: '2024-01-01',
            artigosFaseEscrita: 1,
            artigosSubmetidos: 2,
            artigosAceitosPublicados: 3,
            atividadesAcademicas: 'Research',
            resumoAtividadesPesquisa: 'Summary',
            declaracaoAdicional: 'Additional declaration',
            dificuldadeApoio: 'None',
            coordenadorComentario: 'Sem comentário',
            coordenadorParecer: 'Sem parecer',
            professorComentario: 'Sem comentário',
            professorParecer: 'Sem parecer',
        }));
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(mockReport);
    });

    it('should return 404 if num_usp is not provided', async () => {
        req.decodedJwt = undefined;

        await createReportHandler.handleRequest(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalled();
    });
});