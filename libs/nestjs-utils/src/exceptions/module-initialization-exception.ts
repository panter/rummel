import { ApplicationException } from './application.exception';

export class ModuleInitializationException extends ApplicationException {
  cause?: Error;

  constructor(moduleName: string, message: string, cause?: Error) {
    super(`[${moduleName}] Module initialization failed: ${message}`);
    this.cause = cause;
  }
}
