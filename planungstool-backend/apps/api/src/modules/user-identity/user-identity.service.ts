/* eslint-disable @typescript-eslint/no-unused-vars */
import { FilterQuery } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { EventBusService, UserIdentityProvider } from '@panter/nestjs-utils';
import { User } from './user.entity';

@Injectable()
export class UserIdentityService extends UserIdentityProvider<User> {
  constructor(
    private readonly em: EntityManager,
    private readonly eventBus: EventBusService,
  ) {
    super();
  }

  private getUserEntity(filter: FilterQuery<User>): Promise<User | null> {
    return this.em.findOne(User, filter);
  }

  getUserIdentity(id: string): Promise<User | null> {
    return this.getUserEntity({ id });
  }

  getUserIdentityByPhoneNumber(phoneNumber: string): Promise<User | null> {
    throw new NotImplementedException();
  }

  getUserIdentityByEmail(email: string): Promise<User | null> {
    return this.em.findOne(User, { email });
  }

  async createUserIdentityFromPhoneNumber(phoneNumber: string): Promise<User> {
    throw new NotImplementedException();
  }

  async createUserIdentityFromEmail(email: string): Promise<User> {
    throw new NotImplementedException();
  }

  async save(user: User): Promise<void> {
    await this.em.persistAndFlush(user);
  }
}
