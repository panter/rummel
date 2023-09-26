import { DynamicModule, Type } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthenticationService } from './authentication.service';
import { JwtStrategy } from './jwt.strategy';
import { AUTHENTICATION_MODULE_OPTIONS } from './constants';
import { JwtAuthGuard } from './jwt-auth.guard';
import {
  ModuleAsyncOptions,
  OtpAuthService,
  UserIdentity,
  UserIdentityProvider,
} from '../../common';
import { RequestUserInterceptor } from '../../common/interceptors';

export type AuthenticationStrategy = 'jwt' | 'local';

export interface AuthenticationModuleOptions<
  A extends AuthenticationStrategy = 'jwt',
  T extends UserIdentity = UserIdentity,
> {
  config: A extends 'jwt'
    ? {
        secret: string;
        expiration: string;
      }
    : never;
  otpAuthService: OtpAuthService<T>;
  registrationEnabled: boolean;
  constantOtp?: string;
}

export type AuthenticationModuleAsyncOptions<
  A extends AuthenticationStrategy = 'jwt',
  T extends UserIdentity = UserIdentity,
> = ModuleAsyncOptions<AuthenticationModuleOptions<A>> & {
  identityProvider: Type<UserIdentityProvider<T>>;
};

export class AuthenticationModule {
  static async forRootAsync<T extends AuthenticationStrategy = 'jwt'>({
    imports,
    inject,
    useFactory,
    identityProvider,
  }: AuthenticationModuleAsyncOptions<T>): Promise<DynamicModule> {
    return {
      module: AuthenticationModule,
      global: true,
      imports: [
        ...(imports || []),
        JwtModule.registerAsync({
          inject,
          useFactory: async (...args) => {
            const { config } = await useFactory(...args);
            return {
              secret: config.secret,
              signOptions: {
                expiresIn: config.expiration,
              },
            };
          },
        }),
        PassportModule.register({
          property: 'user',
          session: false,
          defaultStrategy: 'jwt',
        }),
      ],
      providers: [
        {
          provide: AUTHENTICATION_MODULE_OPTIONS,
          inject,
          useFactory,
        },
        {
          provide: APP_GUARD,
          useClass: JwtAuthGuard,
        },
        { provide: APP_INTERCEPTOR, useClass: RequestUserInterceptor },
        { provide: UserIdentityProvider, useClass: identityProvider },
        {
          provide: OtpAuthService,
          inject,
          useFactory: async (...args) => {
            const options = await useFactory(...args);
            return options.otpAuthService;
          },
        },
        JwtStrategy,
        AuthenticationService,
      ],
      exports: [AuthenticationService, PassportModule, JwtModule],
    };
  }
}
