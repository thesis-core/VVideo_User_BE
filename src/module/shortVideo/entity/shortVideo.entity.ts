import { MongoBaseEntity } from 'nest-outbox-typeorm';
import { AfterLoad, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum ShortVideoPrivacy {
    PUBLIC,
    PRIVATE,
}
@Entity()
export class ShortVideo extends MongoBaseEntity {
    @ObjectIdColumn()
    id: ObjectID | string;

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
        this.id = this.id.toString();
    }
}
