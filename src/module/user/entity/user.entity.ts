import { Entity, ObjectID, ObjectIdColumn, Column, BeforeInsert } from 'typeorm';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { UserTier } from '../../userTier/entity/userTier.entity';
import { MongoBaseEntity } from 'nest-outbox-typeorm';

@Entity()
export class User extends MongoBaseEntity {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Column({ nullable: true })
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

    @Column(() => UserTier)
    @IsString()
    @IsNotEmpty()
    userTier: UserTier;

    @Column()
    @IsString()
    @IsNotEmpty()
    stripeId: string;

    @BeforeInsert()
    async actionBeforeInsert(): Promise<void> {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, +process.env.SALT_ROUND);
        }
    }
}
