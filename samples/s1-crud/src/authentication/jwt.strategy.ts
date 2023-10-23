import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { get } from 'lodash';
import { UserIdentityProvider } from './interfaces/user-identity-provider';
import { UserIdentity } from './interfaces/user-identity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly userIdentityProvider: UserIdentityProvider<UserIdentity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => get(req, 'query.access_token'),
        (req) => get(req, 'cookies.access_token'),
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      passReqToCallback: true,
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    });
  }

  async validate(req: unknown, payload: any) {
    return this.userIdentityProvider.getUserById(payload.sub, payload);
  }
}
