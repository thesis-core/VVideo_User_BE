import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from './ormconfig';
import { UserModule } from './module/user/user.module';
import { FilmGroupModule } from './module/filmGroup/filmGroup.module';
import { AuthModule } from './module/auth/auth.module';
import { GenreModule } from './module/genre/genre.module';
import { FilmModule } from './module/film/film.module';
import { MailModule } from './module/mail/mail.module';

const Modules = [
    UserModule,
    GenreModule,
    FilmGroupModule,
    FilmModule,
    MailModule,
    AuthModule,
    TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
];
export default Modules;
