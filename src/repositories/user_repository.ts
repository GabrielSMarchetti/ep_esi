import { DataSource } from 'typeorm';
import { User } from '../entities/user';
import * as bcrypt from 'bcrypt';

export class UserRepository {
    private userRepository;

    constructor(dataSource: DataSource) {
        this.userRepository = dataSource.getRepository(User);
    }

    async findOneByUsename(username: string): Promise<User | undefined> {
        const user = await this.userRepository.findOneBy({ username });
        return user ?? undefined;
    }

    async create(user: User): Promise<User> {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        return await this.userRepository.save(user);
    }
}