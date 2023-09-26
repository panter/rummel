import { Logger } from '@nestjs/common';

export class SendSMSProps {
  to!: string;
  message!: string;
}

export abstract class SmsService {
  protected readonly logger = new Logger(SmsService.name);

  abstract sendSMS(props: SendSMSProps): Promise<void>;
}
