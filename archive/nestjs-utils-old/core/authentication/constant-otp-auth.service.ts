import { Injectable, Logger } from '@nestjs/common';
import {
  InvalidConfigurationException,
  OtpAuthService,
  UserIdentity,
} from '../../common';

@Injectable()
export class ConstantOtpAuthService extends OtpAuthService<UserIdentity> {
  private readonly logger = new Logger(ConstantOtpAuthService.name);

  constructor(private readonly constantOtp: string) {
    super();
    if (constantOtp == undefined) {
      throw new InvalidConfigurationException(
        "Mandatory option 'constantOtp' was not provided",
      );
    }
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
