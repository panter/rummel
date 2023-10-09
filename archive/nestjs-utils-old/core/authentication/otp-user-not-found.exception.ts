import { ApplicationException } from '../../common';

export class OtpUserNotFoundException extends ApplicationException {
  constructor() {
    super(`No user found.`);
  }
}
