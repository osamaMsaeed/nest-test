import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InjectPipes, InjectSwagger } from './core/injectors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
    cors: true,
  });
  InjectPipes(app);
  InjectSwagger(app);

  const defaultPort = 3000;
  await app.listen(process.env.APP_PORT || defaultPort);
  console.log(`App running on port ${process.env.APP_PORT || defaultPort}`);
}
bootstrap();
