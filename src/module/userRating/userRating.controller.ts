import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserRatingService } from './userRating.service';
import { Request } from 'express';
import { RateFilmGroupDto } from './dto/rateFilmGroup.dto';
import { User } from '../user/entity/user.entity';
import { JWTAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('user-rating')
@ApiBearerAuth()
@ApiTags('user-rating')
export class UserRatingController {
    constructor(private userRatingService: UserRatingService) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    @UseGuards(JWTAuthGuard)
    async rateFilmGroup(@Body() rateFilmGroupDto: RateFilmGroupDto, @Req() req: Request): Promise<void> {
        const user: Partial<User> = req.user;
        return this.userRatingService.rateFilmGroup(rateFilmGroupDto, user._id.toString());
    }
}
