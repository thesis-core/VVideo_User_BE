import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { defaultConfig } from './module/database/database.config';

const ormconfig = (): TypeOrmModuleOptions => {
    return {
        ...defaultConfig,
    };
};
export default ormconfig;
