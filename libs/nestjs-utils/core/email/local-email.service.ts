import {
  EmailParams,
  EmailService,
  EmailServiceOptions,
} from './email.service';

export class LocalEmailService extends EmailService {
  constructor(options: EmailServiceOptions) {
    super(options);
  }

  async send(params: EmailParams): Promise<void> {
    this.logger.log(JSON.stringify(params, null, 2));
  }
}
