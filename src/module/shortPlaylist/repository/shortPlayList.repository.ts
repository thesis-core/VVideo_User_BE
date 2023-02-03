import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ShortPlayList } from '../entity/shortPlayList.entity';

@Injectable()
export class ShortPlayListRepository extends Repository<ShortPlayList> {
    constructor(private dataSource: DataSource) {
        super(ShortPlayList, dataSource.createEntityManager());
    }
}
