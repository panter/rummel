import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { UserIdentity } from './interfaces/user-identity';

@ObjectType()
@Entity()
export class AppUser implements UserIdentity {
  getRole(): string {
    return this.role;
  }

  getTenantId(): string {
    return 'DEFAULT';
  }

  getUserAuthorityId(): string {
    return this.email;
  }

  markAsVerified(): void {}

  @Field(() => ID)
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Field()
  @Property({ unique: true })
  email: string;

  @Field()
  @Property({ default: 'User' })
  role: string;
}
