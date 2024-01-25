import {
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { Permission } from '../authorization';
import { AppUser } from './app-user.entity';

@ObjectType()
@Entity()
export class AppRole {
  @Field(() => ID)
  @PrimaryKey()
  name: string;

  @ManyToMany({
    entity: () => Permission,
  })
  permissions = new Collection<Permission>(this);

  @OneToMany(() => AppUser, (u) => u.role)
  users = new Collection<AppUser>(this);

  /**
   * Whether this role is the default role for new users.
   */
  @HideField()
  @Property({ default: false })
  isDefault = false;

  constructor(name: string) {
    this.name = name;
  }

  assignPermission(permission: Permission) {
    this.permissions.add(permission);
  }
}
