import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';

import { Contact } from './contact.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ContactService {
  private repository: EntityRepository<Contact>;

  constructor(private readonly em: EntityManager) {
    this.repository = em.getRepository(Contact);
  }

  // TODO CRUD
}
