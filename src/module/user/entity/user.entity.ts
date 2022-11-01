import { Entity, ObjectID, ObjectIdColumn, Column, BeforeInsert } from 'typeorm';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    password: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    avatarUrl: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    facebookId: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    userTier: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    stripeId: string;

    @BeforeInsert()
    async actionBeforeInsert(): Promise<void> {
        this.password = await bcrypt.hash(this.password, +process.env.SALT_ROUND);
    }
}
