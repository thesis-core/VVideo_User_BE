import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigSetting } from './entity/configSetting.entity';
import { ConfigSettingService } from './configSetting.service';
import { ConfigSettingController } from './configSetting.controller';
import { ConfigSettingRepository } from './repository/configSetting.repository';
import { ConfigSettingEventHandle } from './event/configSetting-event.handle';

@Module({
    imports: [TypeOrmModule.forFeature([ConfigSetting])],
    providers: [ConfigSettingService, ConfigSettingRepository, ConfigSettingEventHandle],
    controllers: [ConfigSettingController],
    exports: [ConfigSettingService],
})
export class ConfigSettingModule {}
