import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class RateFilmGroupDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    filmGroupId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(5)
    rate: number;
}
