import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Property } from '@mikro-orm/core';
import { AppEntity } from '../../common/entities/app.entity';

@ObjectType()
@Entity({ tableName: 'permission_subject' })
export class PermissionSubject extends AppEntity {
  @Field()
  @Property()
  name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }
}
