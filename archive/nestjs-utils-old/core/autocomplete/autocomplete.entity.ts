import { Entity, EntityRepositoryType, Property } from '@mikro-orm/core';
import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { AppEntity } from '../../common';
import { AutocompleteRepository } from './autocomplete.repository';
import { CrudObject } from '../../../../libs/crud/src/graphql/crud-object.decorator';

@ObjectType()
@CrudObject()
@Entity({
  tableName: 'autocomplete',
  customRepository: () => AutocompleteRepository,
})
export class Autocomplete extends AppEntity {
  @HideField()
  [EntityRepositoryType]?: AutocompleteRepository;

  @Field()
  @Property()
  key: string;

  @Field()
  @Property()
  value: string;

  constructor(key: string, value: string) {
    super();
    this.key = key;
    this.value = value;
  }
}
