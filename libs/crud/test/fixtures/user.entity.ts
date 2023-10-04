import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { CrudField } from '../../src';

@Entity()
@ObjectType()
export class User {
  @CrudField({ hideCreate: true, hideUpdate: true })
  @Field()
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Field()
  @Property()
  name!: string;
}
