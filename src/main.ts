import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true, // TO DO, when we have a prod URL change this to match it
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Transforms payload to DTO instance
      whitelist: true, // Strips non-decorated properties
      forbidNonWhitelisted: true, // Throws errors for non-whitelisted properties
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((error) => console.error(error));
