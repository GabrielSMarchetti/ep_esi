import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, Generated } from 'typeorm';
import { UserTypes } from '../enums/UserTypes';

@Entity()
export class User {

    @PrimaryColumn({ unique: true })
    username: string;

    @Column()
    salt: string;

    @Column()
    password: string;

    @Column()
    user_type: UserTypes;

    @Column("simple-array")
    roles: string[];

    constructor(username: string, salt: string, password: string, user_type: UserTypes, roles: string[]) {
        this.username = username;
        this.salt = salt;
        this.password = password;
        this.user_type = user_type;
        this.roles = roles;
    }
}