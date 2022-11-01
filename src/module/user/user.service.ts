import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: UserRepository,
    ) {}

    async testMongo() {
        const user = new User();
        user.email = 'thai@gmail.com';
        user.password = 'aedssadsad';
        return await this.userRepository.save(user);
    }
}
