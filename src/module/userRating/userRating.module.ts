import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRating } from './entity/userRating.entity';
import { UserRatingRepository } from './repository/userRating.repository';
import { Module } from '@nestjs/common';
import { FilmGroup } from '../filmGroup/entity/filmGroup.entity';
import { FilmGroupRepository } from '../filmGroup/repository/filmGroup.repository';
import { UserRatingController } from './userRating.controller';
import { UserRatingService } from './userRating.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserRating, FilmGroup])],
    controllers: [UserRatingController],
    providers: [UserRatingService, UserRatingRepository, FilmGroupRepository],
    exports: [UserRatingService],
})
export class UserRatingModule {}
