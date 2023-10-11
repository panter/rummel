import dotenv from 'dotenv';
import express, { Express } from 'express';

import { InMemoryAssetProvider } from './InMemoryAssetProvider.js';
import process from 'process';
import {
  AssetProvider,
  AssetService,
  GcloudStorageService,
  StorageService,
} from '@rummel/asset-manager';

import { router as indexRouter } from './routes/index.js';
import { router as uploadRouter } from './routes/upload.js';
import { router as bucketRouter } from './routes/bucket.js';

import { router as downloadRouter } from './routes/download.js';
import { startApolloServer } from './graphql/server.js';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

const assetProvider: AssetProvider = new InMemoryAssetProvider();
export const storageService: StorageService = new GcloudStorageService({
  projectId: process.env.PROJECT_ID,
  privateKey: process.env.PRIVATE_KEY,
  clientEmail: process.env.CLIENT_EMAIL,
  privateBucket: process.env.GCLOUD_BUCKET_PRIVATE,
  publicBucket: process.env.GCLOUD_BUCKET_PUBLIC,
});

export const assetService = new AssetService(assetProvider, storageService);

const startServer = async () => {
  const server = await startApolloServer();
  const app = express();

  server.applyMiddleware({ app });

  try {
    app.get('/', indexRouter);
    app.post('/upload', uploadRouter);
    app.get('/bucket/:bucketName', bucketRouter);
    app.get('/download/:bucketName/:assetId', downloadRouter);

    app.listen({ port }, () => {
      console.log(
        `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`,
      );
    });
  } catch (e) {
    console.error(e);
  }
};

startServer();
