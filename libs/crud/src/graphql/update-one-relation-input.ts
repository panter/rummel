import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { CrudEntityType } from './crud-types';
import { ConnectRelationInput } from './generic-types';
import { typesCache } from './types-cache';
import { upsertInput } from './upsert-input';
import { getTypeName } from './utils';

const operationsName = (options?: {
  hideConnect?: boolean;
  hideCreate?: boolean;
  hideUpdate?: boolean;
  hideDisconnect?: boolean;
}) => {
  let name = '';
  if (
    !options?.hideConnect &&
    !options?.hideCreate &&
    !options?.hideUpdate &&
    !options?.hideDisconnect
  ) {
    return name;
  } else if (!options?.hideConnect) {
    name += 'Connect';
  } else if (!options?.hideCreate) {
    name += 'Create';
  } else if (!options?.hideUpdate) {
    name += 'Update';
  } else if (!options?.hideDisconnect) {
    name += 'Disconnect';
  }

  return name;
};
export const updateOneRelationInput = <T, NA extends string>(
  classRef: CrudEntityType<T, NA>,
  options?: {
    parentRef: CrudEntityType;
    hideConnect?: boolean;
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

  const name = `${typeName}${operationsName(
    options,
  )}NestedOne${withoutTypeName}Input`;

  if (typesCache[name]) {
    return typesCache[name];
  }

  @ArgsType()
  @InputType(name, { isAbstract: false })
  class RelationInputArgsType {
    connect?: ConnectRelationInput;

    disconnect?: boolean;

    create: any;

    update: any;
  }

  typesCache[name] = RelationInputArgsType;

  if (!options?.hideConnect) {
    Field(() => ConnectRelationInput, { nullable: true })(
      RelationInputArgsType.prototype,
      'connect',
    );
  }

  if (!options?.hideDisconnect) {
    Field(() => Boolean, { nullable: true })(
      RelationInputArgsType.prototype,
      'disconnect',
    );
  }

  if (!options?.hideCreate) {
    // call upsertInput after adding to cache because of recursive call
    const CreateInputType: any = upsertInput(classRef, {
      ignoreType: options?.parentRef,
    });
    Field(() => CreateInputType, { nullable: true })(
      RelationInputArgsType.prototype,
      'create',
    );
  }

  if (!options?.hideUpdate) {
    // call upsertInput after adding to cache because of recursive call
    const UpdateInputType: any = upsertInput(classRef, {
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
