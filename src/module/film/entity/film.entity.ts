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
    filmId: string | number;

    @Column()
    @IsNotEmpty()
    @IsString()
    name: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    userId: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    url: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    isSetting: boolean;
}
