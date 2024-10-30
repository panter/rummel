import { LoggerModule } from 'nestjs-pino';
import { DynamicModule, Module } from '@nestjs/common';
import { Request } from 'express';
import { ModuleAsyncOptions } from '../types';

const pinoLevelToGcpSeverity = {
  trace: 'DEBUG',
  debug: 'DEBUG',
  info: 'INFO',
  warn: 'WARNING',
  error: 'ERROR',
  fatal: 'CRITICAL',
} as const;

const messageKey = 'message' as const;

interface PinoLoggerModuleOptions {
  /**
   * Custom properties to be added to the log
   * @param req - Express request
   * @param res - Express response
   */
  customProps?: (req: Request, res: Response) => Record<string, any>;
  /**
   * Pretty log format
   */
  prettyLog?: boolean;
  /**
   * Log level
   */
  logLevel?: string;
}

export type PinoLoggerModuleAsyncOptions =
  ModuleAsyncOptions<PinoLoggerModuleOptions>;

@Module({})
export class PinoLoggerModule {
  private static getPinoHttpOptions(
    customProps: PinoLoggerModuleOptions['customProps'],
    logLevel: PinoLoggerModuleOptions['logLevel'],
    prettyLog: PinoLoggerModuleOptions['prettyLog'],
  ) {
    return {
      pinoHttp: {
        customProps,
        messageKey: messageKey,
        level: logLevel || 'trace',
        formatters: {
          level(label: keyof typeof pinoLevelToGcpSeverity, number: number) {
            return {
              severity:
                pinoLevelToGcpSeverity[label] || pinoLevelToGcpSeverity['info'],
              level: number,
            };
          },
        },
        customAttributeKeys: {
          req: 'httpRequest',
        },
        transport: prettyLog
          ? {
              target: 'pino-pretty',
              options: {
                singleLine: true,
                ignore: 'pid,hostname,httpRequest,user,tenantId,severity',
                translateTime: 'dd/mm/yyyy, HH:MM:ss.l',
                messageKey: messageKey,
                colorize: true,
              },
            }
          : undefined,
      },
    };
  }

  static forRoot({
    customProps,
    logLevel,
    prettyLog,
  }: PinoLoggerModuleOptions = {}): DynamicModule {
    return {
      module: PinoLoggerModule,
      imports: [
        LoggerModule.forRootAsync({
          useFactory: () => {
            return this.getPinoHttpOptions(customProps, logLevel, prettyLog);
          },
        }),
      ],
    };
  }

  static forRootAsync(options: PinoLoggerModuleAsyncOptions): DynamicModule {
    return {
      module: PinoLoggerModule,
      imports: [
        LoggerModule.forRootAsync({
          imports: options.imports || [],
          inject: options.inject || [],
          useFactory: async (...args: any[]) => {
            const { customProps, logLevel, prettyLog } =
              await options.useFactory(...args);
            return this.getPinoHttpOptions(customProps, logLevel, prettyLog);
          },
        }),
      ],
    };
  }
}
