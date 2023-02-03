import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortPlaylistService } from './shortPlaylist.service';
import { ShortPlayListRepository } from './repository/shortPlayList.repository';
import { ShortPlayList } from './entity/shortPlayList.entity';
import { ShortPlaylistController } from './shortPlaylist.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ShortPlayList])],
    providers: [ShortPlaylistService, ShortPlayListRepository],
    controllers: [ShortPlaylistController],
    exports: [ShortPlaylistService],
})
export class ShortPlaylistModule {}
