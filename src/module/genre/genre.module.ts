import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from './entity/genre.entity';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';
import { GenreRepository } from './repository/genre.repository';
import { GenreEventHandle } from './event/genre-event.handle';

@Module({
    imports: [TypeOrmModule.forFeature([Genre])],
    controllers: [GenreController],
    providers: [GenreService, GenreRepository, GenreEventHandle],
    exports: [GenreService, GenreEventHandle],
})
export class GenreModule {}
