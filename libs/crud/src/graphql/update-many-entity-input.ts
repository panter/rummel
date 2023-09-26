import { Type } from '@nestjs/common';
import { Field, InputType } from '@nestjs/graphql';
import { EntityIdInput } from './generic-types';
import { typesCache } from './types-cache';
import { upsertInput } from './upsert-input';
import { getTypeName } from './utils';

export const updateManyEntityInput = <T>(
  classRef: Type<T>,
  options?: { ignoreType?: Type<any> },
) => {
  const withoutTypeName = options?.ignoreType
    ? `Without${getTypeName(options?.ignoreType)}`
    : '';
  const typeName = getTypeName(classRef);
  const name = `${typeName}UpdateWithWhereUnique${withoutTypeName}Input`;

  if (typesCache[name]) {
    return typesCache[name];
  }

  @InputType(name, { isAbstract: false })
  abstract class UpdateManyEntityArgsType {
    data: any;

    @Field(() => EntityIdInput)
    where: any;
  }

  typesCache[name] = UpdateManyEntityArgsType;

  const InputDataType = upsertInput(classRef, { isUpdate: true });
  Field(() => InputDataType, { nullable: true })(
    UpdateManyEntityArgsType.prototype,
    'data',
  );

  return UpdateManyEntityArgsType as any;
};
