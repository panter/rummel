import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

import { ConfigService } from '@nestjs/config';
import { UserIdentityProvider } from './interfaces/user-identity-provider';
import { TokenAuthService } from './interfaces/token-auth-service';
import { Transactional } from '@panter/nestjs-utils';
import { UserIdentity } from './interfaces/user-identity';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userIdentityProvider: UserIdentityProvider<UserIdentity>,
    private readonly mfaAuthService: TokenAuthService<UserIdentity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  @Transactional()
  async triggerMFALogin(naturalKey: string): Promise<boolean> {
    const user = await this.loginOrRegisterUser(naturalKey);
    await this.userIdentityProvider.save(user);
    await this.mfaAuthService.sendToken(user);
    return true;
  }

  @Transactional()
  async loginWithPersonalToken(personalToken: string): Promise<UserIdentity> {
    const user =
      await this.userIdentityProvider.getUserByPersonalToken(personalToken);
    return this.loginUser(user, personalToken, (user, token) =>
      this.mfaAuthService.validatePersonalToken(user, token),
    );
  }

  @Transactional()
  async finishMFALogin(
    naturalKey: string,
    token: string,
  ): Promise<UserIdentity> {
    const user =
      await this.userIdentityProvider.getUserByNaturalKey(naturalKey);
    return this.loginUser(user, token, (user, token) =>
      this.mfaAuthService.validateToken(user, token),
    );
  }

  async generateAccessToken(user: UserIdentity): Promise<string> {
    const secret = this.configService.getOrThrow<string>('JWT_SECRET');
    const expiresIn = this.configService.getOrThrow<string>('JWT_EXPIRATION');
    return await this.jwtService.signAsync(
      {
        sub: user.id,
        tenantId: user.getTenantId(),
        role: user.getRole(),
        userNaturalKey: user.getUserNaturalKey(),
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

  private async loginUser(
    user: UserIdentity,
    token: string,
    tokenValidator: (user: UserIdentity, token: string) => Promise<boolean>,
  ): Promise<UserIdentity> {
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const isTokenValid = await tokenValidator(user, token);
    if (!isTokenValid) {
      await this.userIdentityProvider.save(user);
      throw new UnauthorizedException('Invalid token');
    }
    user.markAsVerified();
    await this.userIdentityProvider.save(user);
    return user;
  }

  private async loginOrRegisterUser(naturalKey: string): Promise<UserIdentity> {
    const user =
      await this.userIdentityProvider.getUserByNaturalKey(naturalKey);

    if (user) {
      return user;
    } else if (
      this.configService.getOrThrow('ENABLE_REGISTRATION') === 'true'
    ) {
      return this.userIdentityProvider.createUserIdentity(naturalKey);
    }
    throw new UnauthorizedException('User not found');
  }
}
