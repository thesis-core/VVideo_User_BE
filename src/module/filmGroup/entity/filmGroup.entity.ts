import { AfterLoad, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Cast } from '../../cast/entity/cast.entity';
import { Director } from '../../director/entity/director.entity';
import { MongoBaseEntity } from 'nest-outbox-typeorm';

@Entity()
export class FilmGroup extends MongoBaseEntity {
    @ObjectIdColumn()
    _id: ObjectID | string;

    @Column()
    @IsNotEmpty()
    @IsString()
    filmGroupId: string;

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

    @Column({ default: 0 })
    @IsNotEmpty()
    @IsNumber()
    avgRating: number;

    @Column()
    @IsNotEmpty()
    @IsNumber()
    ratingCount: number;

    @Column({ default: 0 })
    @IsNotEmpty()
    @IsNumber()
    viewCount: number;

    @Column({ default: 0 })
    @IsNotEmpty()
    @IsBoolean()
    isDeleted: boolean;

    @Column()
    createdAt: Date;
    @AfterLoad()
    async actionAfterLoad(): Promise<void> {
        this._id = this._id.toString();
    }
}
