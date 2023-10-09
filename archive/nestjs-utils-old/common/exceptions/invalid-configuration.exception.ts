import { ApplicationException } from './application.exception';

export class InvalidConfigurationException extends ApplicationException {
  constructor(message: string) {
    super(message);
  }
}
