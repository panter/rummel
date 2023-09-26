import * as AdmZip from 'adm-zip';
import * as archiver from 'archiver';
import * as fs from 'fs';

import { AppAsset, AssetReference } from '@panter/nestjs-utils';

import { Storage } from '@google-cloud/storage';
import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { join } from 'path';
import { BuildingComponentAssetReference } from '../building-component/entities/building-component-asset-reference.entity';
import { MaterialsDepotAssetReference } from '../materials-depot/entities/materials-depot-asset-reference.entity';
import { ProjectAssetReference } from '../project/entities/project-asset-reference.entity';
import { SearchRequestAssetReference } from '../search-request/search-request-asset-reference.entity';
import { StorageLocationAssetReference } from '../storage-location/storage-location-asset-reference.entity';
import type { MIME_TYPES_KEYS } from './assets-export.enums';

export type AllowedExportEntities =
  | 'materials-depot'
  | 'building-component'
  | 'project'
  | 'search-request'
  | 'storage-location';

@Injectable()
export class AssetsExportService {
  storage: Storage;

  constructor(
    private readonly configService: ConfigService,
    private readonly em: EntityManager,
  ) {
    const gloudCredentials = JSON.parse(
      configService.getOrThrow('GCLOUD_CREDENTIALS'),
    );
    this.storage = new Storage({
      projectId: gloudCredentials?.project_id,
      credentials: gloudCredentials,
    });
  }

  getBucketPathFromUrl(assetUrl: string) {
    return decodeURIComponent(
      assetUrl.replace(
        `https://storage.googleapis.com/${this.configService.getOrThrow(
          'GCLOUD_BUCKET_PUBLIC',
        )}/`,
        '',
      ),
    );
  }

  async downloadAndClean(
    entity: string,
    assets: AssetReference[],
    response: Response,
  ) {
    const zipStream = await this.zipStreamFromAssets(entity, assets);

    response.setHeader('Content-Type', 'application/zip');
    response.setHeader(
      'Content-Disposition',
      `attachment; filename=${entity}-${new Date().getTime()}.zip`,
    );

    zipStream.pipe(response);

    zipStream.on('error', (err) => {
      console.error('Error while zipping:', err);
      response.status(500).send('Error while zipping files.');
    });
  }

  async fetchAssetDetailById(assetId: string): Promise<AppAsset> {
    return await this.em.findOneOrFail(AppAsset, { id: assetId });
  }

  async fetchAssetsByEntityAndId(
    entity: AllowedExportEntities,
    id: string,
    mimeTypes: Array<keyof typeof MIME_TYPES_KEYS>,
  ): Promise<AssetReference[]> {
    let assets: AssetReference[] = [];
    const whereAssetMimeTypes = {
      asset: {
        mimeType: {
          $in: mimeTypes,
        },
      },
    };

    switch (entity) {
      case 'materials-depot':
        assets = await this.em.find(
          MaterialsDepotAssetReference,
          {
            materialsDepot: {
              id,
            },
            ...whereAssetMimeTypes,
          },
          { fields: ['id'] },
        );
        break;
      case 'building-component':
        assets = await this.em.find(
          BuildingComponentAssetReference,
          {
            buildingComponent: {
              id,
            },
            ...whereAssetMimeTypes,
          },
          { fields: ['id'] },
        );
        break;
      case 'project':
        assets = await this.em.find(
          ProjectAssetReference,
          {
            project: {
              id,
            },
            ...whereAssetMimeTypes,
          },
          { fields: ['id'] },
        );
        break;
      case 'search-request':
        assets = await this.em.find(
          SearchRequestAssetReference,
          {
            searchRequest: {
              id,
            },
            ...whereAssetMimeTypes,
          },
          { fields: ['id'] },
        );
        break;
      case 'storage-location':
        assets = await this.em.find(
          StorageLocationAssetReference,
          {
            storageLocation: {
              id,
            },
            ...whereAssetMimeTypes,
          },
          { fields: ['asset'] },
        );
        break;
    }

    return assets;
  }

  async findOneReferenceById(entity: string, id: string) {
    const em = this.em.fork();
    let result;
    switch (entity) {
      case 'materials-depot':
        result = await em.findOneOrFail(
          MaterialsDepotAssetReference,
          { id },
          { populate: ['tags', 'asset'] },
        );
        break;
      case 'building-component':
        result = em.findOneOrFail(
          BuildingComponentAssetReference,
          { id },
          { populate: ['tags', 'asset'] },
        );
        break;
      case 'project':
        result = em.findOneOrFail(
          ProjectAssetReference,
          { id },
          { populate: ['tags', 'asset'] },
        );
        break;
      case 'search-request':
        result = em.findOneOrFail(
          SearchRequestAssetReference,
          { id },
          { populate: ['tags', 'asset'] },
        );
        break;
      case 'storage-location':
        result = em.findOneOrFail(
          StorageLocationAssetReference,
          { id },
          { populate: ['tags', 'asset'] },
        );
        break;
    }

    em.clear();
    return result;
  }

  async zipStreamFromAssets(entity: string, assets: AssetReference[]) {
    const bucket = this.getBucket();
    const zipStream = archiver('zip');

    const duplicates: { [key: string]: number } = {};
    for (const fasset of assets) {
      const asset = await this.findOneReferenceById(entity, fasset.id);

      if (!asset?.asset.url) {
        continue;
      }

      const duplicateCount = duplicates[asset.asset.originalFilename] || 0;
      duplicates[asset.asset.originalFilename] = duplicateCount + 1;

      const bucketFilePath = this.getBucketPathFromUrl(asset.asset.url);
      const file = bucket.file(bucketFilePath);

      // Append each file to the ZIP
      zipStream.append(file.createReadStream(), {
        name: [
          asset.asset.originalFilename,
          duplicateCount ? `-${duplicateCount}` : '',
        ].join(''),
      });
    }

    // This will start the zipping process but won't finalize it yet
    process.nextTick(() => {
      zipStream.finalize();
    });

    return zipStream;
  }

  /**
   *
   * @deprecated use zipStreamFromAssets
   */
  async prepareZipFile(
    entity: string,
    assets: AssetReference[],
  ): Promise<{
    tempFolder: string;
    tempZipName: string;
  }> {
    const tempFolder = join(
      process.cwd(),
      `temp/${entity}-${new Date().getTime()}`,
    );
    const tempZipName = `${tempFolder}.zip`;

    if (!fs.existsSync(tempFolder)) {
      fs.mkdirSync(tempFolder);
    }

    const zip = new AdmZip();

    for (const asset of assets) {
      const bucketFilePath = this.getBucketPathFromUrl(asset.asset.url || '');

      const downloadedTempFile = join(tempFolder, asset.asset.originalFilename);

      await this.getBucketFile(bucketFilePath).download({
        destination: downloadedTempFile,
      });

      zip.addLocalFile(downloadedTempFile);

      await fs.promises.unlink(downloadedTempFile);
    }

    await zip.writeZipPromise(tempZipName, { overwrite: true });

    return {
      tempFolder,
      tempZipName,
    };
  }

  getBucketFile(path: string) {
    return this.getBucket().file(path);
  }

  getBucket() {
    return this.storage.bucket(
      this.configService.getOrThrow('GCLOUD_BUCKET_PUBLIC'),
    );
  }
}
