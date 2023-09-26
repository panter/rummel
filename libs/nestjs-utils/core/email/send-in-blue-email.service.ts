import {
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
} from '@sendinblue/client';
import {
  EmailParams,
  EmailService,
  EmailServiceOptions,
} from './email.service';

interface SendInBlueEmailServiceOptions extends EmailServiceOptions {
  apiKey: string;
}

export class SendInBlueEmailService extends EmailService {
  private readonly client: TransactionalEmailsApi;

  constructor(options: SendInBlueEmailServiceOptions) {
    super(options);
    this.client = new TransactionalEmailsApi();
    this.client.setApiKey(TransactionalEmailsApiApiKeys.apiKey, options.apiKey);
  }

  async send({
    to,
    replyTo,
    params,
    textContent,
    subject,
    templateId,
  }: EmailParams) {
    try {
      await this.client.sendTransacEmail({
        sender: { email: this.noReplyEmail },
        to: to,
        replyTo: replyTo,
        params,
        textContent,
        subject,
        templateId,
      });
    } catch (e) {
      this.logger.error(e);
    }
  }
}
