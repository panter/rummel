import { ApplicationException } from '../../common';

export class InvalidOtpException extends ApplicationException {
  constructor(phoneNumber: string, otp: string) {
    super('Invalid token used.');
    this.withContext({ phoneNumber, otp });
  }
}
