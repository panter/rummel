import { LoggerService } from '@nestjs/common';
import pino, { Level } from 'pino';
import { AppStorage } from '../../common/utils/als/storage';

export class AppPinoLogger implements LoggerService {
  constructor(protected readonly logger: pino.Logger) {}

  debug(message: any, ...optionalParams: any[]): any {
    this.call('debug', message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]): any {
    this.call('error', message, ...optionalParams);
  }

  log(message: any, ...optionalParams: any[]): any {
    this.call('info', message, ...optionalParams);
  }

  verbose(message: any, ...optionalParams: any[]): any {
    this.call('trace', message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any): any {
    this.call('warn', message, ...optionalParams);
  }

  private call(level: Level, payload: any, ...optionalParams: any[]) {
    //this might be tricky with unnamed loggers
    const loggerName: string | undefined = optionalParams?.pop();

    let transformedPayload: any = {
      loggerName,
    };
    transformedPayload.context = optionalParams.length
      ? optionalParams
      : undefined;

    try {
      const store = AppStorage.getStore();
      if (store) {
        transformedPayload.context = {
          ...transformedPayload.context,
          tenantId: store.tenantId,
          correlationId: store.correlationId,
          userId: store.user?.id,
        };
      }
    } catch (e) {
      //TODO: getStorage shouldn't throw
    }

    if (typeof payload == 'string' || payload instanceof String) {
      transformedPayload.message = payload;
    } else if (payload instanceof Error) {
      const { message, stack, name, ...rest } = payload;
      transformedPayload.message = message;
      transformedPayload.stack = stack;
      transformedPayload.name = name;
      transformedPayload = { ...rest, ...transformedPayload };
    } else if (payload?.extensions != undefined) {
      //apollo errors
      //todo structure need to be reviewed
      // const originalException = payload?.extensions?.exception;
      // if (originalException) {
      //   transformedPayload.message =
      //     payload.message || originalException.message;
      //   transformedPayload.stack = originalException.stacktrace;
      //   transformedPayload.name = originalException.name;
      // }
      transformedPayload = { ...payload, ...transformedPayload };
    } else {
      transformedPayload = { ...payload, ...transformedPayload };
    }
    this.logger[level](transformedPayload);
  }
}
