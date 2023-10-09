import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { PostalCodeRepository } from './postal-code.repository';

@ObjectType()
@Entity({
  tableName: 'postal_code',
  customRepository: () => PostalCodeRepository,
})
export class PostalCode {
  @HideField()
  [EntityRepositoryType]?: PostalCodeRepository;

  @Field(() => ID)
  @PrimaryKey()
  postalCode: string;

  @Field()
  @Property()
  canton: string;

  @Field()
  @Property()
  description: string;

  constructor(postalCode: string, canton: string, description: string) {
    this.postalCode = postalCode;
    this.canton = canton;
    this.description = description;
  }
}
