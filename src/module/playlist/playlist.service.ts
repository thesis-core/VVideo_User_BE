import { BadRequestException, Injectable } from '@nestjs/common';
import { PlayListRepository } from './repository/playList.repository';
import { ObjectID } from 'typeorm';
import { CreatePlayListDto } from './dto/createPlayList.dto';
import { PlayList } from './entity/playList.entity';
import { VideoToPlayListDto } from './dto/videoToPlayList.dto';
import { DeleteVideoFromPlayListDto } from './dto/deleteVideoFromPlayList.dto';
import { GetPlayListDto } from './dto/getPlayList.dto';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const MongoObjectID = require('mongodb').ObjectID;

@Injectable()
export class PlaylistService {
    constructor(private playListRepository: PlayListRepository) {}
    async createPlayList(playListDto: CreatePlayListDto, userId: ObjectID): Promise<void> {
        const playList = new PlayList();
        playList.userId = userId.toString();
        playList.filmGroupId = [];
        playList.name = playListDto.name;
        playList.description = playListDto.description;
        playList.type = playListDto.type;
        await this.playListRepository.save(playList);
    }
    async getPlayList(userId: ObjectID, getPlayListDto: GetPlayListDto): Promise<PlayList[]> {
        return this.playListRepository.find({
            where: {
                userId: userId.toString(),
                type: getPlayListDto.type,
            },
        });
    }
    async addVideoToPlayList(videoToPlayListDto: VideoToPlayListDto, userId: ObjectID): Promise<void> {
        const playListId = new MongoObjectID(videoToPlayListDto.playListId);
        const playLists = await this.playListRepository.findOneBy({
            userId: userId.toString(),
            _id: playListId,
        });
        if (!playLists) {
            throw new BadRequestException('Play list is not exist');
        }
        const exist = playLists.filmGroupId.includes(videoToPlayListDto.filmId);
        if (exist) {
            throw new BadRequestException({ message: 'Film is already exist in playlist' });
        } else {
            playLists.filmGroupId.push(videoToPlayListDto.filmId);
            await this.playListRepository.findOneAndUpdate({ _id: playListId }, { filmGroupId: playLists.filmGroupId });
        }
    }
    async deleteVideoFromPlayList(deleteVideoDto: DeleteVideoFromPlayListDto, userId: ObjectID): Promise<void> {
        const playLists = await this.playListRepository.findOneBy({ userId: userId.toString() });
        const exist = playLists.filmGroupId.includes(deleteVideoDto.filmId);
        if (exist) {
            throw new BadRequestException({ message: 'Film is already exist in playlist' });
        } else {
            const index = playLists.filmGroupId.indexOf(deleteVideoDto.filmId);
            if (index > -1) {
                // only splice array when item is found
                playLists.filmGroupId.splice(index, 1); // 2nd parameter means remove one item only
            } else {
                throw new BadRequestException('Video is not in play list');
            }
            await this.playListRepository.update({ id: playLists.id }, playLists);
        }
    }
}
