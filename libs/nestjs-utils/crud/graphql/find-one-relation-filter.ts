import { Type } from '@nestjs/common';
import { Field, InputType } from '@nestjs/graphql';
import { whereInput } from './find-where-input';
import { typesCache } from './types-cache';
import { getCrudInfosForType, getTypeName } from './utils';

export const findOneRelationFilter = <T>(classRef: Type<T>) => {
  const typeName = getTypeName(classRef);
  const name = typeName + 'OneRelationFilter';
  if (typesCache[name]) {
    return typesCache[name];
  }

  @InputType(name, { isAbstract: false })
  class RelationFilterArgsType {}
  typesCache[name] = RelationFilterArgsType;

  getCrudInfosForType(whereInput(classRef)).forEach((p) => {
    Object.defineProperty(RelationFilterArgsType.prototype, p.schemaName, {
      writable: true,
      configurable: true,
    });
    Field(() => p.typeFn(), p.options)(
      RelationFilterArgsType.prototype,
      p.schemaName,
    );
  });
  return RelationFilterArgsType;
};
