import { Injectable } from '@nestjs/common';
import { FilmGroupRepository } from './repository/filmGroup.repository';
import { FilmGroup } from './entity/filmGroup.entity';
import { Cast } from '../cast/entity/cast.entity';
import { CastRepository } from '../cast/repository/cast.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FilmGroupService {
    constructor(
        @InjectRepository(FilmGroup)
        private filmGroupRepository: FilmGroupRepository,
        @InjectRepository(Cast)
        private castRepository: CastRepository,
    ) {}

    async testFilmGroup() {
        const filmGroup = new FilmGroup();
        const casts = await this.castRepository.find();
        filmGroup.name = 'name';
        filmGroup.casts = casts;
        await this.filmGroupRepository.save(filmGroup);
        return 1;
        // filmGroup.description = 'description';
        // filmGroup.genre = 'genre';
        // filmGroup.thumbnail = 'thumbnail';
        // filmGroup.country = 'country';
        // filmGroup.trailer = 'trailer';
        // filmGroup.banner = 'banner';
        // filmGroup.duration = 'duration';
        // filmGroup.quality = 'quality';
        // filmGroup.filmZone = 'filmZone';
    }
}
