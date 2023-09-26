import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';

import { Dimension } from './dimension.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DimensionService {
  private repository: EntityRepository<Dimension>;

  constructor(private readonly em: EntityManager) {
    this.repository = em.getRepository(Dimension);
  }

  // TODO CRUD
}
