import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class VideoToPlayListDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    filmId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    playListId: string;
}
