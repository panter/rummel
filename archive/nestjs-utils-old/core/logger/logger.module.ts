import { ConsoleLogger, DynamicModule, Injectable } from '@nestjs/common';
import pino from 'pino';

import { AppPinoLogger } from './app-pino-logger';
import { EnvShort, ModuleAsyncOptions } from '../../common';
import { AppLogger } from './app-logger';

type LoggerModuleOptions = pino.LoggerOptions & {
  env: EnvShort;
};

type LoggerModuleOptionsAsyncOptions = ModuleAsyncOptions<LoggerModuleOptions>;

@Injectable()
export class LoggerModule {
  static async forRootAsync({
    imports,
    inject,
    useFactory,
  }: LoggerModuleOptionsAsyncOptions): Promise<DynamicModule> {
    return {
      module: LoggerModule,
      imports: imports,
      providers: [
        AppPinoLogger,
        {
          inject,
          provide: AppLogger,
          useFactory: async (args) => {
            const options = await useFactory(args);
            if (options.env === EnvShort.local) {
              return new ConsoleLogger();
            } else {
              return new AppPinoLogger(
                pino({
                  level: 'trace',
                  messageKey: 'message',
                  errorKey: 'error',
                }),
              );
            }
          },
        },
      ],
      exports: [AppLogger],
    };
  }
}
