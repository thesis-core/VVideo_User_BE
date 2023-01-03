import { Controller, UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PlaylistService } from './playlist.service';

@Controller('playlist')
@UseGuards(JWTAuthGuard)
@ApiBearerAuth()
@ApiTags('playlist')
export class PlaylistController {
    constructor(private playListService: PlaylistService) {}

    // @Post('playlist')
    // @HttpCode(HttpStatus.CREATED)
    // async createPlayList(@Body() playListDto: CreatePlayListDto, @Req() req: Request) {
    //     return 1;
    // }
}
