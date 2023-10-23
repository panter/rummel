import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

import { ConfigService } from '@nestjs/config';
import { UserIdentityProvider } from './interfaces/user-identity-provider';
import { OtpAuthService } from './interfaces/otp-auth-service';
import { Transactional } from '@panter/nestjs-utils';
import { UserIdentity } from './interfaces/user-identity';

export type AuthenticationServiceOtpType = 'email' | 'phone';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userIdentityProvider: UserIdentityProvider<UserIdentity>,
    private readonly otpAuthService: OtpAuthService<UserIdentity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  @Transactional()
  async triggerOtpLogin(authorityId: string): Promise<boolean> {
    const user = await this.loginOrRegisterUser(authorityId);
    await this.userIdentityProvider.save(user);
    await this.otpAuthService.sendOTP(user);
    return true;
  }

  @Transactional()
  async finishOtpLogin(
    userIdentification: string,
    otp: string,
  ): Promise<UserIdentity> {
    const user =
      await this.userIdentityProvider.getUserByAuthorityId(userIdentification);
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
    const secret = this.configService.getOrThrow<string>('JWT_SECRET');
    const expiresIn = this.configService.getOrThrow<string>('JWT_EXPIRATION');
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

  private async loginOrRegisterUser(
    authorityId: string,
  ): Promise<UserIdentity> {
    let user =
      await this.userIdentityProvider.getUserByAuthorityId(authorityId);

    if (user) {
      return user;
    } else if (
      this.configService.getOrThrow('ENABLE_REGISTRATION') === 'true'
    ) {
      return this.userIdentityProvider.createUserIdentity(authorityId);
    }
    throw new UnauthorizedException('User not found');
  }
}
