import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ShortVideo } from '../entity/shortVideo.entity';

@Injectable()
export class ShortVideoRepository extends Repository<ShortVideo> {
    constructor(private dataSource: DataSource) {
        super(ShortVideo, dataSource.createEntityManager());
    }

    // async getAllShortVideos(getAllShortVideosDto: GetAllShortVideosDto) {
    //     const videoList = this.find();
    //     return videoList;
    // const query = this.createQueryBuilder()
    // }
}
