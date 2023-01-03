import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

    // async createPlayList(playListDto: CreatePlayListDto, userId: ObjectID) {
    //     const user = await this.userRepository.findOneBy({ _id: userId });
    //     const playList = new PlayList(playListDto.name, playListDto.description, playListDto.filmGroupId);
    //     if (user.playList) {
    //         user.playList.push(playList);
    //     } else {
    //         user.playList = [playList];
    //     }
    //     await this.userRepository.update({ _id: userId }, user);
    // }
    // async addVideoToPlayList(videoToPlayListDto: VideoToPlayListDto, userId: ObjectID) {
    //     const user = await this.userRepository.findOneBy({ _id: userId });
    //     console.log(user.playList.);
    // }
}
