import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Film } from '../entity/film.entity';

@Injectable()
export class FilmRepository extends Repository<Film> {
    constructor(private dataSource: DataSource) {
        super(Film, dataSource.createEntityManager());
    }
}
