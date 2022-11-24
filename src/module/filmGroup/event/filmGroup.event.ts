import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { IHeaders, KafkaService, SubscribeTo } from '@rob3000/nestjs-kafka';
import { FilmGroupRepository } from '../repository/filmGroup.repository';

@Injectable()
export class FilmGroupEvent implements OnModuleInit {
    private readonly logger = new Logger(FilmGroupEvent.name);

    constructor(
        private filmGroupRepository: FilmGroupRepository,
        @Inject('WEB_MOVIE_SERVICE') private readonly client: KafkaService,
    ) {}

    onModuleInit() {
        this.client.subscribeToResponseOf('outbox.event.FilmGroup', this);
    }

    @SubscribeTo('outbox.event.FilmGroup')
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
        // const messageId = headers['id'];
        // const eventType = headers['eventType'];
        // eslint-disable-next-line no-console
        console.log('sadsadsadsa', JSON.parse(data).payload);

        //
        // switch (eventType) {
        //     case 'FilmCreated':
        //         await this.handleFilmCreated(messageId, JSON.parse(data).payload as Record<string, unknown>);
        //         break;
        //     default:
        // }
    }
    // private async handleFilmCreated(
    //     _messageId: string,
    //     _data: Record<string, unknown>,
    // ): Promise<void> {
    //     const filmGroup = new FilmGroup();
    //     film.filmId = _data.id as string;
    //     film.name = _data.name as string;
    //     film.description = _data.description ? (_data.description as string) : null;
    //     film._messageIds.push(_messageId);
    //
    //     try {
    //         await this.filmRepo.persistAndFlush(film);
    //     } catch (e) {
    //         this.logger.error(e);
    //         this.logger.log(`Message: ${_messageId}`);
    //     }
    // }
}
