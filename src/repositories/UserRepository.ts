import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/User';
import * as bcrypt from 'bcrypt';

export class UserRepository extends Repository<User> {
    constructor(dataSource: DataSource) {
        super(User, dataSource.manager);
    }

    async findOneByUsername(username: string): Promise<User | undefined> {
        const user = await this.findOneBy({ username });
        return user ?? undefined;
    }

    async createOrUpdate(user: User): Promise<User> {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        user.salt = salt;
        return await this.save(user);
    }
}