import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { PlayListType } from '../entity/playList.entity';

export class GetPlayListDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(PlayListType)
    type: PlayListType;
}
