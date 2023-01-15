import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { ConfigSettingService } from './configSetting.service';
import { ConfigSetting } from './entity/configSetting.entity';

@Controller('config-setting')
@ApiBearerAuth()
@ApiTags('config-setting')
export class ConfigSettingController {
    constructor(private configSettingService: ConfigSettingService) {}

    @Get('film-group/:id')
    @ApiProperty({
        name: 'id',
        type: Number,
    })
    async getConfigSettingFilmGroup(@Param('id') id: number): Promise<ConfigSetting> {
        return this.configSettingService.getConfigSettingFilmGroup(id);
    }
}
