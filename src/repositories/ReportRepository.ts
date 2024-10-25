import { DataSource, Repository, In } from 'typeorm';
import { Report } from '../entities/Report';
import { StudentRepository } from './StudentRepository';

export class ReportRepository extends Repository<Report> {
    constructor(dataSource: DataSource) {
        super(Report, dataSource.manager);
    }

    async findOneByNumeroUSP(numeroUSP: string): Promise<Report | undefined> {
        const Report = await this.findOneBy({ numeroUSP });
        return Report ?? undefined;
    }

    async findAllByStudent(numeroUSP: string): Promise<Report[]> {
        const Reports = await this.find({ where: { numeroUSP } });
        return Reports;
    }

    async findAllByMentor(mentor: string, studentRepository: StudentRepository): Promise<Report[]> {
        const students = await studentRepository.findAllByMentor(mentor);
        const reports = await this.find({ where: { numeroUSP: In(students.map(student => student.numeroUSP)) } });
        return reports;
    }

    async findLatestByNumeroUSP(numeroUSP: string): Promise<Report | undefined> {
        const Report = await this.findOne({ where: { numeroUSP }, order: { creationDate: 'DESC' } });
        return Report ?? undefined;
    }

}