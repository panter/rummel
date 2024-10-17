import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { CrudEntityType } from './crud-types';
import { ConnectRelationInput, EntityIdInput } from './generic-types';
import { typesCache } from './types-cache';
import { updateManyEntityInput } from './update-many-entity-input';
import { upsertInput } from './upsert-input';
import { getTypeName } from './utils';

// CRO TODO: hideReference, hideDisconnect
export const manyRelationInput = <T, NA extends string>(
  classRef: CrudEntityType<T, NA>,
  isUpdate: boolean,
  options?: {
    parentRef: CrudEntityType;
    hideCreate?: boolean;
    hideUpdate?: boolean;
    hideDisconnect?: boolean;
    parentProperty?: string;
  },
) => {
  const typeName = getTypeName(classRef);
  const withoutTypeName = options?.parentRef
    ? `Without${getTypeName(options?.parentRef)}`
    : '';
  const operationsName =
    !options?.hideCreate && !options?.hideUpdate
      ? 'ConnectCreateUpdate'
      : !options?.hideCreate
        ? 'ConnectCreate'
        : !options?.hideUpdate
          ? 'ConnectUpdate'
          : 'Connect';

  const type = isUpdate ? 'Update' : 'Create';
  const name = `${typeName}${operationsName}NestedMany${withoutTypeName}${type}Input`;

  if (typesCache[name]) {
    return typesCache[name];
  }

  @ArgsType()
  @InputType(name, { isAbstract: false })
  class RelationInputArgsType {
    @Field(() => [ConnectRelationInput], { nullable: true })
    connect?: ConnectRelationInput[];

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

  if (!options?.hideDisconnect) {
    // call createInput after adding to cache because of recursive call
    Field(() => [EntityIdInput], { nullable: true })(
      RelationInputArgsType.prototype,
      'disconnect',
    );
  }
  return RelationInputArgsType;
};
