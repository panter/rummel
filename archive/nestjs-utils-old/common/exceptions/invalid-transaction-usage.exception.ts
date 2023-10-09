import { ApplicationException } from './application.exception';

export class InvalidTransactionUsageException extends ApplicationException {
  constructor() {
    super('@Transactional decorator usd outside request context');
  }
}
