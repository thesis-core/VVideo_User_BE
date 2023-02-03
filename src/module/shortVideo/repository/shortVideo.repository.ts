import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ShortVideo } from '../entity/shortVideo.entity';
import { GetAllShortVideosDto } from '../dto/getAllShortVideos.dto';

@Injectable()
export class ShortVideoRepository extends Repository<ShortVideo> {
    constructor(private dataSource: DataSource) {
        super(ShortVideo, dataSource.createEntityManager());
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
    async getAllShortVideos(getAllShortVideosDto: GetAllShortVideosDto) {
        const page = getAllShortVideosDto.page || 1;
        const limit = getAllShortVideosDto.limit || 10;
        return this.find({ take: limit, skip: (page - 1) * limit });
    }
}
