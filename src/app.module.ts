import { Module } from '@nestjs/common';
import Modules from './modules';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
    imports: [...Modules],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
