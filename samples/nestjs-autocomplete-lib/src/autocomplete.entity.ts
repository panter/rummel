import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { AutocompleteRepository } from './autocomplete.repository';
import { v4 } from 'uuid';

@ObjectType()
@Entity({
  tableName: 'autocomplete',
})
export class Autocomplete {
  static readonly entityName = 'Autocomplete';

  @HideField()
  [EntityRepositoryType]?: AutocompleteRepository;

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
