import { builder } from '../builder.js';

export class AssetUploadUrlResult {
  signedUploadUrl: string;
  publicUrl: string;
  constructor(config: { signedUploadUrl: string; publicUrl: string }) {
    this.signedUploadUrl = config.signedUploadUrl;
    this.publicUrl = config.publicUrl;
  }
}

const AssetUploadUrlResultObject = builder.objectType(AssetUploadUrlResult, {
  name: 'AssetUploadUrlResult',
  fields: (t) => ({
    signedUploadUrl: t.exposeString('signedUploadUrl'),
    publicUrl: t.exposeString('publicUrl'),
  }),
});
