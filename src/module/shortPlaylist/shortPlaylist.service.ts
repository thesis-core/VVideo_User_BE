import { Injectable } from '@nestjs/common';
import { ShortPlayListRepository } from './repository/shortPlayList.repository';

@Injectable()
export class ShortPlaylistService {
    constructor(private shortPlayListRepository: ShortPlayListRepository) {}
}
