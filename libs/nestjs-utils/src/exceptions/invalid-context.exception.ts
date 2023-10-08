import { ApplicationException } from './application.exception';

export class InvalidContextException extends ApplicationException {
  constructor(message: string) {
    super(message);
  }
}
