import { Type } from '@nestjs/common';
import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { upsertInput } from './upsert-input';
import { typesCache } from './types-cache';
import { whereInput } from './find-where-input';

export const updateManyEntityArgs = <T>(classRef: Type<T>) => {
  const name = classRef.name + 'UpdateManyEntityArgs';

  if (typesCache[name]) {
    return typesCache[name];
  }

  const InputDataType = upsertInput(classRef, { isUpdate: true });
  @ArgsType()
  @InputType(name, { isAbstract: false })
  abstract class UpdateManyEntityArgsType {
    @Field(() => InputDataType)
    data: any;

    where: any;
  }

  typesCache[name] = UpdateManyEntityArgsType;

  const WhereInputType = whereInput(classRef);
  Field(() => WhereInputType, { nullable: true })(
    UpdateManyEntityArgsType.prototype,
    'where',
  );

  return UpdateManyEntityArgsType as any;
};
