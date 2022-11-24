import { Controller, Get } from '@nestjs/common';
import { FilmGroupService } from './filmGroup.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('film-group')
@ApiTags('film-group')
export class FilmGroupController {
    constructor(private filmGroupService: FilmGroupService) {}

    @Get()
    async testFilmGroup() {
        return this.filmGroupService.testFilmGroup();
    }
}
