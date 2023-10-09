import {
  DynamicModule,
  Inject,
  Logger,
  OnApplicationShutdown,
} from '@nestjs/common';

import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import { addExtensionMethods } from '@sentry/tracing';
import { SentryModuleConfigurationException } from './sentry-module-configuration.exception';
import { EnvShort, ModuleAsyncOptions, SentryPlugin } from '../../common';

export const SENTRY_MODULE_OPTIONS = 'SENTRY_MODULE_OPTIONS';

export interface SentryModuleOptions {
  dsn?: string;
  env: EnvShort;

  /**
   * Number between 0 and 1 indicating percentage of requests sampled
   */
  tracesSampleRate: number;
}

export type SentryModuleAsyncOptions = ModuleAsyncOptions<SentryModuleOptions>;

export const sentryLogger = new Logger('Sentry');

//https://github.com/getsentry/sentry-javascript/issues/5431
addExtensionMethods();

export class SentryModule implements OnApplicationShutdown {
  static async forRootAsync({
    imports,
    inject,
    useFactory,
  }: SentryModuleAsyncOptions): Promise<DynamicModule> {
    return {
      imports: imports,
      module: SentryModule,
      providers: [
        SentryPlugin,
        {
          provide: SENTRY_MODULE_OPTIONS,
          inject: inject,
          useFactory: useFactory,
        },
      ],
      exports: [SentryPlugin],
    };
  }

  constructor(
    @Inject(SENTRY_MODULE_OPTIONS)
    { dsn, env, tracesSampleRate }: SentryModuleOptions,
  ) {
    if (tracesSampleRate && (tracesSampleRate < 0 || tracesSampleRate > 1)) {
      throw new SentryModuleConfigurationException(
        `Invalid tracesSampleRate ${tracesSampleRate}. Please use value from interval <0.0,1.0>`,
      );
    }
    // if (dsn && env !== EnvShort.local) {
    Sentry.init({
      dsn: dsn,
      environment: env,
      tracesSampleRate,
      integrations: [
        new Sentry.Integrations.OnUncaughtException({
          onFatalError(firstError: Error, secondError?: Error) {
            sentryLogger.error(firstError);
            sentryLogger.error(secondError);
            Sentry.captureException(firstError);
            Sentry.captureException(secondError);
          },
          exitEvenIfOtherHandlersAreRegistered: true,
        }),
        new Sentry.Integrations.OnUnhandledRejection(),
        new Tracing.Integrations.Postgres(),
      ],
    });
    sentryLogger.log(`Sentry successfully connected to dsn '${dsn}'`);
    // }
  }

  async onApplicationShutdown() {
    await Sentry.close(3000);
  }
}
