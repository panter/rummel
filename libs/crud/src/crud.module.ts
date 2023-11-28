import { ConfigModule } from '@nestjs/config';
import { DiscoveryModule, DiscoveryService } from '@nestjs/core';
import { DynamicModule, Module, OnModuleInit } from '@nestjs/common';
import { CrudAuditCallback, CrudAuthorizeCallback } from './types';
import { CrudService } from './crud.service';

export interface CrudModuleOptions<T> {
  authorizeCallback?: CrudAuthorizeCallback<T>;
  auditCallback?: CrudAuditCallback<T>;
}

@Module({})
export class CrudModule implements OnModuleInit {
  static forRootAsync<T>(options: CrudModuleOptions<T>): DynamicModule {
    return {
      module: CrudModule,
      imports: [ConfigModule, DiscoveryModule],
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        {
          provide: CrudService,
          inject: [DiscoveryService],
          useFactory: (discovery: DiscoveryService) => {
            return new CrudService(discovery, options);
          },
        },
      ],
      exports: ['CONFIG_OPTIONS', CrudService],
    };
  }

  constructor(private readonly curdAuthorizationService: CrudService) {}

  onModuleInit() {
    this.curdAuthorizationService.init();
  }
}
