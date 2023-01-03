import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { FilmService } from './film.service';
import { Film } from './entity/film.entity';
import { Response } from '../../shares/interceptors/response.interceptor';

@Controller('film')
@ApiBearerAuth()
@ApiTags('film')
// @Roles(Role.SUPER_ADMIN)
// @UseGuards(JWTAuthGuard, RolesGuard)
export class FilmController {
    constructor(private filmService: FilmService) {}

    @Get(':id')
    @ApiProperty({
        name: 'id',
        type: Number,
    })
    async getFilm(@Param('id') id: string): Promise<Response<Film>> {
        return this.filmService.getFilm(id);
    }
}
