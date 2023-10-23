import { AppUser } from './app-user.entity';
import { UserIdentityProvider } from './interfaces/user-identity-provider';
import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { Transactional } from '@panter/nestjs-utils';

@Injectable()
export class AppUserIdentityProvider extends UserIdentityProvider<AppUser> {
  constructor(private em: EntityManager) {
    super();
  }

  @Transactional()
  getUserById(userId: string, _: any): Promise<AppUser | null> {
    return this.em.findOne(AppUser, { id: userId });
  }

  @Transactional()
  getUserByAuthorityId(email: string, _: any): Promise<AppUser | null> {
    return this.em.findOne(AppUser, { email });
  }

  @Transactional()
  async createUserIdentity(email: string) {
    const user = this.em.create(AppUser, { email });
    this.em.persist(user);
    return user;
  }

  @Transactional()
  async save(user: AppUser): Promise<void> {
    this.em.persist(user);
  }
}
