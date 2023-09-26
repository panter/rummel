import { ApplicationException } from '../../../common';

export class AssetNotFoundException extends ApplicationException {
  constructor(assetId: string) {
    super(`Asset ${assetId}}`);
  }
}
