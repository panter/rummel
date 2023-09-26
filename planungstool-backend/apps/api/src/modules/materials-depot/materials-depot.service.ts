import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';

import { Injectable } from '@nestjs/common';
import { MaterialsDepot } from './entities/materials-depot.entity';

@Injectable()
export class MaterialsDepotService {
  private repository: EntityRepository<MaterialsDepot>;

  constructor(private readonly em: EntityManager) {
    this.repository = em.getRepository(MaterialsDepot);
  }
}
