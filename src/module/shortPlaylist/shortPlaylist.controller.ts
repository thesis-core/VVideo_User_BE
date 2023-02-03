import { Controller, UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ShortVideoService } from '../shortVideo/shortVideo.service';

@Controller('short-playlist')
@UseGuards(JWTAuthGuard)
@ApiBearerAuth()
@ApiTags('short-playlist')
export class ShortPlaylistController {
    constructor(private shortVideoService: ShortVideoService) {}
}
