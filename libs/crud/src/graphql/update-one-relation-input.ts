import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { CrudEntityType } from './crud-types';
import { ConnectRelationInput } from './generic-types';
import { typesCache } from './types-cache';
import { upsertInput } from './upsert-input';
import { getTypeName } from './utils';

export const operationsName = (options?: {
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
    return 'Crud';
  }
  if (!options?.hideConnect) {
    name += 'Co';
  }
  if (!options?.hideCreate) {
    name += 'Cr';
  }
  if (!options?.hideUpdate) {
    name += 'Up';
  }
  if (!options?.hideDisconnect) {
    name += 'Di';
  }

  return name;
};

export const updateOneRelationInput = <T, NA extends string>(
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

  const name = `${typeName}${operations}One${withoutTypeName}${type}Input`;

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

  if (!options.hideConnect) {
    Field(() => ConnectRelationInput, { nullable: true })(
      RelationInputArgsType.prototype,
      'connect',
    );
  }

  if (!options.hideDisconnect) {
    Field(() => Boolean, { nullable: true })(
      RelationInputArgsType.prototype,
      'disconnect',
    );
  }

  if (!options.hideCreate) {
    // call upsertInput after adding to cache because of recursive call
    const CreateInputType: any = upsertInput(classRef, {
      ignoreType: options.parentRef,
    });
    Field(() => CreateInputType, { nullable: true })(
      RelationInputArgsType.prototype,
      'create',
    );
  }

  if (isUpdate && !options.hideUpdate) {
    // call upsertInput after adding to cache because of recursive call
    const UpdateInputType: any = upsertInput(classRef, {
      ignoreType: options.parentRef,
      isUpdate: true,
    });
    Field(() => UpdateInputType, { nullable: true })(
      RelationInputArgsType.prototype,
      'update',
    );
  }

  return RelationInputArgsType;
};
