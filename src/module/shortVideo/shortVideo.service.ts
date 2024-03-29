import { Injectable } from '@nestjs/common';
import { ShortVideoRepository } from './repository/shortVideo.repository';
import { ShortVideo, ShortVideoPrivacy } from './entity/shortVideo.entity';
import { ShortVideoDto } from './dto/shortVideo.dto';
import { EntityManager } from 'typeorm/entity-manager/EntityManager';
import { MongoEventDispatcher, MongoOutboxEvent } from 'nest-outbox-typeorm';
import { ShortVideoEvent } from './event/shortVideo.event';
import { GetAllShortVideosDto } from './dto/getAllShortVideos.dto';

@Injectable()
export class ShortVideoService {
    constructor(
        private shortVideoRepository: ShortVideoRepository,
        private entityManager: EntityManager,
        private mongoEventDispatcher: MongoEventDispatcher,
    ) {}

    async getAllShortVideos(getAllShortVideosDto: GetAllShortVideosDto): Promise<ShortVideo[] | any> {
        return this.shortVideoRepository.getAllShortVideos(getAllShortVideosDto);
    }

    async getMyShortVideos(id: string): Promise<ShortVideo[]> {
        return this.shortVideoRepository.findBy({ userId: id.toString() });
    }

    async createShortVideo(shortVideoDto: ShortVideoDto, userId: string): Promise<void> {
        const shortVideo = new ShortVideo();
        shortVideo.userId = userId;
        shortVideo.name = shortVideoDto.name;
        shortVideo.url = shortVideoDto.url;
        shortVideo.messageIds = [];
        shortVideo.privacy = ShortVideoPrivacy.PRIVATE;
        await this.entityManager.transaction(async (tx) => {
            const newShortVideo = await tx.save(shortVideo);
            await this.mongoEventDispatcher.onDomainEvent(
                new ShortVideoEvent(
                    newShortVideo._id.toString(),
                    'ShortVideoCreated',
                    newShortVideo as unknown as Record<string, unknown>,
                ),
                async (outbox) => {
                    const outboxRecord = await tx.save(outbox);
                    await tx.delete(MongoOutboxEvent, { id: outboxRecord.id });
                },
            );
        });
    }
}
