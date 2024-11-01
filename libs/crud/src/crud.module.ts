import { ConfigModule } from '@nestjs/config';
import { DiscoveryModule } from '@nestjs/core';
import { DynamicModule, Module, OnModuleInit } from '@nestjs/common';
import { CrudAuditCallback, CrudAuthorizeCallback } from './';
import { CrudService } from './service/crud.service';
import { ModuleAsyncOptions } from '@panter/nestjs-utils';
import { CrudEntityServiceFactory } from './service/crud-entity-service.factory';
import { CrudEntityService } from '.';

export interface CrudModuleOptions<T> {
  defaultRelationModifier?: boolean;
  authorizeCallback?: CrudAuthorizeCallback<T>;
  auditCallback?: CrudAuditCallback<T>;
}

export type CrudModuleAsyncOptions<T> = ModuleAsyncOptions<
  CrudModuleOptions<T>
> & { defaultRelationModifier?: boolean };

let relationModifier: boolean | undefined = true;

export const defaultRelationModifier = () => relationModifier;

@Module({})
export class CrudModule implements OnModuleInit {
  static async forRootAsync<T>({
    defaultRelationModifier,
    inject,
    imports,
    useFactory,
  }: CrudModuleAsyncOptions<T>): Promise<DynamicModule> {
    relationModifier = defaultRelationModifier;
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
        CrudEntityService,
        CrudEntityServiceFactory,
      ],
      exports: [
        'CONFIG_OPTIONS',
        CrudService,
        CrudEntityService,
        CrudEntityServiceFactory,
      ],
    };
  }

  constructor(private readonly curdAuthorizationService: CrudService) {}

  onModuleInit() {
    this.curdAuthorizationService.init();
  }
}
