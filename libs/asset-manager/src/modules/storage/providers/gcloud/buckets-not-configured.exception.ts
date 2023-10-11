import { AssetAccess } from '../../../asset';
import { ApplicationException } from '@panter/nestjs-utils';

export class BucketsNotConfiguredException extends ApplicationException {
  readonly access: AssetAccess;

  constructor(access: AssetAccess) {
    super(`${access} bucket is not configured.`);
    this.access = access;
  }
}
