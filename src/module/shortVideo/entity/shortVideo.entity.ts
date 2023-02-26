import { MongoBaseEntity } from 'nest-outbox-typeorm';
import { AfterLoad, Column, Entity, ObjectID, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum ShortVideoPrivacy {
    PRIVATE,
    PUBLIC,
}
@Entity()
export class ShortVideo extends MongoBaseEntity {
    @ObjectIdColumn()
    _id: ObjectID | string;

    @PrimaryColumn()
    id: string;

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
    @IsString()
    url: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    genre: string;

    @Column()
    @IsNotEmpty()
    @IsEnum(ShortVideoPrivacy)
    privacy: ShortVideoPrivacy;

    @AfterLoad()
    async convertId() {
        this._id = this._id.toString();
    }
}
