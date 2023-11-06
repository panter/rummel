import {
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryKey,
} from '@mikro-orm/core';
import { Field, ID, ObjectType } from '@nestjs/graphql';
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

  constructor(name: string) {
    this.name = name;
  }

  assignPermission(permission: Permission) {
    this.permissions.add(permission);
  }
}
