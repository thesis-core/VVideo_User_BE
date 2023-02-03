import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { ChangeUserInfoDto } from './dto/changeUserInfo.dto';
import { ObjectID } from 'typeorm';
import { MongoEventDispatcher } from 'nest-outbox-typeorm';
import { EntityManager } from 'typeorm/entity-manager/EntityManager';

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository,
        private entityManager: EntityManager,
        private mongoEventDispatcher: MongoEventDispatcher,
    ) {}

    async changeUserInfo(changeUserInfoDto: ChangeUserInfoDto, userId: ObjectID) {
        const { password, fullName, avatarUrl } = changeUserInfoDto;
        const user = await this.userRepository.findOneBy({ _id: userId });
        if (!user) {
            throw new BadRequestException('User is not exist');
        }
        const updateUser = {};
        if (password) {
            updateUser['password'] = password;
        }
        if (fullName) {
            updateUser['fullName'] = fullName;
            user.fullName = fullName;
        }
        if (avatarUrl) {
            updateUser['avatarUrl'] = avatarUrl;
            user.avatarUrl = avatarUrl;
        }
        return this.userRepository.update({ _id: userId }, updateUser);
    }

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
