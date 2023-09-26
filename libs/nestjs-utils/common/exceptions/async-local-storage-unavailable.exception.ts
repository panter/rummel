import { ApplicationException } from './index';

export class AsyncLocalStorageUnavailableException extends ApplicationException {
  constructor() {
    super('Async local storage unavailable!');
  }
}
