import { Injectable } from '@nestjs/common';
import { FilmGroupRepository } from './repository/filmGroup.repository';
import { FilmGroup } from './entity/filmGroup.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FilmGroupService {
    constructor(
        @InjectRepository(FilmGroup)
        private filmGroupRepository: FilmGroupRepository,
    ) {}

    async testFilmGroup() {}
}
