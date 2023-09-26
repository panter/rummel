import { AppAsset, AppAssetRepository } from '@panter/nestjs-utils';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { BuildingComponent } from './entities/building-component.entity';
import { BuildingComponentRepository } from './building-component.repository';
import { EntityManager } from '@mikro-orm/postgresql';
import { User } from '../user-identity/user.entity';

@Injectable()
export class BuildingComponentAssetService {
  private readonly repository: BuildingComponentRepository;
  private readonly assetRepository: AppAssetRepository;

  constructor(private readonly em: EntityManager) {
    this.repository = em.getRepository(BuildingComponent);
    this.assetRepository = em.getRepository(AppAsset);
  }

  async addAsset(
    buildingComponentId: string,
    assetId: string,
    currentUser: User,
  ): Promise<BuildingComponent> {
    const buildingComponent =
      await this.repository.getBuildingComponentWithAssets(buildingComponentId);
    if (!currentUser.hasSameTenant(buildingComponent)) {
      throw new UnauthorizedException();
    }

    const image = await this.em.findOneOrFail(AppAsset, {
      id: assetId,
      tenant: currentUser.getTenantId(),
    });

    buildingComponent.addImage(image);
    return buildingComponent;
  }

  async deleteAssets(
    materialsDepotId: string,
    assetIds: string[],
    currentUser: User,
  ): Promise<BuildingComponent> {
    const buildingComponent =
      await this.repository.getBuildingComponentWithAssets(materialsDepotId);
    if (!currentUser.hasSameTenant(buildingComponent)) {
      throw new UnauthorizedException();
    }

    //delete images
    buildingComponent.assets
      .getItems()
      .filter((assetRef) => assetIds.includes(assetRef.asset.id))
      .forEach((img) => buildingComponent.removeImage(img));

    return buildingComponent;
  }
}
