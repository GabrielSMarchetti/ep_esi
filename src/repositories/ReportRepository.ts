import { DataSource, Repository, In } from 'typeorm';
import { Report } from '../entities/Report';
import { StudentRepository } from './StudentRepository';

export class ReportRepository extends Repository<Report> {
    constructor(dataSource: DataSource) {
        super(Report, dataSource.manager);
    }

    async findOneByNumeroUSP(num_usp: string): Promise<Report | undefined> {
        const Report = await this.findOneBy({ num_usp });
        return Report ?? undefined;
    }

    async findAllByStudent(num_usp: string): Promise<Report[]> {
        if (!num_usp) {
            return [];
        }
        const Reports = await this.find({ where: { num_usp } , order: { creationDate: 'DESC' } });
        return Reports;
    }

    async findAllByMentor(mentor: string, studentRepository: StudentRepository): Promise<Report[]> {
        const students = await studentRepository.findAllByMentor(mentor);
        const reports = await this.find({ where: { num_usp: In(students.map(student => student.num_usp)) } });
        return reports;
    }

    async findLatestByNumeroUSP(num_usp: string): Promise<Report | undefined> {
        const Report = await this.findOne({ where: { num_usp }, order: { creationDate: 'DESC' } });
        return Report ?? undefined;
    }

}