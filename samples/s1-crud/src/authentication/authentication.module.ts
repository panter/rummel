import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ConstantTokenAuthService } from './constant-token-auth.service';
import { TokenAuthService } from './interfaces/token-auth-service';
import { AuthenticationService } from './authentication.service';
import { AuthenticationResolver } from './api/authentication.resolver';
import { UserIdentityProvider } from './interfaces/user-identity-provider';
import { AppUserIdentityProvider } from './app-user-identity-provider.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          secret: config.getOrThrow('JWT_SECRET'),
          signOptions: {
            expiresIn: config.getOrThrow('JWT_EXPIRATION'),
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
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: TokenAuthService,
      useClass: ConstantTokenAuthService,
    },
    {
      provide: UserIdentityProvider,
      useClass: AppUserIdentityProvider,
    },
    JwtStrategy,
    AuthenticationService,
    AuthenticationResolver,
  ],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
