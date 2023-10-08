import { Entity, ManyToOne } from '@mikro-orm/core';
import { ObjectType } from '@nestjs/graphql';
import { AuditableEntity } from '../../common';
import { Role } from './role.entity';

@ObjectType()
@Entity({ tableName: 'user_authority' })
export class UserAuthorityEntity extends AuditableEntity {
  @ManyToOne(() => Role, { eager: true })
  role!: Role;

  constructor() {
    super();
  }
}
