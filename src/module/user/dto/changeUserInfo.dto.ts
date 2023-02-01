import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ChangeUserInfoDto {
    @ApiPropertyOptional()
    @IsOptional()
    password: string;

    @ApiPropertyOptional()
    @IsOptional()
    fullName: string;

    @ApiPropertyOptional()
    @IsOptional()
    avatarUrl: string;
}
