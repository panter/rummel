import { DynamicModule, Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CrudAuthorizationService, CrudAuthorizeCallback } from '@panter/crud';
import { DiscoveryModule, DiscoveryService } from '@nestjs/core';
import { EntityManager } from '@mikro-orm/postgresql';

export interface CRUDModuleOptions {
  authorizeCallback?: CrudAuthorizeCallback;
}

@Module({})
export class CRUDModule implements OnModuleInit {
  private logger = new Logger(CRUDModule.name);

  static forRootAsync(options: CRUDModuleOptions): DynamicModule {
    return {
      module: CRUDModule,
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
              em,
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
