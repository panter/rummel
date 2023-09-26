import { ApplicationException } from '../../common';

export class UnableToSendSmsException extends ApplicationException {
  constructor(phoneNumber: string, cause?: unknown) {
    super(`Unable to send sms to ${phoneNumber}.`, cause);
    this.withContext({ phoneNumber });
  }
}
