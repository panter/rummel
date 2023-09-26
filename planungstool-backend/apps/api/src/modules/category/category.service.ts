import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';

import { Category } from './category.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  private repository: EntityRepository<Category>;

  constructor(private readonly em: EntityManager) {
    this.repository = em.getRepository(Category);
  }

  // TODO CRUD
}
