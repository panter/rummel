import { ApplicationException } from './application.exception';

export class InvalidOperationException extends ApplicationException {
  constructor(message: string) {
    super(message);
  }
}
