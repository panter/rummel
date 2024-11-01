import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { CrudEntityType } from './crud-types';
import { ConnectRelationInput, EntityIdInput } from './generic-types';
import { typesCache } from './types-cache';
import { updateManyEntityInput } from './update-many-entity-input';
import { upsertInput } from './upsert-input';
import { getTypeName } from './utils';
import { operationsName } from './update-one-relation-input';

// CRO TODO: hideReference, hideDisconnect
export const manyRelationInput = <T, NA extends string>(
  classRef: CrudEntityType<T, NA>,
  isUpdate: boolean,
  options: {
    parentRef: CrudEntityType;
    hideConnect?: boolean;
    hideCreate?: boolean;
    hideUpdate?: boolean;
    hideDisconnect?: boolean;
    parentProperty?: string;
  },
) => {
  const operations = operationsName({
    ...options,
    hideUpdate: isUpdate ? options.hideUpdate : true,
  });

  if (operations === '') {
    return undefined;
  }

  const typeName = getTypeName(classRef);
  const withoutTypeName = options.parentRef
    ? `Without${getTypeName(options.parentRef)}`
    : '';

  const type = isUpdate ? 'Update' : 'Create';
  const name = `${typeName}${operations}Many${withoutTypeName}${type}Input`;

  if (typesCache[name]) {
    return typesCache[name];
  }

  @ArgsType()
  @InputType(name, { isAbstract: false })
  class RelationInputArgsType {
    connect?: ConnectRelationInput[];

    disconnect?: EntityIdInput[];

    create?: any;

    update?: any;
  }

  typesCache[name] = RelationInputArgsType;

  if (!options.hideConnect) {
    Field(() => [ConnectRelationInput], { nullable: true })(
      RelationInputArgsType.prototype,
      'connect',
    );
  }

  if (!options.hideCreate) {
    // call createInput after adding to cache because of recursive call
    const CreateInputType = upsertInput(classRef, {
      ignoreType: options.parentRef,
    });
    Field(() => [CreateInputType], { nullable: true })(
      RelationInputArgsType.prototype,
      'create',
    );
  }

  if (isUpdate && !options.hideUpdate) {
    // call createInput after adding to cache because of recursive call
    const UpdateInputType = updateManyEntityInput(classRef, {
      ignoreType: options.parentRef,
    });
    Field(() => [UpdateInputType], { nullable: true })(
      RelationInputArgsType.prototype,
      'update',
    );
  }

  if (!options.hideDisconnect) {
    // call createInput after adding to cache because of recursive call
    Field(() => [EntityIdInput], { nullable: true })(
      RelationInputArgsType.prototype,
      'disconnect',
    );
  }
  return RelationInputArgsType;
};
