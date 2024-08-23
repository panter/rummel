import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-scalars';
import { CrudField } from '@panter/crud';
import { Address } from './address.entity';
import { Organisation } from './organisation.entity';

@ObjectType()
@Entity()
export class Person {
  static readonly entityName = 'Person';

  @Field(() => ID)
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Field()
  @Property()
  name!: string;

  @CrudField({ relation: { showCreate: true, showUpdate: true } })
  @Field(() => [Address], { nullable: true })
  @ManyToMany({ entity: () => Address, owner: true, eager: true })
  addresses = new Collection<Address>(this);

  @Field(() => Organisation, { nullable: true })
  @ManyToOne(() => Organisation, { nullable: true })
  organisation?: Organisation;

  @Field(() => GraphQLJSON, { nullable: true })
  @Property({ type: 'json', nullable: true })
  meta?: { foo: string; bar: number };
}
