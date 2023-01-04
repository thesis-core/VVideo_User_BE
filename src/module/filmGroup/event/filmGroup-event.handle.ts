import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { IHeaders, KafkaService, SubscribeTo } from '@rob3000/nestjs-kafka';
import { FilmGroupRepository } from '../repository/filmGroup.repository';
import { FilmGroup } from '../entity/filmGroup.entity';
import { Cast } from '../../cast/entity/cast.entity';
import { Director } from '../../director/entity/director.entity';
import { EntityManager } from 'typeorm/entity-manager/EntityManager';

@Injectable()
export class FilmGroupEventHandle implements OnModuleInit {
    private readonly logger = new Logger(FilmGroupEventHandle.name);

    constructor(
        private filmGroupRepository: FilmGroupRepository,
        private entityManager: EntityManager,
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
        const messageId = headers['id'];
        const eventType = headers['eventType'];

        switch (eventType) {
            case 'FilmGroupCreated':
                await this.handleFilmGroupCreated(messageId, JSON.parse(data).payload as Record<string, unknown>);
                break;
            case 'FilmGroupDeleted':
                await this.handleFilmGroupDeleted(messageId, JSON.parse(data).payload as Record<string, unknown>);
                break;
            default:
        }
    }
    private async handleFilmGroupCreated(_messageId: string, _data: Record<string, unknown>): Promise<void> {
        const filmGroup = new FilmGroup();

        const exist = await this.filmGroupRepository.findOneBy({
            filmGroupId: _data.id as string,
        });
        if (exist && exist._messageIds.indexOf(_messageId) !== -1) {
            this.logger.error(`Message: ${_messageId}`);
            return;
        }

        filmGroup.filmGroupId = _data.id as string;
        filmGroup.name = _data.name as string;
        filmGroup.country = _data.country as string;
        filmGroup.quality = _data.quality as string;
        filmGroup.duration = _data.duration as string;
        filmGroup.bannerUrl = _data.bannerUrl as string;
        filmGroup.trailerUrl = _data.trailerUrl as string;
        filmGroup.thumbnailUrl = _data.thumbnailUrl as string;
        filmGroup.viewCount = 0;
        filmGroup.ratingCount = 1;
        filmGroup.isDeleted = false;
        filmGroup.name = _data.country as string;
        filmGroup.createdAt = new Date(_data.createdAt as string);
        filmGroup.description = _data.description ? (_data.description as string) : null;
        const casts = _data.casts as Cast[];
        const directors = _data.directors as Director[];
        const newCasts = [];
        if (casts) {
            for (const cast of casts) {
                newCasts.push(new Cast(cast.name));
            }
        }
        const newDirectors = [];
        if (directors) {
            for (const newDirector of directors) {
                newDirectors.push(new Director(newDirector.name));
            }
        }

        filmGroup.casts = newCasts;
        filmGroup.directors = newDirectors;
        filmGroup._messageIds.push(_messageId);
        try {
            await this.entityManager.save(filmGroup);
        } catch (e) {
            this.logger.error(`Message : ${_messageId}`, e);
        }
    }

    private async handleFilmGroupDeleted(_messageId: string, _data: Record<string, unknown>): Promise<void> {
        const filmGroup = await this.filmGroupRepository.findOneBy({
            filmGroupId: _data.id as string,
        });
        if (filmGroup && filmGroup._messageIds.indexOf(_messageId) !== -1) {
            this.logger.error(`Message: ${_messageId}`);
            return;
        }
        filmGroup.isDeleted = true;
        try {
            await this.entityManager.save(filmGroup);
        } catch (e) {
            this.logger.error(`Message : ${_messageId}`, e);
        }
    }
}
