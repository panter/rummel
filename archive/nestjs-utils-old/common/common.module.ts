import * as path from 'path';
import { DynamicModule, Inject, OnModuleInit } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { RequestLoggingPlugin } from './graphql/request-logging.plugin';
import { ApplicationExceptionFilter } from './filters/application-exception.filter';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { HealthController } from './controllers/health.controller';
import { ConfigService } from '@nestjs/config';
import { I18n } from './utils';
import { TenantInterceptor } from './interceptors';
import { ModuleAsyncOptions } from './interfaces';

export const COMMON_MODULE_OPTIONS = 'COMMON_MODULE_OPTIONS';

export interface CommonModuleOptions {
  language: string;
  translationsPath: string;
}

export type CommonModuleAsyncOptions = ModuleAsyncOptions<CommonModuleOptions>;

export class CommonModule implements OnModuleInit {
  static async forRootAsync({
    imports,
    inject,
    useFactory,
  }: CommonModuleAsyncOptions): Promise<DynamicModule> {
    return {
      module: CommonModule,
      global: true,
      imports,
      controllers: [HealthController],
      providers: [
        RequestLoggingPlugin,
        {
          provide: APP_FILTER,
          useClass: ApplicationExceptionFilter,
        },
        {
          provide: APP_FILTER,
          useClass: HttpExceptionFilter,
        },
        { provide: APP_INTERCEPTOR, useClass: TenantInterceptor },
        {
          provide: COMMON_MODULE_OPTIONS,
          inject,
          useFactory,
        },
      ],
    };
  }

  private readonly moduleOptions: CommonModuleOptions;

  constructor(
    @Inject(COMMON_MODULE_OPTIONS)
    moduleOptions: CommonModuleOptions,
    private config: ConfigService,
  ) {
    this.moduleOptions = moduleOptions;
  }

  async onModuleInit() {
    const language = this.config.get('I18N_LANGUAGE', 'de');

    const translationFilePath = path.join(
      this.moduleOptions.translationsPath,
      `${language}.json`,
    );
    await I18n.Init({
      language: this.moduleOptions.language,
      translationFilePath,
    });
  }
}
