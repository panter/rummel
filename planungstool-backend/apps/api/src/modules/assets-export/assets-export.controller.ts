import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import {
  DOCUMENT_MIME_TYPE_KEYS,
  IMAGE_MIME_TYPE_KEYS,
} from './assets-export.enums';
import {
  AllowedExportEntities,
  AssetsExportService,
} from './assets-export.service';

@Controller('assets-export')
export class AssetsExportController {
  constructor(private readonly assetsExportService: AssetsExportService) {}

  // todo missing checking authorized user
  @Get('/images/:entity/:id')
  async exportAllImages(
    @Param('entity') entity: AllowedExportEntities,
    @Param('id') id: string,
    @Res() response: Response,
  ) {
    const assets = await this.assetsExportService.fetchAssetsByEntityAndId(
      entity,
      id,
      IMAGE_MIME_TYPE_KEYS,
    );

    await this.assetsExportService.downloadAndClean(entity, assets, response);
  }

  // todo missing checking authorized user
  @Get('/documents/:entity/:id')
  async exportAllDocuments(
    @Param('entity') entity: AllowedExportEntities,
    @Param('id') id: string,
    @Res() response: Response,
  ) {
    const assets = await this.assetsExportService.fetchAssetsByEntityAndId(
      entity,
      id,
      DOCUMENT_MIME_TYPE_KEYS,
    );

    await this.assetsExportService.downloadAndClean(entity, assets, response);
  }

  // todo missing checking authorized user
  @Get('/:assetId')
  async expotAsset(@Param('assetId') assetId: string, @Res() res: Response) {
    const asset = await this.assetsExportService.fetchAssetDetailById(assetId);

    const bucketFilePath = this.assetsExportService.getBucketPathFromUrl(
      asset.url || '',
    );

    const file = this.assetsExportService.getBucketFile(bucketFilePath);

    const checkFile = await file.exists();

    if (!checkFile[0]) {
      return res.sendStatus(404);
    }

    res.setHeader(
      'Content-disposition',
      `attachment; filename=${decodeURI(asset.originalFilename)}`,
    );

    file.createReadStream().pipe(res);
  }
}
