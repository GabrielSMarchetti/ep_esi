import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/User';
import { UserTypes } from '../enums/UserTypes';

export class UserRepository extends Repository<User> {
    constructor(dataSource: DataSource) {
        super(User, dataSource.manager);
    }

    async findOneByUsername(username: string): Promise<User | undefined> {
        const user = await this.findOneBy({ username });
        return user ?? undefined;
    }

    async findAllMentors(): Promise<User[]> {
        const mentors = await this.find({ where: { user_type: UserTypes.MENTOR } });
        return mentors;
    }

}