import { Injectable, Logger } from '@nestjs/common';
import { UserIdentity } from './interfaces/user-identity';
import { TokenAuthService } from './interfaces/token-auth-service';
import { ConfigService } from '@nestjs/config';

/**
 * This is a sample implementation of the MfaAuthService interface.
 * It should be use ony for development purposes.
 */
@Injectable()
export class ConstantTokenAuthService extends TokenAuthService<UserIdentity> {
  private readonly logger = new Logger(ConstantTokenAuthService.name);
  private readonly constantOtp: string;

  constructor(config: ConfigService) {
    super();
    this.constantOtp = config.getOrThrow<string>('CONSTANT_OTP');
  }

  async sendToken(recipient: UserIdentity): Promise<void> {
    this.logger.debug(`Triggering OTP login for '${recipient.id}'`);
    return;
  }

  async validateToken(
    recipient: UserIdentity,
    token: string,
  ): Promise<boolean> {
    this.logger.debug(`Verifying OTP for ${recipient.id}. [${token}]`);
    return token === this.constantOtp;
  }

  async validatePersonalToken(
    recipient: UserIdentity,
    token: string,
  ): Promise<boolean> {
    this.logger.debug(
      `Verifying personal token for ${recipient.id}. [${token}]`,
    );
    return recipient.getPersonalToken() === token;
  }
}
