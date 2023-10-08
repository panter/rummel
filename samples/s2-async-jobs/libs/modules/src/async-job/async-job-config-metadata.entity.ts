import { Field, ObjectType } from '@nestjs/graphql';
import { Embeddable, Property } from '@mikro-orm/core';

@ObjectType()
@Embeddable()
export class AsyncJobMetadata {
  @Field()
  @Property()
  key: string;
  @Field()
  @Property()
  value: string;

  constructor(key: string, value: string) {
    this.key = key;
    this.value = value;
  }
}
