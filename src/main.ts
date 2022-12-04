import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from './shares/interceptors/response.interceptor';
import { HttpExceptionFilter } from './shares/filters/httpException.filter';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    const port = process.env.PORT || 8081;
    const appName = process.env.APP_NAME || 'test';
    const config = new DocumentBuilder()
        .setTitle('VVideo')
        .setDescription('The cats VVideo api')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document, {
        customSiteTitle: appName,
        swaggerOptions: {
            docExpansion: 'list',
            filter: true,
            displayRequestDuration: true,
        },
    });
    app.useGlobalInterceptors(new ResponseInterceptor());
    app.useGlobalFilters(new HttpExceptionFilter());
    const logger = new Logger();
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    app.useGlobalPipes(
        new ValidationPipe({
            transformOptions: {
                enableImplicitConversion: true, // allow conversion underneath
            },
        }),
    );
    await app.listen(port);
    logger.log(`Application is running on: ${port}`);
}

bootstrap();
