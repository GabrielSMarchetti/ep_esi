import { Request, Response } from 'express';
import { ReportRepository } from '../repositories/ReportRepository';
import { Report } from '../entities/Report';
import { IHandler } from '../interfaces/IHandler';
import { ReportDto } from '../dtos/ReportDto';

export class CreateReportHandler implements IHandler {
    private _ReportRepository: ReportRepository;

    constructor(reportRepository: ReportRepository) {
        this._ReportRepository = reportRepository;
    }

    public async handleRequest(req: Request, res: Response): Promise<void> {
        const reportDto: ReportDto = req.body;
        const num_usp: string | undefined = req.decodedJwt?.num_usp;
        if (!num_usp) {
            res.status(404).send();
            return;
        }
        const report = new Report(num_usp,
                reportDto.dataAtualizacaoLattes,
                reportDto.resultadoUltimoRelatorio,
                reportDto.disciplinasAprovacoes,
                reportDto.disciplinasReprovacoes,
                reportDto.disciplinasReprovacoesDesdeInicio,
                reportDto.exameProficienciaIdiomas,
                reportDto.exameQualificacao,
                reportDto.prazoQualificacao,
                reportDto.prazoDissertacao,
                reportDto.artigosFaseEscrita,
                reportDto.artigosSubmetidos,
                reportDto.artigosAceitosPublicados,
                reportDto.atividadesAcademicas,
                reportDto.resumoAtividadesPesquisa,
                reportDto.declaracaoAdicional,
                reportDto.dificuldadeApoio);
        
        const newReport = await this._ReportRepository.save((report));
        res.status(200).send(newReport);
    }
}