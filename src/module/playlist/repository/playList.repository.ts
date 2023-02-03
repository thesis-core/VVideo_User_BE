import { Injectable } from '@nestjs/common';
import { DataSource, MongoRepository } from 'typeorm';
import { PlayList } from '../entity/playList.entity';

@Injectable()
export class PlayListRepository extends MongoRepository<PlayList> {
    constructor(private dataSource: DataSource) {
        super(PlayList, dataSource.createEntityManager());
    }
}
