import { UserRepository } from '../repositories/UserRepository';
import { StudentRepository } from '../repositories/StudentRepository';
import { ReportRepository } from '../repositories/ReportRepository';
import { User } from '../entities/User';
import { Student } from '../entities/Student';
import { Report } from '../entities/Report';
import { SqliteDataSource } from './DataSource';

export class RepositoryManager {
    private static instance: RepositoryManager;
    private repositoryMap: Map<any, any>;

    private constructor() {
        this.repositoryMap = new Map<any, any>();
    }

    public static getInstance(): RepositoryManager {
        if (!RepositoryManager.instance) {
            RepositoryManager.instance = new RepositoryManager();
        }
        return RepositoryManager.instance;
    }

    public initialize() {
        const dataSource = SqliteDataSource.getInstance();

        this.repositoryMap = new Map<any, any>();
        this.repositoryMap.set(User, new UserRepository(dataSource));
        this.repositoryMap.set(Student, new StudentRepository(dataSource));
        this.repositoryMap.set(Report, new ReportRepository(dataSource));
    }

    public static isInitialized(): boolean {
        return !!RepositoryManager.instance;
    }

    public getRepository(entityClass: any): any {
        const repository = this.repositoryMap.get(entityClass);
        if (!repository) {
            throw new Error('Repository not found');
        }
        return repository;
    }
}
