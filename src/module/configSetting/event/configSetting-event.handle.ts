import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { IHeaders, KafkaService, SubscribeTo } from '@rob3000/nestjs-kafka';
import { EntityManager } from 'typeorm/entity-manager/EntityManager';
import { ConfigSettingRepository } from '../repository/configSetting.repository';
import { ConfigSetting } from '../entity/configSetting.entity';

@Injectable()
export class ConfigSettingEventHandle implements OnModuleInit {
    private readonly logger = new Logger(ConfigSettingEventHandle.name);

    constructor(
        private configSettingRepository: ConfigSettingRepository,
        private entityManager: EntityManager,
        @Inject('WEB_MOVIE_SERVICE') private readonly client: KafkaService,
    ) {}

    onModuleInit() {
        this.client.subscribeToResponseOf('outbox.event.ConfigSetting', this);
    }

    @SubscribeTo('outbox.event.ConfigSetting')
    async handle(
        data: any,
        key: any,
        offset: number,
        timestamp: number,
        partition: number,
        headers: IHeaders,
    ): Promise<void> {
        this.logger.log(
            `Received message: ${data}, at ${timestamp}
      with headers: ${JSON.stringify(headers)}`,
        );
        const messageId = headers['id'];
        const eventType = headers['eventType'];
        switch (eventType) {
            case 'ConfigSettingCreated':
                await this.configSettingCreated(messageId, JSON.parse(data).payload as Record<string, unknown>);
                break;
            case 'ConfigSettingUpdated':
                await this.configSettingUpdated(messageId, JSON.parse(data).payload as Record<string, unknown>);
                break;
            default:
        }
    }
    private async configSettingCreated(_messageId: string, _data: Record<string, unknown>): Promise<void> {
        const configSetting = new ConfigSetting();

        const exist = await this.configSettingRepository.findOneBy({
            configSettingId: _data.id as string,
        });
        if (exist && exist._messageIds.indexOf(_messageId) !== -1) {
            this.logger.error(`Message: ${_messageId}`);
            return;
        }
        configSetting.configSettingId = _data.id as string;
        configSetting.key = _data.key as string;
        configSetting.value = _data.value as string;
        configSetting._messageIds.push(_messageId);
        try {
            await this.entityManager.save(configSetting);
        } catch (e) {
            this.logger.error(`Message : ${_messageId}`, e);
        }
    }

    private async configSettingUpdated(_messageId: string, _data: Record<string, unknown>): Promise<void> {
        const configSetting = await this.configSettingRepository.findOneBy({
            configSettingId: _data.id as string,
        });
        if (configSetting && configSetting._messageIds.indexOf(_messageId) !== -1) {
            this.logger.error(`Message: ${_messageId}`);
            return;
        }
        configSetting.key = _data.key as string;
        configSetting.value = _data.value as string;
        configSetting._messageIds.push(_messageId);
        try {
            await this.entityManager.save(configSetting);
        } catch (e) {
            this.logger.error(`Message : ${_messageId}`, e);
        }
    }
}
