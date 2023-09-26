import { Entity, OneToOne, Property } from '@mikro-orm/core';
import { Field, HideField, ObjectType } from '@nestjs/graphql';
import {
  AuditableEntity,
  CrudField,
  Role,
  TenantAware,
  UserAuthority,
  UserAuthorityEntity,
  UserIdentity,
} from '@panter/nestjs-utils';
import { IsEmail } from 'class-validator';

export const USER_TENANT_ID = 'tenant:zirkular';
export const USER_ROLE = 'none';

@ObjectType()
@Entity({ tableName: 'user' })
export class User
  extends AuditableEntity
  implements UserIdentity, UserAuthority, TenantAware
{
  @HideField()
  @OneToOne(() => UserAuthorityEntity, { eager: true })
  userAuthority: UserAuthorityEntity = new UserAuthorityEntity();

  @Property({ nullable: true })
  verifiedAt?: Date;

  @CrudField({
    hideUpdate: true,
  })
  @Field()
  @IsEmail()
  @Property({ nullable: false, unique: true })
  email!: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  notes?: string;

  hasSameTenant(other: TenantAware): boolean {
    return this.getTenantId() === other.getTenantId();
  }

  getRole(): string {
    return USER_ROLE;
  }

  getUserAuthorityId(): string {
    return this.userAuthority.id;
  }

  getTenantId(): string {
    return USER_TENANT_ID;
  }

  updateRole(newRole: Role) {
    this.userAuthority.role = newRole;
  }

  markAsVerified() {
    this.verifiedAt = new Date();
  }
}
