import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AppAsset, AppAssetRepository } from '@panter/nestjs-utils';

import { EntityManager } from '@mikro-orm/postgresql';
import { User } from '../user-identity/user.entity';
import { MaterialsDepot } from './entities/materials-depot.entity';
import { MaterialsDepotRepository } from './materials-depot.repository';

@Injectable()
export class MaterialsDepotAssetService {
  private readonly repository: MaterialsDepotRepository;
  private readonly assetRepository: AppAssetRepository;

  constructor(private readonly em: EntityManager) {
    this.repository = em.getRepository(MaterialsDepot);
    this.assetRepository = em.getRepository(AppAsset);
  }

  async addAsset(
    materialsDepotId: string,
    assetId: string,
    currentUser: User,
  ): Promise<MaterialsDepot> {
    const materialDepot = await this.repository.getMaterialsDepotWithAssets(
      materialsDepotId,
    );
    if (!currentUser.hasSameTenant(materialDepot)) {
      throw new UnauthorizedException();
    }

    const image = await this.em.findOneOrFail(AppAsset, {
      id: assetId,
      tenant: currentUser.getTenantId(),
    });

    materialDepot.addImage(image);
    return materialDepot;
  }

  async deleteAssets(
    materialsDepotId: string,
    assetIds: string[],
    currentUser: User,
  ): Promise<MaterialsDepot> {
    const materialDepot = await this.repository.getMaterialsDepotWithAssets(
      materialsDepotId,
    );
    if (!currentUser.hasSameTenant(materialDepot)) {
      throw new UnauthorizedException();
    }

    //delete images
    materialDepot.assets
      .getItems()
      .filter((assetRef) => assetIds.includes(assetRef.asset.id))
      .forEach((img) => materialDepot.removeImage(img));

    return materialDepot;
  }
}
