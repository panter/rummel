import { ApplicationException } from '../../../../../common';
import { AssetAccess } from '../../../asset';

export class BucketsNotConfiguredException extends ApplicationException {
  readonly access: AssetAccess;

  constructor(access: AssetAccess) {
    super(`${access} bucket is not configured.`);
    this.access = access;
  }
}
