import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { User } from '../user/entity/user.entity';
import { FilmGroup } from '../filmGroup/entity/filmGroup.entity';
export const defaultConfig: TypeOrmModuleOptions = {
    type: 'mongodb',
    url: process.env.MONGO_URL,
    // username: process.env.MYSQL_USERNAME,
    // password: process.env.MYSQL_PASSWORD,
    // autoLoadEntities: true,
    entities: [User, FilmGroup],
    // entities: [Role, ConfigSetting, Country, Director, Cast, Film, FilmZone, Genre, FilmGroup, User],
    synchronize: true,
    // logging: true,
    // ssl: true,
    // extra: {
    //     ssl: {
    //         rejectUnauthorized: false,
    //     },
    // },

    // dropSchema: true,
};
