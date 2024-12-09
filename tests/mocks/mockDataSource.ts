import { DataSource } from 'typeorm';

export class MockDataSource extends DataSource {
    constructor() {
        super({
            type: 'sqlite',
            database: ':memory:',
            entities: [],
            synchronize: true,
        });
    }

    public initialize(): Promise<this> {
        return Promise.resolve(this);
    }
}