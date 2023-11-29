import { ConfigModule } from '@nestjs/config';
import { DiscoveryModule } from '@nestjs/core';
import { DynamicModule, Module, OnModuleInit } from '@nestjs/common';
import { CrudAuditCallback, CrudAuthorizeCallback } from './types';
import { CrudService } from './crud.service';
import { ModuleAsyncOptions } from '@panter/nestjs-utils';

export interface CrudModuleOptions<T> {
  authorizeCallback?: CrudAuthorizeCallback<T>;
  auditCallback?: CrudAuditCallback<T>;
}

export type CrudModuleAsyncOptions<T> = ModuleAsyncOptions<
  CrudModuleOptions<T>
>;

@Module({})
export class CrudModule implements OnModuleInit {
  static async forRootAsync<T>({
    inject,
    imports,
    useFactory,
  }: CrudModuleAsyncOptions<T>): Promise<DynamicModule> {
    return {
      module: CrudModule,
      imports: [...(imports || []), ConfigModule, DiscoveryModule],
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useFactory: async (...args: any[]) => await useFactory(...args),
          inject: inject || [],
        },
        CrudService,
      ],
      exports: ['CONFIG_OPTIONS', CrudService],
    };
  }

  constructor(private readonly curdAuthorizationService: CrudService) {}

  onModuleInit() {
    this.curdAuthorizationService.init();
  }
}
