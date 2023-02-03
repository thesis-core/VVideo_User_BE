import { PaginationDto } from '../../../shares/pagination/pagination.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetAllFilmGroupDto extends PaginationDto {
    @ApiProperty({ required: false })
    search: string;

    @ApiProperty({ required: false })
    genre: string;

    @ApiProperty({ required: false })
    country: string;

    @ApiProperty({ required: false })
    orderBy: string;
}
