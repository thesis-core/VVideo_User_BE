import { Injectable } from '@nestjs/common';
import { DataSource, MongoRepository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UserRepository extends MongoRepository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }
}
