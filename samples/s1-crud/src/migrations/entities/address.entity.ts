import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Address {
  @Field(() => ID)
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Field()
  @Property()
  address!: string;
}
