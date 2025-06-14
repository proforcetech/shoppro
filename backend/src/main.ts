import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  // This makes the server accessible from outside its own container/localhost
  await app.listen(3000, '0.0.0.0');
}
bootstrap();