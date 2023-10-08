import { ApplicationException } from '../../common';

export class UnexpectedUserAuthorityException extends ApplicationException {
  constructor(message: string) {
    super(message);
  }
}
