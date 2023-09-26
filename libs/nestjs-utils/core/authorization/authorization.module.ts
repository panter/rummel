import { DynamicModule } from '@nestjs/common';
import { CaslAbilityFactory } from './csal-ability.factory';
import { PermissionsGuard } from './permission.guard';
import { ModuleAsyncOptions, UserAuthorityProvider } from '../../common';

export interface AuthorizationModuleOptions {
  authorityProvider: UserAuthorityProvider;
}

export type AuthorizationModuleAsyncOptions =
  ModuleAsyncOptions<AuthorizationModuleOptions>;

export class AuthorizationModule {
  static async forRootAsync({
    imports,
    inject,
    useFactory,
  }: AuthorizationModuleAsyncOptions): Promise<DynamicModule> {
    return {
      module: AuthorizationModule,
      global: true,
      imports: [...(imports || [])],
      providers: [
        {
          provide: UserAuthorityProvider,
          inject,
          useFactory: async (...args) => {
            const options = await useFactory(...args);
            return options.authorityProvider;
          },
        },
        CaslAbilityFactory,
        PermissionsGuard,
      ],
      exports: [CaslAbilityFactory, PermissionsGuard],
    };
  }
}
