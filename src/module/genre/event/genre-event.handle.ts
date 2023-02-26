import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { GenreRepository } from '../repository/genre.repository';
import { EntityManager } from 'typeorm/entity-manager/EntityManager';
import { IHeaders, KafkaService, SubscribeTo } from '@rob3000/nestjs-kafka';
import { Genre } from '../entity/genre.entity';

@Injectable()
export class GenreEventHandle implements OnModuleInit {
    private readonly logger = new Logger(GenreEventHandle.name);

    constructor(
        private genreRepository: GenreRepository,
        private entityManager: EntityManager,
        @Inject('WEB_MOVIE_SERVICE') private readonly client: KafkaService,
    ) {}

    onModuleInit() {
        this.client.subscribeToResponseOf('outbox.event.Genre', this);
    }

    @SubscribeTo('outbox.event.Genre')
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
            case 'GenreCreated':
                await this.handleGenreCreated(messageId, JSON.parse(data).payload as Record<string, unknown>);
                break;
            default:
        }
    }

    private async handleGenreCreated(_messageId: string, _data: Record<string, unknown>): Promise<void> {
        const genre = new Genre();
        const exist = await this.genreRepository.findOneBy({
            genreId: _data.id as string,
        });
        if (exist && exist.messageIds.indexOf(_messageId) !== -1) {
            this.logger.error(`Message: ${_messageId}`);
            return;
        }
        genre.genreId = _data.id as string;
        genre.name = _data.name as string;
        genre.messageIds.push(_messageId);
        try {
            await this.entityManager.save(genre);
        } catch (e) {
            this.logger.error(`Message : ${_messageId}`, e);
        }
    }
}
