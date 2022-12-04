import { DataSource, Repository } from 'typeorm';
import { FilmGroup } from '../entity/filmGroup.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilmGroupRepository extends Repository<FilmGroup> {
    constructor(private dataSource: DataSource) {
        super(FilmGroup, dataSource.createEntityManager());
    }
}
