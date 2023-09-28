import { Entity, PrimaryKey } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class User {
  @Field()
  @PrimaryKey({ autoincrement: true })
  id!: number;
}
