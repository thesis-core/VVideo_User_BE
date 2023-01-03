import { Injectable } from '@nestjs/common';
import { PlayListRepository } from './repository/playList.repository';

@Injectable()
export class PlaylistService {
    constructor(private playListRepository: PlayListRepository) {}
}
