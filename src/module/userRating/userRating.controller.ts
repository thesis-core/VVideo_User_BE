import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserRatingService } from './userRating.service';
import { Request } from 'express';
import { RateFilmGroupDto } from './dto/rateFilmGroup.dto';
import { User } from '../user/entity/user.entity';

@Controller('user-rating')
@ApiTags('user-rating')
export class UserRatingController {
    constructor(private userRatingService: UserRatingService) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    async rateFilmGroup(@Body() rateFilmGroupDto: RateFilmGroupDto, @Req() req: Request): Promise<void> {
        const user: Partial<User> = req.user;
        return this.userRatingService.rateFilmGroup(rateFilmGroupDto, user._id.toString());
    }
}
