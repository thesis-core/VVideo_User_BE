import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserRating } from '../entity/userRating.entity';

@Injectable()
export class UserRatingRepository extends Repository<UserRating> {
    constructor(private dataSource: DataSource) {
        super(UserRating, dataSource.createEntityManager());
    }
}
