import { DataSource, Repository } from 'typeorm';
import { Report } from '../entities/Report';

export class ReportRepository extends Repository<Report> {
    constructor(dataSource: DataSource) {
        super(Report, dataSource.manager);
    }

    async findOneByNumeroUSP(numeroUSP: string): Promise<Report | undefined> {
        const Report = await this.findOneBy({ numeroUSP });
        return Report ?? undefined;
    }

    async findLatestByNumeroUSP(numeroUSP: string): Promise<Report | undefined> {
        const Report = await this.findOne({ where: { numeroUSP }, order: { creationDate: 'DESC' } });
        return Report ?? undefined;
    }

    async createOrUpdate(report: Report): Promise<Report> {
        return await this.save(report);
    }
}