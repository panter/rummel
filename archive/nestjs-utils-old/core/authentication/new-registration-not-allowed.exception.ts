import { ApplicationException } from '../../common';

export class NewRegistrationNotAllowedException extends ApplicationException {
  constructor() {
    super(
      `New registrations are not allowed. Please contact administrator to create new account`,
    );
  }
}
