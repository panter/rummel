import { SendSMSProps, SmsService } from './sms.service';

export class LocalSmsService extends SmsService {
  async sendSMS(props: SendSMSProps): Promise<void> {
    this.logger.log(JSON.stringify(props, null, 2));
  }
}
