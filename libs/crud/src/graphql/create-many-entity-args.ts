import { Type } from '@nestjs/common';
import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { upsertInput } from './upsert-input';
import { typesCache } from './types-cache';

export const createManyEntityArgs = <T>(classRef: Type<T>) => {
  const name = classRef.name + 'CreateManyEntityArgs';

  if (typesCache[name]) {
    return typesCache[name];
  }

  const InputDataType = upsertInput(classRef);
  @ArgsType()
  @InputType(name, { isAbstract: false })
  abstract class CreateManyEntityArgsType {
    @Field(() => [InputDataType])
    data: any;
  }

  typesCache[name] = CreateManyEntityArgsType;
  return CreateManyEntityArgsType as any;
};
