import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const validationOptions = {
    validationError: { target: false },
  };
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  await app.listen(process.env.APP_PORT || 5000);
}
bootstrap();
