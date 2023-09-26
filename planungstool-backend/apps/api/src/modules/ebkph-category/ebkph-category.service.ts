import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';

import { EbkphCategory } from './ebkph-category.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EbkphCategoryService {
  private repository: EntityRepository<EbkphCategory>;

  constructor(private readonly em: EntityManager) {
    this.repository = em.getRepository(EbkphCategory);
  }

  // TODO CRUD
}
