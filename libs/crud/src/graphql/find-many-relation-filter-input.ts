import { Type } from '@nestjs/common';
import { Field, InputType } from '@nestjs/graphql';
import { whereInput } from './find-where-input';
import { typesCache } from './types-cache';
import { getTypeName } from './utils';

export const findManyRelationFilterInput = <T>(classRef: Type<T>) => {
  const typeName = getTypeName(classRef);
  const name = typeName + 'ManyRelationFilter';
  if (typesCache[name]) {
    return typesCache[name];
  }

  @InputType(name, { isAbstract: false })
  class ManyRelationFilterArgsType {
    every: any;
  }
  typesCache[name] = ManyRelationFilterArgsType;

  // define the fields after the type is defined beacuse of recursion
  const WhereInputType = whereInput(classRef);
  Field(() => WhereInputType, { nullable: true })(
    ManyRelationFilterArgsType.prototype,
    'every',
  );

  return ManyRelationFilterArgsType;
};
