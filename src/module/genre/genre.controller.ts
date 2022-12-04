import { Controller, Get } from '@nestjs/common';
import { GenreService } from './genre.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('genre')
@ApiBearerAuth()
@ApiTags('genre')
// @Roles(Role.SUPER_ADMIN)
// @UseGuards(JWTAuthGuard, RolesGuard)
export class GenreController {
    constructor(private genreService: GenreService) {}

    @Get()
    async getAllGenre(): Promise<any> {
        return this.genreService.getAllGenre();
    }
}
