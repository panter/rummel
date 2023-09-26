import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as process from 'process';
import { asyncLocalStorageMiddleware, exceptionFactory } from '../common';
import { AppLogger } from './logger/app-logger';

export interface BootstrapOptions {
  entryModule: any;
}

const logger = new Logger('Bootstrap');

export const bootstrap = async ({
  entryModule,
}: BootstrapOptions): Promise<INestApplication> => {
  const app = await NestFactory.create(entryModule, { bufferLogs: true });
  app.useLogger(app.get(AppLogger));
  app.flushLogs();
  app.use(asyncLocalStorageMiddleware);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory,
    }),
  );

  app.use(cookieParser());
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.enableShutdownHooks();
  return app;
};

process.on('unhandledRejection', (err: any) => {
  logger.error(err, err.stack);
  logger.log('Shutting down... (exitCode=1)');
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error(err, err.stack);
  logger.log('Shutting down... (exitCode=1)');
  process.exit(1);
});
