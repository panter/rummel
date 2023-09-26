import { Entity, Property } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Field, ObjectType } from '@nestjs/graphql';
import { PostalCode, SortDirection } from '@panter/nestjs-utils';

@ObjectType()
@Entity({
  expression: (em: EntityManager) => {
    return em
      .createQueryBuilder(PostalCode)
      .select(['canton as name'])
      .groupBy('canton')
      .orderBy([{ canton: SortDirection.asc }]);
  },
})
export class Canton {
  @Field()
  @Property()
  name!: string;
}
