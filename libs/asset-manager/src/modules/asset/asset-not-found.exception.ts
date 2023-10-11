import { ApplicationException } from '@panter/nestjs-utils';

export class AssetNotFoundException extends ApplicationException {
  constructor(assetId: string) {
    super(`Asset ${assetId}}`);
  }
}
