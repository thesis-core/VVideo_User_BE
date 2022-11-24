import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmGroup } from './entity/filmGroup.entity';
import { FilmGroupEvent } from './event/filmGroup.event';
import { FilmGroupService } from './filmGroup.service';
import { FilmGroupController } from './filmGroup.controller';
import { FilmGroupRepository } from './repository/filmGroup.repository';
import { Cast } from '../cast/entity/cast.entity';
import { CastRepository } from '../cast/repository/cast.repository';

@Module({
    imports: [TypeOrmModule.forFeature([FilmGroup, Cast])],
    providers: [FilmGroupService, FilmGroupEvent, FilmGroupRepository, CastRepository],
    controllers: [FilmGroupController],
    exports: [FilmGroupService, FilmGroupEvent],
})
export class FilmGroupModule {}
