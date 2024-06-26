import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggerInterceptor } from './shared/interceptors/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new LoggerInterceptor());
  app.setGlobalPrefix('api');

  app.enableShutdownHooks(); // prisma db, shared/services/prisma connect

  await app.listen(3000);
}
bootstrap();

// module 34 step 1: https://github.com/ufsowa/module34/commit/a147131587b4aed1164a9938dd5405bd7317928d
