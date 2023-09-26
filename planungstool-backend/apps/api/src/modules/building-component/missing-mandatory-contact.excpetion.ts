import { ApplicationException } from '@panter/nestjs-utils';

export class MissingMandatoryContactException extends ApplicationException {
  constructor(missingContactTypes: string[]) {
    super(`Missing mandatory contact types: ${missingContactTypes}`);
    this.withContext({ missingContacts: missingContactTypes });
  }
}
