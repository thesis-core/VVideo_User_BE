import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from './ormconfig';
import { UserModule } from './module/user/user.module';
import { FilmGroupModule } from './module/filmGroup/filmGroup.module';

const Modules = [UserModule, FilmGroupModule, TypeOrmModule.forRootAsync({ useFactory: ormConfig })];
export default Modules;
