import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Student } from '../entities/Student';

export class SqliteDataSource extends DataSource {
    private static instance: SqliteDataSource;

    private constructor() {
        super({
            type: 'sqlite',
            database: 'database/post_graduation_report.sqlite',
            entities: [
                User,
                Student
            ],
            synchronize: true,
        });
    }

    public initialize(): Promise<this> {
        return super.initialize();
    }

    public static getInstance(): SqliteDataSource {
        if (!SqliteDataSource.instance) {
            SqliteDataSource.instance = new SqliteDataSource();
        }
        return SqliteDataSource.instance;
    }
}