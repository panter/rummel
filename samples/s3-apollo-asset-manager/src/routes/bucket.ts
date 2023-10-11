import dotenv from 'dotenv';
import express, { Request, Response } from 'express';

import { AssetAccess } from '@rummel/asset-manager';

import { Asset } from '../graphql/modules/asset.js';
import { storageService } from '../main.js';

dotenv.config();

const router = express.Router();

router.get('/bucket/:bucketName/', async (req: Request, res: Response) => {
  const bucketName = req.params.bucketName;
  try {
    const files = await storageService.getFiles(bucketName);
    const assets = files.map((f) => {
      return f.id
        ? new Asset({
            id: f.id,
            name: f.name,
            publicUrl: f.publicUrl(),
          })
        : null;
    });

    res.json({ assets });
  } catch (e) {
    console.error(e);
  }
  return;
});

export { router };
