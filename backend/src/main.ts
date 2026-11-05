import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Film API')
    .setDescription('API афиши: фильмы, расписание сеансов и заказ билетов')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // UI: /api/docs, JSON-схема (для Postman): /api/docs-json
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
