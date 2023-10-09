import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

import { ConfigService } from '@nestjs/config';
import {
  EnvShort,
  OtpAuthService,
  Transactional,
  UserIdentity,
  UserIdentityProvider,
} from '../../common';
import { AuthenticationModuleOptions } from './authentication.module';
import {
  AUTHENTICATION_MODULE_OPTIONS,
  PHONE_NUMBER_PATTERN,
} from './constants';
import { InvalidPhoneNumberFormatException } from './invalid-phone-number-format.exception';
import { OtpUserNotFoundException } from './otp-user-not-found.exception';

export type AuthenticationServiceOtpType = 'email' | 'phone';
@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(AUTHENTICATION_MODULE_OPTIONS)
    private readonly options: AuthenticationModuleOptions,
    private readonly userIdentityProvider: UserIdentityProvider<UserIdentity>,
    private readonly otpAuthService: OtpAuthService<UserIdentity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  @Transactional()
  async triggerOtpLogin(
    userIdentification: string,
    type: AuthenticationServiceOtpType,
  ): Promise<boolean> {
    if (type === 'phone' && !this.hasPhoneValidFormat(userIdentification)) {
      throw new InvalidPhoneNumberFormatException();
    }

    const user = await this.loginOrRegisterUser(userIdentification, type);
    await this.userIdentityProvider.save(user);
    await this.otpAuthService.sendOTP(user);
    return true;
  }

  @Transactional()
  async finishOtpLogin(
    userIdentification: string,
    otp: string,
    type: AuthenticationServiceOtpType,
  ): Promise<UserIdentity> {
    if (!this.hasPhoneValidFormat(userIdentification)) {
      throw new InvalidPhoneNumberFormatException();
    }

    const user =
      type === 'phone'
        ? await this.userIdentityProvider.getUserIdentityByPhoneNumber(
            userIdentification,
          )
        : await this.userIdentityProvider.getUserIdentityByEmail(
            userIdentification,
          );
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isValid = await this.otpAuthService.verifyOTP(user, otp);
    if (!isValid) {
      await this.userIdentityProvider.save(user);
      throw new UnauthorizedException('Invalid token');
    }
    user.markAsVerified();
    await this.userIdentityProvider.save(user);
    return user;
  }

  async generateAccessToken(user: UserIdentity): Promise<string> {
    const secret = this.options.config.secret;
    const expiresIn = this.options.config.expiration;
    return await this.jwtService.signAsync(
      {
        sub: user.id,
        tenantId: user.getTenantId(),
        role: user.getRole(),
        userAuthorityId: user.getUserAuthorityId(),
      },
      { secret, expiresIn },
    );
  }

  logout(res: Response): void {
    res.cookie('access_token', 'deleted', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
  }

  setJwtTokenCookie(jwtToken: string, res: Response): void {
    res.cookie('access_token', `${jwtToken}`, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
  }

  private hasPhoneValidFormat(phoneNumber: string): boolean {
    // skip validation for dev & local to use seeded users
    const env = this.configService.getOrThrow<EnvShort>('ENV_SHORT');
    if (env !== EnvShort.prod) {
      return true;
    }

    return PHONE_NUMBER_PATTERN.test(phoneNumber);
  }

  private async loginOrRegisterUser(
    userIdentification: string,
    type: AuthenticationServiceOtpType,
  ): Promise<UserIdentity> {
    let user =
      type === 'phone'
        ? await this.userIdentityProvider.getUserIdentityByPhoneNumber(
            userIdentification,
          )
        : await this.userIdentityProvider.getUserIdentityByEmail(
            userIdentification,
          );
    if (user) {
      return user;
    } else if (this.options.registrationEnabled) {
      if (type === 'phone') {
        user =
          await this.userIdentityProvider.createUserIdentityFromPhoneNumber(
            userIdentification,
          );
      } else {
        user =
          await this.userIdentityProvider.createUserIdentityFromEmail(
            userIdentification,
          );
      }
    }
    throw new OtpUserNotFoundException();
  }
}
