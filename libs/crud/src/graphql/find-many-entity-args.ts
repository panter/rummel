import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { CrudEntityType } from './crud-types';
import { findSortInput } from './find-sort-input';
import { whereInput } from './find-where-input';

export const findManyEntityArgs = <T, NA extends string>(
  classRef: CrudEntityType<T, NA>,
) => {
  const name = classRef.name + 'FindManyArgs';
  const WhereType = whereInput(classRef);
  const SortByType = findSortInput(classRef);

  @ArgsType()
  @InputType(name, { isAbstract: false })
  class FindManyEntityArgsType {
    @Field(() => WhereType, { nullable: true })
    where: any;

    @Field(() => [SortByType], { nullable: true })
    orderBy: any;

    @Field(() => Int, { nullable: true })
    skip?: number;

    @Field(() => Int, { nullable: true })
    take?: number;
  }

  return FindManyEntityArgsType as any;
};
