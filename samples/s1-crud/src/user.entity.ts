import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryKey()
  id: number;

  @Field()
  @Property()
  name: string;
}
