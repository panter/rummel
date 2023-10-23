import {
  DynamicModule,
  Inject,
  Logger,
  Module,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CrudAuthorization, CrudAuthorizeCallback } from '@panter/crud';
import { DiscoveryModule, DiscoveryService } from '@nestjs/core';
import { CRUD_RESOURCE } from '@panter/crud/dist/auth/crud-resource.decorator';

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
      ],
      exports: ['CONFIG_OPTIONS'],
    };
  }

  constructor(
    @Inject('CONFIG_OPTIONS') private readonly options: CRUDModuleOptions,
    private readonly discovery: DiscoveryService,
  ) {}

  onModuleInit() {
    this.logger.log(
      `Initializing CRUDModule, Authorization enabled: ${!!this.options
        .authorizeCallback}`,
    );

    CrudAuthorization.initialize(this.options.authorizeCallback);
    this.registerResources();
    //todo: update resources in db ?
    this.logger.log(`CRUDModule initialized successfully`);
  }

  private registerResources() {
    const wrappers = this.discovery.getProviders();
    const crudResources: string[] = wrappers
      .filter(
        (wrapper) =>
          wrapper.metatype &&
          Reflect.getMetadata(CRUD_RESOURCE, wrapper.metatype),
      )
      // .map((wrapper) => {
      //   return {
      //     name: Reflect.getMetadata(CRUD_RESOURCE, wrapper.metatype),
      //     handler: wrapper.instance,
      //   };
      // })
      .map((wrapper) => {
        return Reflect.getMetadata(CRUD_RESOURCE, wrapper.metatype);
      });
    const uniqueCrudResources = [...new Set(crudResources)];
    uniqueCrudResources.forEach((resource) => {
      this.logger.log(`Registering CRUD resource '${resource}'`);
    });
    CrudAuthorization.registerResources(crudResources);
  }
}
