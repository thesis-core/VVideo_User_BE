import { MongoBaseEntity } from 'nest-outbox-typeorm';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity()
export class Film extends MongoBaseEntity {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    @IsNotEmpty()
    @IsString()
    filmId: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    url: string;
}
