import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  AuthenticationModule,
  ConstantOtpAuthService,
} from '@panter/nestjs-utils';
import { UserIdentityService } from '../modules/user-identity/user-identity.service';

export const authenticationModule = AuthenticationModule.forRootAsync<'jwt'>({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    const constantOtp = config.get('CONSTANT_OTP');
    return {
      config: {
        secret: config.getOrThrow<string>('JWT_SECRET'),
        expiration: config.getOrThrow<string>('JWT_EXPIRATION'),
      },
      constantOtp,
      registrationEnabled: false,
      otpAuthService: new ConstantOtpAuthService(constantOtp),
    };
  },
  identityProvider: UserIdentityService,
});
