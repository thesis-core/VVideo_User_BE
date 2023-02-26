import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { IHeaders, KafkaService, SubscribeTo } from '@rob3000/nestjs-kafka';

import { EntityManager } from 'typeorm/entity-manager/EntityManager';
import { ShortVideoRepository } from '../repository/shortVideo.repository';
import { ShortVideoPrivacy } from '../entity/shortVideo.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const MongoObjectID = require('mongodb').ObjectID;

@Injectable()
export class ShortVideoEventHandle implements OnModuleInit {
    private readonly logger = new Logger(ShortVideoEventHandle.name);

    constructor(
        private shortVideoRepository: ShortVideoRepository,
        private entityManager: EntityManager,
        @Inject('WEB_MOVIE_SERVICE') private readonly client: KafkaService,
    ) {}

    onModuleInit() {
        this.client.subscribeToResponseOf('outbox.event.ShortVideo', this);
    }

    @SubscribeTo('outbox.event.ShortVideo')
    async handle(
        data: any,
        key: any,
        offset: number,
        timestamp: number,
        partition: number,
        headers: IHeaders,
    ): Promise<void> {
        this.logger.log(
            `Received message: ${data}, at ${timestamp}
      with headers: ${JSON.stringify(headers)}`,
        );
        const messageId = headers['id'];
        const eventType = headers['eventType'];

        switch (eventType) {
            case 'VerifyShortVideo':
                await this.handleVerifyShortVideo(messageId, JSON.parse(data).payload as Record<string, unknown>);
                break;
            default:
        }
    }
    private async handleVerifyShortVideo(_messageId: string, _data: Record<any, unknown>): Promise<void> {
        const shortVideoId = new MongoObjectID(_data.shortVideoId);
        const exist = await this.shortVideoRepository.findOneBy({
            _id: shortVideoId,
        });
        if (exist && exist.messageIds.indexOf(_messageId) !== -1) {
            this.logger.error(`Message: ${_messageId}`);
            return;
        }
        exist.genre = JSON.parse(JSON.stringify(_data.genre)).name as string;
        exist.messageIds.push(_messageId);
        exist.privacy = _data.privacy as ShortVideoPrivacy;
        delete exist._id;
        await this.shortVideoRepository.update({ _id: shortVideoId }, { ...exist });
    }
}
