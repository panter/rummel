import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { User } from '../user-identity';

@Injectable()
export class UserQueryService {
  private repository: EntityRepository<User>;

  constructor(private readonly em: EntityManager) {
    this.repository = em.getRepository(User);
  }

  async findOne(id: string): Promise<User> {
    return this.repository.findOneOrFail({ id });
  }
}
