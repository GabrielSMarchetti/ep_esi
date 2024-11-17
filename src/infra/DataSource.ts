import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Student } from '../entities/Student';
import { Report } from '../entities/Report';

export class SqliteDataSource extends DataSource {
    private static instance: SqliteDataSource;

    private constructor() {
        super({
            type: 'sqlite',
            database: 'database/post_graduation_report.sqlite',
            entities: [
                User,
                Student,
                Report
            ],
            synchronize: true,
        });
    }

    public initialize(): Promise<this> {
        console.log('Database initializing');
        return super.initialize();
    }

    public static isInitialized(): boolean {
        return !!SqliteDataSource.instance;
    }

    public static getInstance(): SqliteDataSource {
        if (!SqliteDataSource.instance) {
            SqliteDataSource.instance = new SqliteDataSource();
        }
        return SqliteDataSource.instance;
    }
}