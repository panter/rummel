import { Type } from '@nestjs/common';
import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { ConnectRelationInput } from './generic-types';
import { typesCache } from './types-cache';
import { upsertInput } from './upsert-input';
import { getTypeName } from './utils';

export const createOneRelationInput = <T>(
  classRef: Type<T>,
  options?: {
    parentRef: Type<any>;
    hideCreate?: boolean;
    parentProperty?: string;
  },
) => {
  const typeName = getTypeName(classRef);
  const withoutTypeName = options?.parentRef
    ? `Without${getTypeName(options?.parentRef)}`
    : '';
  const name = `${typeName}CreateNestedOne${withoutTypeName}Input`;

  if (typesCache[name]) {
    return typesCache[name];
  }

  @ArgsType()
  @InputType(name, { isAbstract: false })
  class RelationInputArgsType {
    @Field(() => ConnectRelationInput, { nullable: true })
    connect: any;

    create: any;
  }

  typesCache[name] = RelationInputArgsType;

  if (!options?.hideCreate) {
    // call createInput after adding to cache because of recursive call
    const WhereInputType = upsertInput(classRef, {
      ignoreType: options?.parentRef,
    });
    Field(() => WhereInputType, { nullable: true })(
      RelationInputArgsType.prototype,
      'create',
    );
  }

  return RelationInputArgsType;
};
