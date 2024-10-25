import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/User';

export class UserRepository extends Repository<User> {
    constructor(dataSource: DataSource) {
        super(User, dataSource.manager);
    }

    async findOneByUsername(username: string): Promise<User | undefined> {
        const user = await this.findOneBy({ username });
        return user ?? undefined;
    }

    async createOrUpdate(user: User): Promise<User> {
        return await this.save(user);
    }
}