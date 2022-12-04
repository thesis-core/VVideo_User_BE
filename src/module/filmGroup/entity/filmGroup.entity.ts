import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { Cast } from '../../cast/entity/cast.entity';
import { Director } from '../../director/entity/director.entity';
import { MongoBaseEntity } from 'nest-outbox-typeorm';

@Entity()
export class FilmGroup extends MongoBaseEntity {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    @IsNotEmpty()
    @IsString()
    filmId: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    name: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    description: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    genre: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    thumbnailUrl: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    country: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    trailerUrl: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    bannerUrl: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    duration: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    quality: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    filmZone: string;

    @Column(() => Cast)
    casts: Cast[];
    //
    @Column(() => Director)
    directors: Director[];
}
