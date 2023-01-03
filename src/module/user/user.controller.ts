import { Controller, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JWTAuthGuard)
@ApiBearerAuth()
@ApiTags('users')
export class UserController {
    constructor(private userService: UserService) {}

    // @Post('playlist')
    // @HttpCode(HttpStatus.CREATED)
    // async createPlayList(@Body() playListDto: CreatePlayListDto, @Req() req: Request): Promise<void> {
    //     const user: Partial<User> = req.user;
    //     return this.userService.createPlayList(playListDto, user._id);
    // }
    //
    // @Post('add-to-playlist')
    // @HttpCode(HttpStatus.CREATED)
    // async addVideoToPlayList(@Body() videoToPlayListDto: VideoToPlayListDto, @Req() req: Request): Promise<any> {
    //     const user: Partial<User> = req.user;
    //     return this.userService.addVideoToPlayList(videoToPlayListDto, user._id);
    // }
}
