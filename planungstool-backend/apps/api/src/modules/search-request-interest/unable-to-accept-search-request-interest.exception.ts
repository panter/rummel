import { ApplicationException } from '@panter/nestjs-utils';

export class UnableToAcceptSearchRequestInterestException extends ApplicationException {
  constructor(errors: string[]) {
    super('Error(s) occurred while trying to accept search request interest.');
    this.withContext({ errors });
  }
}
