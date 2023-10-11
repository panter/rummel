import { storage } from '../../AssetService.js';
import { builder } from '../builder.js';
import { Asset } from './asset.js';

builder.queryType({
  fields: (t) => ({
    asset: t.field({
      type: Asset,
      args: {
        id: t.arg.string({ required: true }),
        bucketName: t.arg.string({ required: true }),
      },
      nullable: true,
      resolve: async (_parent, { id, bucketName }) => {
        const bucket = storage.bucket(bucketName);

        const asset = bucket.file(id);
        
        if (!asset) return null;
        return new Asset({
          id: asset.id ?? '',
          name: asset.name,
          publicUrl: asset.publicUrl(),
        });
      },
    }),
    assets: t.field({
      type: [Asset],
      args: {
        id: t.arg.string(),
        bucketName: t.arg.string({ required: true }),
      },
      resolve: async (_parent, { id, bucketName }) => {
        const bucket = storage.bucket(bucketName);

        const [files] = await bucket.getFiles({
          autoPaginate: true,
          maxApiCalls: 2,
          versions: true,
        });

        return files.map(
          (f) =>
            new Asset({
              id: f.id,
              publicUrl: f.publicUrl(),
              name: f.name,
            }),
        );
      },
    }),
  }),
});
