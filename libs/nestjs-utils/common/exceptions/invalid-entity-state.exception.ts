import { ApplicationException } from './application.exception';

export class InvalidEntityStateException extends ApplicationException {
  constructor(message: string) {
    super(message);
  }
}
