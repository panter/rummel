import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { v4 } from 'uuid';

@ObjectType()
@Entity({
  tableName: 'autocomplete',
})
export class Autocomplete {
  static readonly entityName = 'Autocomplete';

  @Field(() => ID)
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

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

  toString(): string {
    return `${this.constructor.name}#${this.id}`;
  }
}
