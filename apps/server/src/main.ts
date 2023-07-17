import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TrpcRouter } from './trpc/trpc.router';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import * as appInfo from '../package.json';

async function bootstrap() {
  const logger = new Logger(appInfo.name);
  const app = await NestFactory.create(AppModule, {
    logger:
      process.env.NODE_ENV === 'development'
        ? ['log', 'debug', 'error', 'verbose', 'warn']
        : ['log', 'error', 'warn'],
  });

  app.enableCors();

  const trpc = app.get(TrpcRouter);
  trpc.applyMiddleware(app);

  const configService = app.get(ConfigService);
  const port = configService.getOrThrow<number>('PORT');

  await app.listen(port, () => {
    logger.log(`Listening on ${port}`);
  });
}
bootstrap();
