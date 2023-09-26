import { Type } from '@nestjs/common';
import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { ConnectRelationInput } from './generic-types';
import { typesCache } from './types-cache';
import { upsertInput } from './upsert-input';
import { getTypeName } from './utils';

export const updateOneRelationInput = <T>(
  classRef: Type<T>,
  options?: {
    parentRef: Type<any>;
    hideCreate?: boolean;
    hideUpdate?: boolean;
    parentProperty?: string;
  },
) => {
  const typeName = getTypeName(classRef);
  const withoutTypeName = options?.parentRef
    ? `Without${getTypeName(options?.parentRef)}`
    : '';
  const name = `${typeName}UpdateNestedOne${withoutTypeName}Input`;

  if (typesCache[name]) {
    return typesCache[name];
  }

  @ArgsType()
  @InputType(name, { isAbstract: false })
  class RelationInputArgsType {
    @Field(() => ConnectRelationInput, { nullable: true })
    connect?: ConnectRelationInput;

    @Field(() => Boolean, { nullable: true })
    disconnect?: boolean;

    create: any;

    update: any;
  }

  typesCache[name] = RelationInputArgsType;
  if (!options?.hideCreate) {
    // call upsertInput after adding to cache because of recursive call
    const CreateInputType = upsertInput(classRef, {
      ignoreType: options?.parentRef,
    });
    Field(() => CreateInputType, { nullable: true })(
      RelationInputArgsType.prototype,
      'create',
    );
  }

  if (!options?.hideUpdate) {
    // call upsertInput after adding to cache because of recursive call
    const UpdateInputType = upsertInput(classRef, {
      ignoreType: options?.parentRef,
      isUpdate: true,
    });
    Field(() => UpdateInputType, { nullable: true })(
      RelationInputArgsType.prototype,
      'update',
    );
  }

  return RelationInputArgsType;
};
