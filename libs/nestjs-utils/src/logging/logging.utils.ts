import { Logger } from 'nestjs-pino';
import { Logger as BaseLogger } from '@nestjs/common/services/logger.service';
import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ModuleInitializationException } from '../exceptions/module-initialization-exception';

/**
 * Create custom logger to use it during the bootstrap process and unhandled errors.
 */
export async function createLogger(LoggerModule: any) {
  @Module({
    imports: [LoggerModule],
  })
  class TempModule {}

  const tmpApp = await NestFactory.createApplicationContext(TempModule, {
    logger: false,
    abortOnError: false,
  });
  await tmpApp.close();
  return tmpApp.get(Logger);
}

/**
 * Log the error with fatal severity, fallback with console if the custom logger isn't initialized properly.
 * @param logger
 * @param err
 * @param msg
 */
export function logFatal(logger: Logger, err: unknown, msg?: string) {
  if (logger) {
    logger.fatal(err, msg);
    BaseLogger.flush();
  } else {
    try {
      console.error(
        JSON.stringify({
          severity: 'FATAL',
          message: msg,
          error: err,
          time: Date.now(),
        }),
      );
    } catch {
      // stringify error has failed, log the error as unstructured log
      console.error(err, msg);
    }
  }
}

/**
 * Log a module initialization error and its cause.
 * @param e The error to log
 * @param logger The logger to use
 */
export const logModuleInitializationError = (
  e: ModuleInitializationException,
  logger: any,
) => {
  let stack = e.stack || '';
  if (e.cause) {
    if (e.cause instanceof AggregateError) {
      stack += joinAggregateErrorStacks(e.cause);
    } else {
      stack += `\n${e.cause.stack || e.cause.message}`;
    }
  }
  logFatal(logger, stack, e.message);
};

/**
 * Join the stack traces of all errors in an AggregateError into a single string.
 * Structure: {aggregated error stack}{\n->}{error stack} where -> indicates sibling stack traces of an AggregateError.
 * @param e an AggregateError
 */
const joinAggregateErrorStacks = (e: AggregateError): string => {
  let stack = e.stack || '';
  stack += `${e.errors.map((err) => `\n->${err.stack || err.message}`).join()}`;
  return stack;
};
