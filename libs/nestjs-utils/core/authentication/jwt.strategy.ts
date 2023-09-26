import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { get } from 'lodash';

import { AUTHENTICATION_MODULE_OPTIONS } from './constants';
import { AuthenticationModuleOptions } from './authentication.module';
import { UserIdentity, UserIdentityProvider } from '../../common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AUTHENTICATION_MODULE_OPTIONS)
    options: AuthenticationModuleOptions,
    private readonly userIdentityProvider: UserIdentityProvider<UserIdentity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => get(req, 'query.access_token'),
        (req) => get(req, 'cookies.access_token'),
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      passReqToCallback: true,
      secretOrKey: options.config.secret,
    });
  }

  async validate(req: unknown, payload: any) {
    return this.userIdentityProvider.getUserIdentity(payload.sub, payload);
  }
}
