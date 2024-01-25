import { UserIdentityProvider } from './interfaces/user-identity-provider';
import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { Transactional } from '@panter/nestjs-utils';
import { ConfigService } from '@nestjs/config';
import { AppUser } from '../entities/app-user.entity';
import { AppRole } from '../entities/role.entity';

@Injectable()
export class AppUserIdentityProvider extends UserIdentityProvider<AppUser> {
  private readonly userNaturalKeyProperty: string;

  constructor(
    private em: EntityManager,
    private readonly configService: ConfigService,
  ) {
    super();
    this.userNaturalKeyProperty = configService.getOrThrow<string>(
      'USER_NATURAL_KEY_PROPERTY',
    );
  }

  getUserById(userId: string): Promise<AppUser | null> {
    return this.em.findOne(AppUser, { id: userId });
  }

  getUserByNaturalKey(naturalKey: string): Promise<AppUser | null> {
    return this.em.findOne(AppUser, {
      [this.userNaturalKeyProperty]: naturalKey,
    });
  }

  getUserByPersonalToken(personalToken: string): Promise<AppUser | null> {
    return this.em.findOne(AppUser, { personalToken });
  }

  @Transactional()
  async createUserIdentity(naturalKey: string) {
    const role = await this.em.findOneOrFail(AppRole, { isDefault: true });
    const user = this.em.create(AppUser, {
      [this.userNaturalKeyProperty]: naturalKey,
      role,
    });
    this.em.persist(user);
    return user;
  }

  @Transactional()
  async save(user: AppUser): Promise<void> {
    this.em.persist(user);
  }
}
