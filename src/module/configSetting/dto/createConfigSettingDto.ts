import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateConfigSettingDto {
    @ApiProperty({
        required: true,
    })
    @IsNotEmpty()
    value: any;
}
