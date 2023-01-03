import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { User } from '../user/entity/user.entity';
import { FilmGroup } from '../filmGroup/entity/filmGroup.entity';
import { MongoOutboxEvent } from 'nest-outbox-typeorm';
import { Genre } from '../genre/entity/genre.entity';
import { Film } from '../film/entity/film.entity';
import { ShortVideo } from '../shortVideo/entity/shortVideo.entity';
import { UserRating } from '../userRating/entity/userRating.entity';
import { PlayList } from '../playlist/entity/playList.entity';
export const defaultConfig: TypeOrmModuleOptions = {
    type: 'mongodb',
    url: process.env.MONGO_URL,
    // username: process.env.MYSQL_USERNAME,
    // password: process.env.MYSQL_PASSWORD,
    // autoLoadEntities: true,
    entities: [User, FilmGroup, MongoOutboxEvent, Genre, Film, ShortVideo, UserRating, PlayList],
    // entities: [Role, ConfigSetting, Country, Director, Cast, Film, FilmZone, Genre, FilmGroup, User],
    synchronize: false,
    // logging: true,
    // ssl: true,
    // extra: {
    //     ssl: {
    //         rejectUnauthorized: false,
    //     },
    // },

    // dropSchema: true,
};
