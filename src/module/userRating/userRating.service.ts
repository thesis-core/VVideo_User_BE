import { Injectable } from '@nestjs/common';
import { UserRatingRepository } from './repository/userRating.repository';
import { RateFilmGroupDto } from './dto/rateFilmGroup.dto';
import { UserRating } from './entity/userRating.entity';
import { FilmGroupRepository } from '../filmGroup/repository/filmGroup.repository';
import { EntityManager } from 'typeorm/entity-manager/EntityManager';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const MongoObjectID = require('mongodb').ObjectID;
@Injectable()
export class UserRatingService {
    constructor(
        private userRatingRepository: UserRatingRepository,
        private entityManager: EntityManager,
        private filmGroupRepository: FilmGroupRepository,
    ) {}

    async rateFilmGroup(rateFilmGroupDto: RateFilmGroupDto, userId: string): Promise<void> {
        const userRating = await this.userRatingRepository.findOneBy({
            filmGroupId: rateFilmGroupDto.filmGroupId,
            userId: userId,
        });
        const filmGroup = await this.filmGroupRepository.findOneBy({
            filmGroupId: rateFilmGroupDto.filmGroupId,
        });
        if (!userRating) {
            const newUserRating = new UserRating();
            newUserRating.userId = userId;
            newUserRating.filmGroupId = rateFilmGroupDto.filmGroupId;
            newUserRating.rate = rateFilmGroupDto.rate;
            filmGroup.avgRating =
                (filmGroup.avgRating * filmGroup.ratingCount + rateFilmGroupDto.rate) / (filmGroup.ratingCount + 1);
            filmGroup.ratingCount += 1;
            delete filmGroup._id;
            await this.filmGroupRepository.update({ filmGroupId: rateFilmGroupDto.filmGroupId }, { ...filmGroup });
            await this.userRatingRepository.save(newUserRating);
        } else {
            filmGroup.avgRating =
                filmGroup.avgRating + (rateFilmGroupDto.rate - userRating.rate) / filmGroup.ratingCount;
            userRating.rate = rateFilmGroupDto.rate;
            delete filmGroup._id;
            const userRatingId = MongoObjectID(userRating._id);
            delete userRating._id;
            await this.filmGroupRepository.update({ filmGroupId: rateFilmGroupDto.filmGroupId }, { ...filmGroup });
            await this.userRatingRepository.update({ _id: userRatingId }, { ...userRating });
        }
    }
}
