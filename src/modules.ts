import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from './ormconfig';
import { UserModule } from './module/user/user.module';

const Modules = [UserModule, TypeOrmModule.forRootAsync({ useFactory: ormConfig })];
export default Modules;
