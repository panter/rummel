import dotenv from 'dotenv';
import { DateResolver } from 'graphql-scalars';
import axios from 'axios';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import SchemaBuilder from '@pothos/core';
import AddGraphQLPlugin from '@pothos/plugin-add-graphql';
import { Storage, GetFilesOptions } from '@google-cloud/storage';

import multer from 'multer';
import {
  Asset,
  AssetAccess,
  AssetProvider,
  AssetService,
  GcloudStorageService,
  NewAssetFile,
  StorageService,
} from '@rummel/asset-manager';

dotenv.config();
const port = process.env.PORT ? Number(process.env.PORT) : 4000;

const projectId = process.env.PROJECT_ID ?? '';
const credentials = {
  client_email: process.env.CLIENT_EMAIL ?? '',
  private_key: process.env.PRIVATE_KEY ?? '',
};

const storageService: StorageService = new GcloudStorageService({
  projectId,
  privateKey: credentials.private_key,
  clientEmail: credentials.client_email,
  privateBucket: process.env.GCLOUD_BUCKET_PRIVATE,
  publicBucket: process.env.GCLOUD_BUCKET_PUBLIC,
});

const storage = new Storage({
  projectId,
  credentials: process.env.ENV_SHORT === 'local' ? credentials : undefined,
});

const builder = new SchemaBuilder<{
  Scalars: {
    DateTime: {
      Input: Date;
      Output: Date;
    };
    // Upload: {
    //   Input: Upload;
    //   Output: Upload;
    // };
  };
}>({
  notStrict:
    'Pothos may not work correctly when strict mode is not enabled in tsconfig.json',
  plugins: [AddGraphQLPlugin],
} as any);

builder.addScalarType('DateTime', DateResolver, {});

enum BUCKET_NAMES {
  photos = 'rummel_samples_photos',
}

const BucketName = builder.enumType(BUCKET_NAMES, { name: 'BucketName' });

class AssetObject {
  bucketName: string;
  id: string;
  name: string;
  url: string;

  constructor(config: {
    bucketName: string;
    id: string;
    name: string;
    url: string;
  }) {
    this.bucketName = config.bucketName;
    this.id = config.id;
    this.name = config.name;
    this.url = config.url;
  }
}
const assetT = builder.objectType(AssetObject, {
  name: 'Asset',
  description: 'GCloud storage asset',
  fields: (t) => ({
    bucketName: t.exposeString('bucketName'),
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    url: t.exposeString('url'),
  }),
});

class CreateAssetUploadUrl {
  publicUrl: string;
  signedUploadUrl: string;
  constructor(config: { signedUploadUrl: string; publicUrl: string }) {
    this.publicUrl = config.publicUrl;
    this.signedUploadUrl = config.signedUploadUrl;
  }
}
const CreateAssetUploadUrlT = builder.objectType(CreateAssetUploadUrl, {
  name: 'CreateAssetUploadUrl',
  description: 'Create asset upload Url object',
  fields: (t) => ({
    publicUrl: t.exposeString('publicUrl'),
    signedUploadUrl: t.exposeString('signedUploadUrl'),
  }),
});

