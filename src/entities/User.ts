import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    salt: string;

    @Column()
    password: string;

    @Column()
    user_type: number;

    @Column("simple-array")
    roles: string[];

    constructor(user_id: number, username: string, salt: string, password: string, user_type: number, roles: string[]) {
        this.user_id = user_id;
        this.username = username;
        this.salt = salt;
        this.password = password;
        this.user_type = user_type;
        this.roles = roles;
    }
}