import { PaginationDto } from '../../../shares/pagination/pagination.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetAllFilmGroupDto extends PaginationDto {
    @ApiProperty({ required: false })
    search: string;
}
