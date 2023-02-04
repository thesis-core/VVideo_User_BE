import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ShortVideoDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    url: string;

    // @ApiPropertyOptional()
    // @IsNotEmpty()
    // @IsString()
    // privacy?: ShortVideoPrivacy;
}
