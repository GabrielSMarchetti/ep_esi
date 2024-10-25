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

    async findAllByMentor(mentor: string): Promise<Student[]> {
        return this.find({ where: { orientador: mentor } });
    }

}