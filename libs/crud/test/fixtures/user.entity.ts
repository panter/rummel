import { Embedded, Entity, PrimaryKey, Property } from '@mikro-orm/postgresql';
import { Field, ObjectType } from '@nestjs/graphql';
import { v4 } from 'uuid';
import { CrudField } from '../../src';
import { Address } from './address.embeddable';

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

  @CrudField({ isEmbedded: true })
  @Field(() => Address)
  @Embedded(() => Address, { nullable: true })
  address!: Address;
}
