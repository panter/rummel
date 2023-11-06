import { DynamicModule, Global } from '@nestjs/common';
import { CaslAbilityFactory } from './csal-ability.factory';
import { PermissionsGuard } from './permission.guard';
import { UserAuthorityProvider } from './interfaces';
import { UserAuthorityService } from './user-authority.service';
import { ModuleAsyncOptions } from '@panter/nestjs-utils';

export interface AuthorizationModuleOptions {
  // authorityProvider: UserAuthorityProvider;
}

export type AuthorizationModuleAsyncOptions =
  ModuleAsyncOptions<AuthorizationModuleOptions>;

@Global()
export class AuthorizationModule {
  static forRootAsync({
    imports,
  }: AuthorizationModuleAsyncOptions): DynamicModule {
    return {
      module: AuthorizationModule,
      imports: [...(imports || [])],
      providers: [
        {
          provide: UserAuthorityProvider,
          useClass: UserAuthorityService,
        },
        CaslAbilityFactory,
        PermissionsGuard,
      ],
      exports: [CaslAbilityFactory, PermissionsGuard],
    };
  }
}
