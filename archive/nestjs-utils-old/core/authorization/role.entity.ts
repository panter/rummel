import {
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { AppEntity } from '../../common/entities/app.entity';
import { Permission } from './permission.entity';
import { UserAuthorityEntity } from './user-authority.entity';

@ObjectType()
@Entity({ tableName: 'role' })
export class Role extends AppEntity {
  @Field()
  @Property()
  name: string;

  @ManyToMany({
    entity: () => Permission,
    pivotTable: 'role_permissions',
    owner: true,
  })
  permissions = new Collection<Permission>(this);

  @OneToMany(() => UserAuthorityEntity, (u) => u.role)
  users = new Collection<UserAuthorityEntity>(this);

  constructor(name: string) {
    super();
    this.name = name;
  }

  assignPermission(permission: Permission) {
    this.permissions.add(permission);
  }
}
