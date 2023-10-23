import { Injectable, Logger } from '@nestjs/common';
import { UserIdentity } from './interfaces/user-identity';
import { OtpAuthService } from './interfaces/otp-auth-service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConstantOtpAuthService extends OtpAuthService<UserIdentity> {
  private readonly logger = new Logger(ConstantOtpAuthService.name);
  private readonly constantOtp: string;

  constructor(config: ConfigService) {
    super();
    this.constantOtp = config.getOrThrow<string>('CONSTANT_OTP');
  }

  async sendOTP(recipient: UserIdentity): Promise<void> {
    this.logger.debug(`Triggering OTP login for '${recipient.id}'`);
    return;
  }

  async verifyOTP(recipient: UserIdentity, code: string): Promise<boolean> {
    this.logger.debug(`Verifying OTP for ${recipient.id}. [${code}]`);
    return code === this.constantOtp;
  }
}
