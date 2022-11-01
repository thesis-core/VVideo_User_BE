import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { User } from '../user/entity/user.entity';
export const defaultConfig: TypeOrmModuleOptions = {
    type: 'mongodb',
    host: process.env.MONGODB_HOST,
    port: +process.env.MONGODB_PORT,
    // username: process.env.MYSQL_USERNAME,
    // password: process.env.MYSQL_PASSWORD,
    database: process.env.MONGODB_DATABASE,
    // autoLoadEntities: true,
    entities: [User],
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
