import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ShortVideoService } from './shortVideo.service';
import { JWTAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../user/entity/user.entity';
import { Request } from 'express';
import { ShortVideo } from './entity/shortVideo.entity';
import { ShortVideoDto } from './dto/shortVideo.dto';
import { GetAllShortVideosDto } from './dto/getAllShortVideos.dto';

@Controller('short-video')
@ApiTags('short-video')
@UseGuards(JWTAuthGuard)
@ApiBearerAuth()
export class ShortVideoController {
    constructor(private shortVideoService: ShortVideoService) {}

    @Get()
    async getAllShortVideos(@Query() getAllShortVideosDto: GetAllShortVideosDto): Promise<ShortVideo[] | any> {
        return this.shortVideoService.getAllShortVideos(getAllShortVideosDto);
    }

    // @Get('owner')
    // async getMyShortVideos(@Req() req: Request): Promise<ShortVideo[]> {
    //     const user: Partial<User> = req.user;
    //     return this.shortVideoService.getMyShortVideos(user._id);
    // }

    @Post('owner')
    @HttpCode(HttpStatus.OK)
    async createShortVideo(@Body() shortVideoDto: ShortVideoDto, @Req() req: Request): Promise<void> {
        const user: Partial<User> = req.user;
        return this.shortVideoService.createShortVideo(shortVideoDto, user._id.toString());
    }
}
