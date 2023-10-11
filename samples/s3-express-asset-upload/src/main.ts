import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';

import { InMemoryAssetProvider } from './in-memory-asset-provider';
import process from 'process';
import multer from 'multer';
import {
  AssetAccess,
  AssetProvider,
  AssetService,
  GcloudStorageService,
  NewAssetFile,
  StorageService,
} from '@rummel/asset-manager';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;
const upload = multer();

const assetProvider: AssetProvider = new InMemoryAssetProvider();
const storageService: StorageService = new GcloudStorageService({
  projectId: process.env.PROJECT_ID,
  privateKey: process.env.PRIVATE_KEY,
  clientEmail: process.env.CLIENT_EMAIL,
  privateBucket: process.env.GCLOUD_BUCKET_PRIVATE,
  publicBucket: process.env.GCLOUD_BUCKET_PUBLIC,
});

const assetService = new AssetService(assetProvider, storageService);

//current user or tenant id, will be used for creating sub-folder
const ownerId = '1';

app.post(
  '/upload',
  upload.single('file'),
  async (req: Request, res: Response) => {
    const access = req.body.access;
    const file = req.file;

    if (!file) {
      throw new Error(`File not provided`);
    }
    if (!access) {
      throw new Error(
        `Mandatory 'access' property is missing please set access to  '${AssetAccess.public}' or '${AssetAccess.private}'`,
      );
    }

    const createdAsset = await assetService.upload(
      new NewAssetFile({
        buffer: file.buffer,
        name: file.originalname,
        size: file.size,
        mimeType: file.mimetype,
      }),
      'gcloud',
      access,
      ownerId,
    );

    res.json(createdAsset);
  },
);

app.get('/download/:assetId', async (req: Request, res: Response) => {
  const assetId = req.params.assetId;
  const asset = await assetService.download(assetId, ownerId);
  res.set({
    'Content-Disposition': `inline; filename="${asset.name}"`,
    'Content-Type': asset.mimeType,
    'Content-Length': asset.size,
  });
  res.end(asset.buffer);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
