import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { AppAsset } from './app-asset.entity';

@Injectable()
export class AppAssetRepository extends EntityRepository<AppAsset> {
  async getOne(assetId: string, ownerId: string) {
    return this.findOneOrFail({ id: assetId, tenant: ownerId });
  }
}
