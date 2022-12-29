import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RateFilmGroupDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    filmGroupId: string;

    @ApiProperty()
    @IsNumber()
    @IsString()
    rate: number;
}
