import { BadRequestException, Injectable } from '@nestjs/common';
import { PlayListRepository } from './repository/playList.repository';
import { ObjectID } from 'typeorm';
import { CreatePlayListDto } from './dto/createPlayList.dto';
import { PlayList } from './entity/playList.entity';
import { VideoToPlayListDto } from './dto/videoToPlayList.dto';

@Injectable()
export class PlaylistService {
    constructor(private playListRepository: PlayListRepository) {}
    async createPlayList(playListDto: CreatePlayListDto, userId: ObjectID): Promise<void> {
        const playList = new PlayList();
        playList.userId = userId.toString();
        playList.filmGroupId = [];
        playList.name = playListDto.name;
        playList.description = playListDto.description;
        await this.playListRepository.save(playList);
    }
    async getPlayList(userId: ObjectID): Promise<PlayList[]> {
        return this.playListRepository.find({
            where: {
                userId: userId.toString(),
            },
        });
    }
    async addVideoToPlayList(videoToPlayListDto: VideoToPlayListDto, userId: ObjectID): Promise<void> {
        const playLists = await this.playListRepository.findOneBy({ userId: userId.toString() });
        const exist = playLists.filmGroupId.includes(videoToPlayListDto.filmId);
        if (exist) {
            throw new BadRequestException({ message: 'Film is already exist in playlist' });
        } else {
            playLists.filmGroupId.push(videoToPlayListDto.filmId);
            await this.playListRepository.update({ id: playLists.id }, playLists);
        }
    }
}
