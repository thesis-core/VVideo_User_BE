import { BadRequestException, Injectable } from '@nestjs/common';
import { FilmGroupRepository } from './repository/filmGroup.repository';
import { FilmGroup } from './entity/filmGroup.entity';
import { GetAllFilmGroupDto } from './dto/getAllFilmGroup.dto';
import { IncrementViewDto } from './dto/incrementView.dto';
import { MongoEventDispatcher, OutboxEvent } from 'nest-outbox-typeorm';
import { EntityManager } from 'typeorm/entity-manager/EntityManager';
import { FilmGroupEvent } from './event/filmGroup.event';
import { Response } from '../../shares/interceptors/response.interceptor';

@Injectable()
export class FilmGroupService {
    constructor(
        private filmGroupRepository: FilmGroupRepository,
        private entityManager: EntityManager,
        private mongoEventDispatcher: MongoEventDispatcher,
    ) {}

    async getAllFilmGroup(getAllFilmGroupDto: GetAllFilmGroupDto): Promise<Response<FilmGroup[]>> {
        const limit = Number(getAllFilmGroupDto.limit);

        const [data, total] = await this.filmGroupRepository.findAndCount({
            where: {
                isDeleted: false,
            },
        });
        return {
            data,
            metadata: {
                totalMatch: total,
                totalPage: Math.ceil(total / limit),
            },
        };
    }

    async getHighRatingFilmGroup(): Promise<FilmGroup[]> {
        return await this.entityManager.find(FilmGroup, {
            where: {
                isDeleted: false,
            },
            take: 1,
            order: {
                ratingCount: 'DESC',
            },
        });
    }
    async getNewestFilmGroup(): Promise<FilmGroup[]> {
        return await this.entityManager.find(FilmGroup, {
            where: {
                isDeleted: false,
            },
            take: 1,
            order: {
                createdAt: 'DESC',
            },
        });
    }

    async incrementViewCount(incrementViewDto: IncrementViewDto): Promise<void> {
        const filmGroup = await this.filmGroupRepository.findOneBy({ filmGroupId: incrementViewDto.filmGroupId });
        if (!filmGroup) {
            throw new BadRequestException({ message: 'Film Group is not exist ' });
        }
        filmGroup.viewCount += 1;
        await this.entityManager.transaction(async (tx) => {
            await this.filmGroupRepository.save(filmGroup);
            await this.mongoEventDispatcher.onDomainEvent(
                new FilmGroupEvent(
                    filmGroup.filmGroupId.toString(),
                    'FilmGroup',
                    filmGroup as unknown as Record<string, unknown>,
                ),
                async (outbox) => {
                    const outboxRecord = await tx.save(outbox);
                    await tx.delete(OutboxEvent, { id: outboxRecord.id });
                },
            );
        });
    }
}
