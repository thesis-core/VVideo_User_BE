import { Injectable } from '@nestjs/common';
import { ConfigSettingRepository } from './repository/configSetting.repository';
import { ConfigSetting } from './entity/configSetting.entity';
import { ConfigSettingConstant } from './configSetting.constant';

@Injectable()
export class ConfigSettingService {
    constructor(private configSettingRepository: ConfigSettingRepository) {}
    async getConfigSettingFilmGroup(id: number): Promise<ConfigSetting> {
        const key = `${ConfigSettingConstant.SETTING_FILM}_${id}`;
        return await this.configSettingRepository.findOneBy({ key: key });
    }
}
