import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortVideo } from './entity/shortVideo.entity';
import { ShortVideoRepository } from './repository/shortVideo.repository';
import { ShortVideoService } from './shortVideo.service';
import { ShortVideoController } from './shortVideo.controller';
import { MongoEventDispatcher } from 'nest-outbox-typeorm';
import { ShortVideoEventHandle } from './event/shortVideo-event.handle';

@Module({
    imports: [TypeOrmModule.forFeature([ShortVideo])],
    providers: [ShortVideoRepository, ShortVideoEventHandle, ShortVideoService, MongoEventDispatcher],
    controllers: [ShortVideoController],
    exports: [ShortVideoService, ShortVideoEventHandle],
})
export class ShortVideoModule {}
