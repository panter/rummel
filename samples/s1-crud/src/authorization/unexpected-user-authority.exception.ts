import { ApplicationException } from '@panter/nestjs-utils';

export class UnexpectedUserAuthorityException extends ApplicationException {
  constructor(message: string) {
    super(message);
  }
}
