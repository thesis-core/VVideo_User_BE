import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { Cast } from '../../cast/entity/cast.entity';
import { Director } from '../../director/entity/director.entity';

@Entity()
export class FilmGroup {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    @IsNotEmpty()
    @IsString()
    name: string;

    // @Column()
    // @IsNotEmpty()
    // @IsString()
    // description: string;
    //
    // @Column()
    // @IsNotEmpty()
    // @IsString()
    // genre: string;
    //
    // @Column()
    // @IsNotEmpty()
    // @IsString()
    // thumbnail: string;
    //
    // @Column()
    // @IsNotEmpty()
    // @IsString()
    // country: string;
    //
    // @Column()
    // @IsNotEmpty()
    // @IsString()
    // trailer: string;
    //
    // @Column()
    // @IsNotEmpty()
    // @IsString()
    // banner: string;
    //
    // @Column()
    // @IsNotEmpty()
    // @IsString()
    // duration: string;
    //
    // @Column()
    // @IsNotEmpty()
    // @IsString()
    // quality: string;
    //
    // @Column()
    // @IsNotEmpty()
    // @IsString()
    // filmZone: string;

    @Column(() => Cast)
    casts: Cast[];
    //
    @Column(() => Director)
    directors: Director[];
}
