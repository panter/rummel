import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { UserIdentity } from '../authentication/interfaces/user-identity';
import { v4 } from 'uuid';
import { AppRole } from './role.entity';
import { PermissionAction, UserAuthority } from '../authorization';
import { AppAbility } from '../authorization/interfaces/types';
import { subject } from '@casl/ability';

@ObjectType()
@Entity()
export class AppUser implements UserIdentity, UserAuthority {
  @Field(() => ID, { description: 'Unique identifier of the entity' })
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Field()
  @Property({ unique: true })
  email: string;

  @Field(() => AppRole, { description: 'Role of the user' })
  @ManyToOne(() => AppRole, { eager: true })
  role!: AppRole;

  /**
   * TODO: add encryption
   */
  @HideField()
  @Property({ nullable: true, unique: true })
  personalToken?: string;

  @HideField()
  ability: AppAbility;

  getRole(): string {
    return this.role.name;
  }

  getTenantId(): string {
    return 'DEFAULT';
  }

  getUserNaturalKey(): string {
    return this.email;
  }

  getPersonalToken(): string | undefined {
    return this.personalToken;
  }

  markAsVerified(): void {}

  can(action: PermissionAction, subjectName: string, condition?: any): boolean {
    return condition
      ? this.ability.can(action, subject(subjectName, condition))
      : this.ability.can(action, subjectName);
  }

  getUserAuthorityId(): string {
    return this.id;
  }
}
