import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { CreatePlayListDto } from './dto/createPlayList.dto';
import { PlayList } from '../playlist/entity/playList.entity';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

    async createPlayList(playListDto: CreatePlayListDto, userId: string) {
        const user = await this.userRepository.findOneBy({ id: userId });
        const playList = new PlayList(playListDto.name, playListDto.description, playListDto.filmGroupId);
        user.playList.push(playList);
        await this.userRepository.save(user);
    }
}
