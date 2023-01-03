import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PlayList } from '../entity/playList.entity';

@Injectable()
export class PlayListRepository extends Repository<PlayList> {
    constructor(private dataSource: DataSource) {
        super(PlayList, dataSource.createEntityManager());
    }
}
