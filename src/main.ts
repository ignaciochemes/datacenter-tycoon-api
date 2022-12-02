import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { ConfigService } from '@nestjs/config';
import * as BodyParser from 'body-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    app.enableCors({
        allowedHeaders: "*",
        origin: "*"
    });

    app.use(BodyParser.json())
    app.use(BodyParser.urlencoded({ extended: true }))
    app.setGlobalPrefix('ms-dtct-api');
    await app.listen(configService.get('PORT') || 30000);
    console.log(`\u001b[36mAPP NAME: ${configService.get('APP_NAME')} \n Listen to port: ` + configService.get('PORT'));
}
bootstrap();