builder.queryType({
  fields: (t) => ({
    hello: t.string({
      args: {
        name: t.arg.string(),
      },
      resolve: (_parent, { name }) => `hello, ${name || 'World'}`,
    }),
    asset: t.field({
      type: AssetObject,
      args: {
        fileName: t.arg({ type: 'String', required: true }),
        bucketName: t.arg({ type: 'String' }),
      },
      resolve: async (_parent, args) => {
        const bucketName = args.bucketName ?? BUCKET_NAMES.photos;
        const file = await storage.bucket(bucketName).file(args.fileName).get();
        console.log(file[0]);

        return new AssetObject({
          bucketName,
          id: file[0].id ?? Math.random().toFixed(24).toString(),
          name: file[0].name,
          url,
        });
      },
    }),
    assets: t.field({
      type: [AssetObject],
      args: { bucketName: t.arg({ type: 'String' }) },
      resolve: async (_parent, args) => {
        const bucketName = args.bucketName ?? BUCKET_NAMES.photos;
        const [assets] = await getAssets();

        return assets.map((a, i) => {
          const url = `${a.storage.apiEndpoint}/${bucketName}/${a.name}`;
          const asset = new AssetObject({
            bucketName,
            id: a.id ?? Math.random().toFixed(24).toString(),
            name: a.name,
            url,
          });
          if (!i) console.log('a', a);
          return asset;
        });
      },
    }),
  }),
});
class File {
  filename: string;
  mimetype: string;
  encoding: string;
  constructor(config: {
    filename: string;
    mimetype: string;
    encoding: string;
  }) {
    this.encoding = config.encoding;
    this.filename = config.filename;
    this.mimetype = config.mimetype;
  }
}
const Object = builder.objectType(File, {
  name: 'File',
  fields: (t) => ({
    filename: t.exposeString('filename'),
    mimetype: t.exposeString('mimetype'),
    encoding: t.exposeString('encoding'),
  }),
});

builder.mutationType({
  fields: (t) => ({
    // singleUpload: t.field({
    //   type: 'Upload',
    //   args: { file: t.arg({ type: 'Upload', required: true }) },
    //   resolve: async () => {
    //     return null;
    //   },
    // }),
    assetUpload: t.field({
      type: CreateAssetUploadUrl,
      args: {
        bucketName: t.arg({ type: BucketName }),
        tenant: t.arg({ type: 'String', required: true }),
        path: t.arg({ type: 'String', required: true }),
      },
      nullable: true,
      resolve: async (_parent, { bucketName, tenant, path }) => {
        console.log('bucketName', bucketName);

        const createAssetUploadUrl = await createUploadUrl({
          bucketName: bucketName ?? BUCKET_NAMES.photos,
          tenant,
          path: '`${bucketPath}/${randomString}`',
        });

        console.log('createAssetUploadUrl', createAssetUploadUrl);
        // const result = await fetch(createAssetUploadUrl.signedUploadUrl, {
        //   body: acceptedFiles[0],
        //   method: 'PUT',
        // });
        // const imageUrl = await uploadPictureToCloudStorage();
        // return null;
        // return 'bucket';

        return createAssetUploadUrl;
      },
    }),
    hello: t.string({
      args: {
        name: t.arg.string(),
      },
      resolve: (_parent, { name }) => `mutate, ${name || 'World'}`,
    }),
  }),
});

const createUploadUrl = async ({
  bucketName,
  path,
  tenant,
}: {
  bucketName: BUCKET_NAMES;
  path: string;
  tenant: string;
}) => {
  const fullPath = `${tenant}/${path}`;

  const file = storage.bucket(bucketName).file(fullPath);
  const publicUrl = file.publicUrl();
  const [signedUploadUrl] = await file.getSignedUrl({
    version: 'v4',
    action: 'write',
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
  });

  const createAssetUploadUrl = new CreateAssetUploadUrl({
    publicUrl,
    signedUploadUrl,
  });

  return createAssetUploadUrl;
};
const schema = builder.toSchema();

const server = new ApolloServer({
  schema,
});

const { url } = await startStandaloneServer(server, {
  listen: { port },
});

console.log(`🚀  Server ready at: ${url}`);

const getAssets = async (query?: GetFilesOptions) =>
  await storage.bucket(BUCKET_NAMES.photos).getFiles(query);

const uploadPictureToCloudStorage = async (
  originalUrl: string,
  targetPath: string,
) => {
  const response = await axios({
    url: originalUrl,
    method: 'GET',
    responseType: 'stream',
  });

  if (response.status !== 200) {
    throw new Error('image could not be downloaded');
  }
  const extension = originalUrl.split('?')[0].split('.').pop();
  const file = storage
    .bucket(BUCKET_NAMES.photos)
    .file(`images/${targetPath}.${extension}`);

  await response.data.pipe(file.createWriteStream());

  return file.publicUrl();
};
