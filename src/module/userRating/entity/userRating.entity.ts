import { MongoBaseEntity } from 'nest-outbox-typeorm';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Entity()
export class UserRating extends MongoBaseEntity {
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    @IsString()
    @IsNotEmpty()
    userId: string;

    @Column()
    @IsNumber()
    @IsNotEmpty()
    filmGroupId: number;

    @Column()
    @IsNumber()
    @IsNotEmpty()
    rate: number;
}
