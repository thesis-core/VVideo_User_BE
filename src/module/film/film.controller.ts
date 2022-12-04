import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FilmService } from './film.service';

@Controller('film')
@ApiBearerAuth()
@ApiTags('film')
// @Roles(Role.SUPER_ADMIN)
// @UseGuards(JWTAuthGuard, RolesGuard)
export class FilmController {
    constructor(private filmService: FilmService) {}
}
