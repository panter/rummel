import { Embeddable, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Embeddable()
export class Address {
  static readonly entityName = 'Address';

  @Field()
  @Property()
  street!: string;
}
