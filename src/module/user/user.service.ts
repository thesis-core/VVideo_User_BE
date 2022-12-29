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

    // async createPlayList(playListDto: CreatePlayListDto, userId: string) {
    //     const user = this.userRepository.findOneBy({ id: userId });
    //     const playList = new PlayList(playListDto.name, playListDto.description, playListDto.filmGroupId);
    // }
}
