import { ConfigModule } from '@nestjs/config';
import { DiscoveryModule, DiscoveryService } from '@nestjs/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { DynamicModule, Module, OnModuleInit } from '@nestjs/common';
import { CrudAuthorizeCallback } from './types';
import { CrudAuthorizationService } from './crud-authorization.service';

export interface CrudModuleOptions<T> {
  authorizeCallback?: CrudAuthorizeCallback<T>;
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
          provide: CrudAuthorizationService,
          inject: [EntityManager, DiscoveryService],
          useFactory: (em: EntityManager, discovery: DiscoveryService) => {
            return new CrudAuthorizationService(
              discovery,
              options.authorizeCallback,
            );
          },
        },
      ],
      exports: ['CONFIG_OPTIONS', CrudAuthorizationService],
    };
  }

  constructor(
    private readonly curdAuthorizationService: CrudAuthorizationService,
  ) {}

  onModuleInit() {
    this.curdAuthorizationService.init();
  }
}
