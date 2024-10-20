import { UserRepository } from "../repositories/UserRepository";
import { User } from "../entities/User";
import { SqliteDataSource } from "./DataSource";

export class RepositoryManager {
    private static instance: RepositoryManager;
    private repositoryMap: Map<any, any>;

    private constructor() {
        const SqliteDataSourceInstance = SqliteDataSource.getInstance();
        this.repositoryMap = new Map();
        this.repositoryMap.set(User, new UserRepository(SqliteDataSourceInstance));
    }

    public static getInstance(): RepositoryManager {
        if (!RepositoryManager.instance) {
            RepositoryManager.instance = new RepositoryManager();
        }
        return RepositoryManager.instance;
    }

    public getRepository(entityClass: any): any {
        const repository = this.repositoryMap.get(entityClass);
        if (!repository) {
            throw new Error('Repository not found');
        }
        return repository;
    }
}
