import { DataSource } from 'typeorm';
import { User } from '../entities/user';

export class PostgresDataSource {
    private static instance: DataSource;

    private constructor() {}

    public static getInstance(): DataSource {
        if (!PostgresDataSource.instance) {
            PostgresDataSource.instance = new DataSource({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'your_username',
                password: 'your_password',
                database: 'your_database',
                entities: [User],
                synchronize: true,
            });
        }
        return PostgresDataSource.instance;
    }

    public static async initialize(): Promise<void> {
        const dataSource = PostgresDataSource.getInstance();
        if (!dataSource.isInitialized) {
            await dataSource.initialize();
        }
    }
}