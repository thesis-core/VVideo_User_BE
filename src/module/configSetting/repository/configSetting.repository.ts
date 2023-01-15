import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ConfigSetting } from '../entity/configSetting.entity';

@Injectable()
export class ConfigSettingRepository extends Repository<ConfigSetting> {
    constructor(private dataSource: DataSource) {
        super(ConfigSetting, dataSource.createEntityManager());
    }
}
