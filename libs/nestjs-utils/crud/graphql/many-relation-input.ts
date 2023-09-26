import { Type } from '@nestjs/common';
import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { ConnectRelationInput, EntityIdInput } from './generic-types';
import { typesCache } from './types-cache';
import { updateManyEntityInput } from './update-many-entity-input';
import { upsertInput } from './upsert-input';
import { getTypeName } from './utils';

// CRO TODO: hideReference, hideDisconnect
export const manyRelationInput = <T>(
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
  const name = `${typeName}CreateNestedMany${withoutTypeName}Input`;

  if (typesCache[name]) {
    return typesCache[name];
  }

  @ArgsType()
  @InputType(name, { isAbstract: false })
  class RelationInputArgsType {
    @Field(() => [ConnectRelationInput], { nullable: true })
    connect?: ConnectRelationInput[];

    @Field(() => [EntityIdInput], { nullable: true })
    disconnect?: EntityIdInput[];

    create?: any;

    update?: any;
  }

  typesCache[name] = RelationInputArgsType;

  if (!options?.hideCreate) {
    // call createInput after adding to cache because of recursive call
    const CreateInputType = upsertInput(classRef, {
      ignoreType: options?.parentRef,
    });
    Field(() => [CreateInputType], { nullable: true })(
      RelationInputArgsType.prototype,
      'create',
    );
  }

  if (!options?.hideUpdate) {
    // call createInput after adding to cache because of recursive call
    const UpdateInputType = updateManyEntityInput(classRef, {
      ignoreType: options?.parentRef,
    });
    Field(() => [UpdateInputType], { nullable: true })(
      RelationInputArgsType.prototype,
      'update',
    );
  }
  return RelationInputArgsType;
};
