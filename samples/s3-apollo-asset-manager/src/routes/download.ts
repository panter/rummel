import express, { Request, Response } from 'express';

import { AssetAccess } from '@rummel/asset-manager';
import { storageService } from '../main.js';

const router = express.Router();

router.get(
  '/download/:bucketName/:assetId',
  async (req: Request, res: Response) => {
    const assetId = req.params.assetId;
    try {
      const asset = assetId
        ? await storageService.get(assetId, AssetAccess.public)
        : null;
      if (!asset) res.status(400).end();
      else {
        res.end(asset.buffer);
      }
    } catch (e) {
      console.error(e);
    }
    return;
  },
);

export { router };
