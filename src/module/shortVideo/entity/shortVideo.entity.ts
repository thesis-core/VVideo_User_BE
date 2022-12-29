import { MongoBaseEntity } from 'nest-outbox-typeorm';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum ShortVideoPrivacy {
    PUBLIC,
    PRIVATE,
}
@Entity()
export class ShortVideo extends MongoBaseEntity {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    @IsNotEmpty()
    @IsString()
    name: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    userId: string;

    @Column()
    @IsNotEmpty()
    @IsEnum(ShortVideoPrivacy)
    privacy: ShortVideoPrivacy;
}
