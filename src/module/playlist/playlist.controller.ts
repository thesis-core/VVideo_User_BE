import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PlaylistService } from './playlist.service';
import { CreatePlayListDto } from './dto/createPlayList.dto';
import { User } from '../user/entity/user.entity';
import { Request } from 'express';
import { VideoToPlayListDto } from './dto/videoToPlayList.dto';
import { PlayList } from './entity/playList.entity';
import { DeleteVideoFromPlayListDto } from './dto/deleteVideoFromPlayList.dto';

@Controller('playlist')
@UseGuards(JWTAuthGuard)
@ApiBearerAuth()
@ApiTags('playlist')
export class PlaylistController {
    constructor(private playListService: PlaylistService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createPlayList(@Body() playListDto: CreatePlayListDto, @Req() req: Request): Promise<void> {
        const user: Partial<User> = req.user;
        return this.playListService.createPlayList(playListDto, user._id);
    }

    @Get()
    async getPlayList(@Req() req: Request): Promise<PlayList[]> {
        const user: Partial<User> = req.user;
        return this.playListService.getPlayList(user._id);
    }

    @Post('add-to-playlist')
    @HttpCode(HttpStatus.OK)
    async addVideoToPlayList(@Body() videoToPlayListDto: VideoToPlayListDto, @Req() req: Request): Promise<void> {
        const user: Partial<User> = req.user;
        return this.playListService.addVideoToPlayList(videoToPlayListDto, user._id);
    }
    @Delete('delete-from-playlist')
    @HttpCode(HttpStatus.OK)
    async deleteVideoFromPlayList(
        @Body() deleteVideoDto: DeleteVideoFromPlayListDto,
        @Req() req: Request,
    ): Promise<void> {
        const user: Partial<User> = req.user;
        return this.playListService.deleteVideoFromPlayList(deleteVideoDto, user._id);
    }
}
