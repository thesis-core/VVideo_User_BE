import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, Max } from 'class-validator';

export class PaginationDto {
    @ApiPropertyOptional({ example: 1 })
    @Transform(({ value }) => Number(value))
    @IsInt()
    @IsPositive()
    @IsOptional()
    page?: number = 1;

    @ApiPropertyOptional({ example: 20 })
    @Transform(({ value }) => Number(value))
    @IsInt()
    @Max(100)
    @IsPositive()
    @IsOptional()
    limit?: number = 10;

    @Transform(({ value }) => Number(value))
    @IsInt()
    @IsOptional()
    skip?: number = 0;
}
