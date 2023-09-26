import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';

import { Injectable } from '@nestjs/common';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  private repository: EntityRepository<Project>;

  constructor(private readonly em: EntityManager) {
    this.repository = em.getRepository(Project);
  }

  // TODO CRUD
}
