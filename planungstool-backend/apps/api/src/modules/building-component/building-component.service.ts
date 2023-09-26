import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';

import { BuildingComponent } from './entities/building-component.entity';
import { Injectable } from '@nestjs/common';
import { AppAsset, AssetManagerService } from '@panter/nestjs-utils';
import { BuildingComponentAssetReference } from './entities/building-component-asset-reference.entity';

@Injectable()
export class BuildingComponentService {
  private repository: EntityRepository<BuildingComponent>;

  constructor(
    private readonly em: EntityManager,
    private readonly assetManager: AssetManagerService,
  ) {
    this.repository = em.getRepository(BuildingComponent);
  }

  async splitBuildingComponent(
    buildingComponent: BuildingComponent,
    quantity: number,
  ): Promise<BuildingComponent> {
    if (!buildingComponent.quantity || buildingComponent.quantity < quantity) {
      throw new Error('Insufficient quantity to split building component');
    }

    const newBuildingComponent = new BuildingComponent({
      materialsDepot: buildingComponent.materialsDepot,
    });
    buildingComponent.quantity = buildingComponent.quantity - quantity;
    newBuildingComponent.name = buildingComponent.name;
    newBuildingComponent.description = buildingComponent.description;
    newBuildingComponent.quantity = quantity;
    newBuildingComponent.quantityExact = buildingComponent.quantityExact;
    newBuildingComponent.quantityUnit = buildingComponent.quantityUnit;
    newBuildingComponent.constructionYear = buildingComponent.constructionYear;
    newBuildingComponent.constructionYearExact =
      buildingComponent.constructionYearExact;
    newBuildingComponent.co2Savings = buildingComponent.co2Savings;
    newBuildingComponent.co2SavingsExact = buildingComponent.co2SavingsExact;
    newBuildingComponent.condition = buildingComponent.condition;
    newBuildingComponent.harmfulSubstances =
      buildingComponent.harmfulSubstances;
    newBuildingComponent.reusePotential = buildingComponent.reusePotential;
    newBuildingComponent.reusePotentialNotes =
      buildingComponent.reusePotentialNotes;
    newBuildingComponent.locationInBuilding =
      buildingComponent.locationInBuilding;
    newBuildingComponent.locationInBuildingDetail =
      buildingComponent.locationInBuildingDetail;
    newBuildingComponent.showInMatching = buildingComponent.showInMatching;
    newBuildingComponent.storageLocation = buildingComponent.storageLocation;
    newBuildingComponent.ebkphCategory = buildingComponent.ebkphCategory;
    newBuildingComponent.category = buildingComponent.category;
    buildingComponent.dimensions
      .getItems()
      .map((dimension) =>
        newBuildingComponent.dimensions.add(dimension.clone()),
      );
    const assetsCopy = await Promise.all(
      buildingComponent.assets.getItems().map((assetRef) => {
        return this.assetManager.copyAsset(
          assetRef.asset.id,
          assetRef.getTenantId(),
        );
      }),
    );

    assetsCopy.forEach((asset) =>
      newBuildingComponent.assets.add(
        new BuildingComponentAssetReference(
          newBuildingComponent,
          new AppAsset(asset.ownerId, asset),
        ),
      ),
    );
    if (buildingComponent.mainImage) {
      const mainImageCopy = await this.assetManager.copyAsset(
        buildingComponent.mainImage?.id,
        buildingComponent.mainImage?.getTenantId(),
      );
      newBuildingComponent.mainImage = new AppAsset(
        mainImageCopy.ownerId,
        mainImageCopy,
      );
    }

    newBuildingComponent.description = buildingComponent.description;
    this.em.persist(newBuildingComponent);
    return newBuildingComponent;
  }
}
