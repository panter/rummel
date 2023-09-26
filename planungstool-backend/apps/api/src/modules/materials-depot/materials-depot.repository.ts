import { EntityRepository } from '@mikro-orm/postgresql';
import { IMAGE_MIME_TYPE_KEYS } from '../assets-export/assets-export.enums';
import { Injectable } from '@nestjs/common';
import { MaterialsDepot } from './entities/materials-depot.entity';

@Injectable()
export class MaterialsDepotRepository extends EntityRepository<MaterialsDepot> {
  async getMaterialsDepotWithAssets(
    materialsDepotId: string,
  ): Promise<MaterialsDepot> {
    return this.findOneOrFail(
      { id: materialsDepotId },
      {
        populate: ['assets'],
      },
    );
  }

  async getMaterialsDepotWithImages(
    materialsDepotId: string,
  ): Promise<MaterialsDepot> {
    return this.findOneOrFail(
      {
        id: materialsDepotId,
        assets: {
          asset: {
            mimeType: {
              $in: IMAGE_MIME_TYPE_KEYS,
            },
          },
        },
      },
      {
        populate: ['assets'],
      },
    );
  }
}
