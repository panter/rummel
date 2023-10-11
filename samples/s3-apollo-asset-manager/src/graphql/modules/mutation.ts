import { storage } from '../../AssetService.js';
import { builder } from '../builder.js';
import { AssetUploadUrlResult } from './assetUploadUrlResult.js';

enum BUCKET_NAMES {
  photos = 'rummel_sample_photos',
}

const BucketName = builder.enumType(BUCKET_NAMES, {
  name: 'BucketName',
});

const uploadAssetWithUrl = async ({
  fullPath,
  bucketName,
}: {
  fullPath: string;
  bucketName: string;
}) => {
  console.log('uploadAssetWithUrl: ', { fullPath, bucketName });
  const bucket = storage.bucket(bucketName);

  // const fullPath = `${companyId}/${path}`;

  const file = bucket.file(fullPath);
  const publicUrl = file.publicUrl();
  const [signedUploadUrl] = await file.getSignedUrl({
    version: 'v4',
    action: 'write',
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
  });
  const urls = { publicUrl, signedUploadUrl };
  console.log('urls: ', urls);
  return urls;
};

builder.mutationType({
  fields: (t) => ({
    createAsset: t.field({
      type: AssetUploadUrlResult,
      args: {
        bucketName: t.arg({ type: BucketName, required: true }),
        imageUrl: t.arg.string({ required: true }),
      },
      resolve: async (_parent, { bucketName, imageUrl }) => {
        console.log('bucketName', bucketName, imageUrl);
        const assetUploadUrlConfig = await uploadAssetWithUrl({
          bucketName,
          fullPath: `${imageUrl}`,
        });
        return new AssetUploadUrlResult(assetUploadUrlConfig);
      },
    }),
    updateAsset: t.field({
      type: 'String',
      args: {
        bucket: t.arg({ type: BucketName, required: true }),
        imageUrl: t.arg({ type: 'String', required: true }),
      },
      resolve: async (_parent, { bucket, imageUrl }) => {
        console.log('bucket', bucket, imageUrl);

        return 'bucket';
      },
    }),
    deleteAsset: t.field({
      type: 'String',
      args: {
        bucket: t.arg({ type: BucketName, required: true }),
        imageUrl: t.arg({ type: 'String', required: true }),
      },
      resolve: async (_parent, { bucket, imageUrl }) => {
        console.log('bucket', bucket, imageUrl);

        return 'bucket';
      },
    }),
  }),
});
