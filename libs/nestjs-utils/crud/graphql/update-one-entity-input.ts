import { Type } from '@nestjs/common';
import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { EntityIdInput } from './generic-types';
import { typesCache } from './types-cache';
import { upsertInput } from './upsert-input';

export const updateOneEntityArgs = <T>(classRef: Type<T>) => {
  const name = classRef.name + 'UpdateOneEntityArgs';
  if (typesCache[name]) {
    return typesCache[name];
  }

  const InputDataType = upsertInput(classRef, { isUpdate: true });
  @InputType(name, { isAbstract: false })
  @ArgsType()
  class UpdateOneEntityArgsType {
    @Field(() => InputDataType)
    data: any;
    @Field(() => EntityIdInput)
    where: any;
  }

  typesCache[name] = UpdateOneEntityArgsType;

  return UpdateOneEntityArgsType as any;
};
