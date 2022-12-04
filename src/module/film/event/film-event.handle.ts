import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EntityManager } from 'typeorm/entity-manager/EntityManager';
import { IHeaders, KafkaService, SubscribeTo } from '@rob3000/nestjs-kafka';
import { FilmRepository } from '../repository/film.repository';
import { Film } from '../entity/film.entity';

@Injectable()
export class FilmEventHandle implements OnModuleInit {
    private readonly logger = new Logger(FilmEventHandle.name);

    constructor(
        private filmRepository: FilmRepository,
        private entityManager: EntityManager,
        @Inject('WEB_MOVIE_SERVICE') private readonly client: KafkaService,
    ) {}

    onModuleInit() {
        this.client.subscribeToResponseOf('outbox.event.Film', this);
    }

    @SubscribeTo('outbox.event.Film')
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
            case 'FilmCreated':
                await this.handleFilmCreated(messageId, JSON.parse(data).payload as Record<string, unknown>);
                break;
            default:
        }
    }

    private async handleFilmCreated(_messageId: string, _data: Record<string, unknown>): Promise<void> {
        const film = new Film();
        film._messageIds.push(_messageId);
        film.filmId = _data.id as string;
        film.url = _data.url as string;
        try {
            await this.filmRepository.save(film);
        } catch (e) {
            this.logger.error(`Message : ${_messageId}`, e);
        }
    }
}
