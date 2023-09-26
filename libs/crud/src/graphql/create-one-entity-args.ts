import { Type } from '@nestjs/common';
import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { upsertInput } from './upsert-input';
import { typesCache } from './types-cache';

export const createOneEntityArgs = <T>(classRef: Type<T>) => {
  const name = classRef.name + 'CreateOneEntityArgs';

  if (typesCache[name]) {
    return typesCache[name];
  }

  const InputDataType = upsertInput(classRef);
  @ArgsType()
  @InputType(name, { isAbstract: false })
  abstract class CreateOneEntityArgsType {
    @Field(() => InputDataType)
    data: any;
  }

  typesCache[name] = CreateOneEntityArgsType;
  return CreateOneEntityArgsType as any;
};
