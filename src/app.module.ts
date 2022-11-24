import { Module } from '@nestjs/common';
import Modules from './modules';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { KafkaModule } from '@rob3000/nestjs-kafka';
import { MongoEventDispatcher } from 'nest-outbox-typeorm';
@Module({
    imports: [
        ...Modules,
        EventEmitterModule.forRoot({
            wildcard: true,
        }),
        KafkaModule.register([
            {
                name: 'WEB_MOVIE_SERVICE',
                options: {
                    client: {
                        clientId: 'web-movie',
                        brokers: process.env.KAFKA_BROKERS.split(','),
                        ssl: !!process.env.KAFKA_SECURITY,
                        sasl: !!process.env.KAFKA_SECURITY
                            ? {
                                  mechanism: 'plain',
                                  username: process.env.KAFKA_API_KEY,
                                  password: process.env.KAFKA_API_SECRET,
                              }
                            : undefined,
                    },
                    consumer: {
                        groupId: 'web-service',
                    },
                },
            },
        ]),
    ],
    controllers: [AppController],
    providers: [AppService, MongoEventDispatcher],
})
export class AppModule {}
