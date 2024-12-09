import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, Generated } from 'typeorm';
import { UserTypes } from '../enums/UserTypes';

@Entity()
export class User {

    @PrimaryColumn({ unique: true })
    username: string;

    @Column({ unique: true , nullable: true})
    num_usp: string;

    @Column()
    password: string;

    @Column()
    user_type: UserTypes;

    @Column("simple-array")
    roles: string[];

    constructor(username: string, num_usp: string, password: string, user_type: UserTypes, roles: string[]) {
        this.username = username;
        this.num_usp = num_usp;
        this.password = password;
        this.user_type = user_type;
        this.roles = roles;
    }
}