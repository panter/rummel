import { BuildingComponent } from './entities/building-component.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BuildingComponentRepository extends EntityRepository<BuildingComponent> {
  async getBuildingComponentWithAssets(
    buildingComponentId: string,
  ): Promise<BuildingComponent> {
    return this.findOneOrFail(
      { id: buildingComponentId },
      {
        populate: ['assets'],
      },
    );
  }
}
