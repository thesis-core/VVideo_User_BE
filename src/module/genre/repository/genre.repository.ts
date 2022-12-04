import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Genre } from '../entity/genre.entity';

@Injectable()
export class GenreRepository extends Repository<Genre> {
    constructor(private dataSource: DataSource) {
        super(Genre, dataSource.createEntityManager());
    }
}
