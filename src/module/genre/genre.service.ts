import { Injectable } from '@nestjs/common';
import { GenreRepository } from './repository/genre.repository';

@Injectable()
export class GenreService {
    constructor(private genreRepository: GenreRepository) {}
    async getAllGenre(): Promise<any> {
        return await this.genreRepository.find();
    }
}
