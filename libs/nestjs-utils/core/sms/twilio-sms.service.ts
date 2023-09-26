import { TwilioService } from '../twilio';
import { SendSMSProps, SmsService } from './sms.service';

export class TwilioSmsService extends SmsService {
  constructor(private readonly twilio: TwilioService) {
    super();
  }

  sendSMS({ to, message }: SendSMSProps): Promise<void> {
    return this.twilio.sendSMS(to, message);
  }
}
