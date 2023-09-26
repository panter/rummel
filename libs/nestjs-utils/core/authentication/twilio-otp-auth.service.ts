import { Injectable, Logger } from '@nestjs/common';
import { OtpAuthService, UserIdentity } from '../../common';

@Injectable()
export class TwilioOtpAuthService extends OtpAuthService<UserIdentity> {
  protected readonly logger = new Logger(TwilioOtpAuthService.name);

  // CRO: twilio typing
  constructor(private readonly twilio: any) {
    super();
  }

  // CRO: recipient typing
  async sendOTP(recipient: UserIdentity): Promise<void> {
    return this.twilio.startSMSVerification((recipient as any).phoneNumber);
  }

  // CRO: recipient typing
  async verifyOTP(recipient: UserIdentity, code: string): Promise<boolean> {
    return this.twilio.verifySMSToken((recipient as any).phoneNumber, code);
  }
}
