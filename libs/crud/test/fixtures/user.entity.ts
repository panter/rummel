import { Entity, PrimaryKey, Property } from '@mikro-orm/postgresql';
import { Field, ObjectType } from '@nestjs/graphql';
import { v4 } from 'uuid';
import { CrudField } from '../../src';

@Entity()
@ObjectType()
export class User {
  static readonly entityName = 'User';

  @CrudField({ hideCreate: true, hideUpdate: true })
  @Field()
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Field()
  @Property()
  name!: string;
}
