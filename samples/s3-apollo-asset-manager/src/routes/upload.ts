import express, { Request, Response } from 'express';

import multer from 'multer';
import { AssetAccess, NewAssetFile } from '@rummel/asset-manager';

import { assetService } from '../main.js';

const router = express.Router();
const upload = multer();

router.post(
  '/upload',
  upload.single('file'),
  async (req: Request, res: Response) => {
    try {
      const access = req.body.access;
      const tenant = req.body.tenant;
      const file = req.file;

      if (!file) {
        throw new Error(`File not provided`);
      }
      if (!access)
        throw new Error(
          `Mandatory 'access' property is missing please set access to  '${AssetAccess.public}' or '${AssetAccess.private}'`,
        );
      if (!tenant)
        throw new Error(
          `Mandatory 'tenant' property is missing please supply tenant`,
        );

      const asset = new NewAssetFile({
        buffer: file.buffer,
        name: file.originalname,
        size: file.size,
        mimeType: file.mimetype,
      });

      const createdAsset = await assetService.upload(
        asset,
        'gcloud',
        access,
        tenant,
      );
      console.log('createdAsset', createdAsset);

      res.json(createdAsset);
    } catch (e) {
      console.error(e);
    }
  },
);

export { router };
