import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class IncrementViewDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    filmGroupId: string;
}
