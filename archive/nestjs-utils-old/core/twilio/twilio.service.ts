import { Twilio } from 'twilio';

import { ServiceContext } from 'twilio/lib/rest/verify/v2/service';
import { InvalidOtpException } from './invalid-otp.exception';
import { UnableToSendSmsException } from './unable-to-send-sms.exception';
import { TwilioModuleOptions } from './twilio-module-options';
import { UnknownException } from '../../common';

export class TwilioService {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore type should be fixed soon (https://github.com/twilio/twilio-node/issues/913)
  private client: Twilio;
  private verifyService: ServiceContext;
  private options: TwilioModuleOptions;

  constructor(options: TwilioModuleOptions) {
    this.options = options;
    this.client = new Twilio(options.accountSid, options.authToken);
    this.verifyService = this.client.verify.v2.services(
      options.verifyServiceSid,
    );
  }

  async startSMSVerification(phoneNumber: string): Promise<void> {
    try {
      await this.verifyService.verifications.create({
        to: phoneNumber,
        channel: 'sms',
      });
    } catch (e) {
      throw new UnknownException('Unable to start sms OTP verification', e);
    }
  }

  async verifySMSToken(phoneNumber: string, code: string): Promise<boolean> {
    try {
      const verificationResult =
        await this.verifyService.verificationChecks.create({
          to: phoneNumber,
          code: code,
        });
      return verificationResult.status === 'approved';
    } catch (e: any) {
      if (e?.code === 20404) {
        throw new InvalidOtpException(phoneNumber, code);
      } else {
        throw new UnknownException('Unable to verify OTP code', e).withContext({
          phoneNumber,
          code,
        });
      }
    }
  }

  async sendSMS(phoneNumber: string, text: string) {
    try {
      await this.client.messages.create({
        to: phoneNumber,
        body: text,
        messagingServiceSid: this.options.messagingServiceSid,
      });
    } catch (e: any) {
      throw new UnableToSendSmsException('Unable to send SMS', e);
    }
  }
}
