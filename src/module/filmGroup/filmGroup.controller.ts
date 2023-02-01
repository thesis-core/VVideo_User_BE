import { Controller, Get, HttpCode, HttpStatus, Param, Patch, Query } from '@nestjs/common';
import { FilmGroupService } from './filmGroup.service';
import { ApiTags } from '@nestjs/swagger';
import { GetAllFilmGroupDto } from './dto/getAllFilmGroup.dto';
import { FilmGroup } from './entity/filmGroup.entity';
import { IncrementViewDto } from './dto/incrementView.dto';
import { Response } from '../../shares/interceptors/response.interceptor';

@Controller('film-group')
@ApiTags('film-group')
export class FilmGroupController {
    constructor(private filmGroupService: FilmGroupService) {}

    @Get()
    async getAllFilmGroup(@Query() getAllFilmGroupDto: GetAllFilmGroupDto): Promise<Response<FilmGroup[]>> {
        return this.filmGroupService.getAllFilmGroup(getAllFilmGroupDto);
    }

    @Get(':id')
    async getFilmGroup(@Param('id') id: string) {
        return this.filmGroupService.getFilmGroup(id);
    }

    @Get('high-rating')
    async getHighRatingFilmGroup(): Promise<FilmGroup[]> {
        return this.filmGroupService.getHighRatingFilmGroup();
    }

    @Get('newest')
    async getNewestFilmGroup(): Promise<FilmGroup[]> {
        return this.filmGroupService.getNewestFilmGroup();
    }

    @Patch('increment-view')
    @HttpCode(HttpStatus.OK)
    async incrementViewCount(@Query() incrementViewDto: IncrementViewDto): Promise<void> {
        return this.filmGroupService.incrementViewCount(incrementViewDto);
    }
}
