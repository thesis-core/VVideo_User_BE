import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmGroup } from './entity/filmGroup.entity';
import { FilmGroupEventHandle } from './event/filmGroup-event.handle';
import { FilmGroupService } from './filmGroup.service';
import { FilmGroupController } from './filmGroup.controller';
import { FilmGroupRepository } from './repository/filmGroup.repository';
import { Cast } from '../cast/entity/cast.entity';
import { MongoEventDispatcher } from 'nest-outbox-typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([FilmGroup, Cast])],
    providers: [FilmGroupService, FilmGroupEventHandle, FilmGroupRepository, MongoEventDispatcher],
    controllers: [FilmGroupController],
    exports: [FilmGroupService, FilmGroupEventHandle],
})
export class FilmGroupModule {}
