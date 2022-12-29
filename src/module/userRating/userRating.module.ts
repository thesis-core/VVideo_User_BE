import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../user/user.controller';
import { UserService } from '../user/user.service';
import { UserRating } from './entity/userRating.entity';
import { UserRatingRepository } from './repository/userRating.repository';
import { Module } from '@nestjs/common';
import { FilmGroup } from '../filmGroup/entity/filmGroup.entity';
import { FilmGroupRepository } from '../filmGroup/repository/filmGroup.repository';

@Module({
    imports: [TypeOrmModule.forFeature([UserRating, FilmGroup])],
    controllers: [UserController],
    providers: [UserService, UserRatingRepository, FilmGroupRepository],
    exports: [UserService],
})
export class UserRatingModule {}
