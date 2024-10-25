import { DataSource, Repository } from 'typeorm';
import { Student } from '../entities/Student';

export class StudentRepository extends Repository<Student> {
    constructor(dataSource: DataSource) {
        super(Student, dataSource.manager);
    }

    async findOneByNumeroUSP(numeroUSP: string): Promise<Student | undefined> {
        const Student = await this.findOneBy({ numeroUSP });
        return Student ?? undefined;
    }

    async createOrUpdate(Student: Student): Promise<Student> {
        return await this.save(Student);
    }
}