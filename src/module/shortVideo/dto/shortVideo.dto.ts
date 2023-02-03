import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ShortVideoPrivacy } from '../entity/shortVideo.entity';

export class ShortVideoDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    url: string;

    @ApiPropertyOptional()
    @IsNotEmpty()
    @IsString()
    privacy?: ShortVideoPrivacy;
}
