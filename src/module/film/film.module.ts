import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './entity/film.entity';
import { FilmEventHandle } from './event/film-event.handle';
import { FilmRepository } from './repository/film.repository';

import { FilmService } from './film.service';
import { FilmController } from './film.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Film])],
    controllers: [FilmController],
    providers: [FilmService, FilmRepository, FilmEventHandle],
    exports: [FilmService, FilmEventHandle],
})
export class FilmModule {}
