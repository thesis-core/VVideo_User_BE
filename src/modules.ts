import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from './ormconfig';
import { UserModule } from './module/user/user.module';
import { FilmGroupModule } from './module/filmGroup/filmGroup.module';
import { AuthModule } from './module/auth/auth.module';
import { GenreModule } from './module/genre/genre.module';
import { FilmModule } from './module/film/film.module';
import { MailModule } from './module/mail/mail.module';
import { ShortVideoModule } from './module/shortVideo/shortVideo.module';
import { UserRating } from './module/userRating/entity/userRating.entity';
import { PlaylistModule } from './module/playlist/playlist.module';

const Modules = [
    UserModule,
    GenreModule,
    FilmGroupModule,
    FilmModule,
    MailModule,
    AuthModule,
    ShortVideoModule,
    PlaylistModule,
    UserRating,
    FilmModule,
    TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
];
export default Modules;
