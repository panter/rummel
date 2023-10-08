import { ApplicationException } from '../../common';

export class SentryModuleConfigurationException extends ApplicationException {
  constructor(message: string) {
    super(message);
  }
}
