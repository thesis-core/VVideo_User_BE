import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayList } from './entity/playList.entity';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';
import { PlayListRepository } from './repository/playList.repository';

@Module({
    imports: [TypeOrmModule.forFeature([PlayList])],
    providers: [PlaylistService, PlayListRepository],
    controllers: [PlaylistController],
    exports: [PlaylistService],
})
export class PlaylistModule {}
