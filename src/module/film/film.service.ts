import { Injectable } from '@nestjs/common';
import { FilmRepository } from './repository/film.repository';

@Injectable()
export class FilmService {
    constructor(private filmRepository: FilmRepository) {}
}
