import { Type } from '@nestjs/common';
import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { findSortInput } from './find-sort-input';
import { whereInput } from './find-where-input';

export const findManyEntityArgs = <T>(classRef: Type<T>) => {
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
