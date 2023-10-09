import { SendSmtpEmailReplyTo, SendSmtpEmailTo } from '@sendinblue/client';
import { Logger } from '@nestjs/common';
import { AbstractAddress } from '../address';
import { I18n } from '../../common';

export interface EmailParams {
  to: SendSmtpEmailTo[];
  replyTo?: SendSmtpEmailReplyTo;
  params?: Record<string, any>;
  textContent?: string;
  subject: string;
  templateId?: number;
}

export interface EmailServiceOptions {
  noReplyEmail: string;
  abuseEmail: string;
  creditEmail: string;
}

export interface ReportSuspiciousListingParams {
  message: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  listing: { id: string; title: string };
  listingURL: string;
}

export interface ReportFailedCrifValidationParams {
  addressValidationRequestId: string;
  address: AbstractAddress;
  result: 'rejected' | 'errored';
  listingURL: string;
  userId: string;
}

export abstract class EmailService {
  protected readonly logger = new Logger(EmailService.name);
  protected readonly noReplyEmail: string;
  protected readonly abuseEmail: string;
  protected readonly creditEmail: string;

  protected constructor({
    noReplyEmail,
    creditEmail,
    abuseEmail,
  }: EmailServiceOptions) {
    this.noReplyEmail = noReplyEmail;
    this.creditEmail = creditEmail;
    this.abuseEmail = abuseEmail;
  }

  abstract send(props: EmailParams): Promise<void>;

  //todo: this is domain logic, move it away in next phase
  async reportSuspiciousListing(data: ReportSuspiciousListingParams) {
    const message = `User ${data.firstName} ${data.lastName} ${
      data.email ? `(${data.email})` : ''
    } reported ad with title '${data.listing.title}' as suspicious`;

    return this.send({
      to: [{ email: this.abuseEmail }],
      replyTo: data.email ? { email: data.email } : undefined,
      textContent: message,
      params: data,
      subject: I18n.get('reportSuspiciousListingEmail.subject'),
      templateId: 1,
    });
  }

  //todo: this is domain logic, move it away in next phase
  async reportFailedCrifValidation(data: ReportFailedCrifValidationParams) {
    const message = `Unsuccessful CRIF validation for address ${data.address.formatted()}. Result=${
      data.result
    }`;
    return this.send({
      to: [{ email: this.creditEmail }],
      textContent: message,
      params: data,
      subject: I18n.get('crifValidationFailedEmail.subject'),
      templateId: 2,
    });
  }
}
