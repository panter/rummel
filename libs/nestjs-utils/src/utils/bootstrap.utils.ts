import { NestFactory } from '@nestjs/core';
import { INestApplication, INestApplicationContext } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ModuleInitializationException } from '../exceptions/module-initialization-exception';
import {
  logFatal,
  logModuleInitializationError,
} from '../logging/logging.utils';

/**
 * Try to create the app and handle any errors that occur during the process.
 * If an error occurs, log it and exit the process.
 * @param logger - The logger to use during the process
 * @param AppModule - The root module of the application
 */
export async function tryCreateApp(logger: Logger, AppModule: any) {
  let app: INestApplication | undefined = undefined;
  try {
    app = await NestFactory.create(AppModule, {
      bufferLogs: true,
      abortOnError: false,
      logger: logger,
    });
  } catch (err) {
    if (err instanceof ModuleInitializationException) {
      logModuleInitializationError(err, logger);
    } else {
      logFatal(logger, err);
    }
    await app?.close();
    process.exit(1);
  }
  return app;
}

export async function tryCreateAppContext(logger: Logger, AppModule: any) {
  let app: INestApplicationContext | undefined = undefined;
  try {
    app = await NestFactory.createApplicationContext(AppModule, {
      bufferLogs: true,
      abortOnError: false,
      logger: logger,
    });
  } catch (err) {
    if (err instanceof ModuleInitializationException) {
      logModuleInitializationError(err, logger);
    } else {
      logFatal(logger, err);
    }
    await app?.close();
    process.exit(1);
  }
  return app;
}
