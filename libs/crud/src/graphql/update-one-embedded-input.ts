import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { uniqBy } from 'lodash';
import { CrudEntityType } from './crud-types';
import { typesCache } from './types-cache';
import { getCrudInfosForType, getTypeName } from './utils';
import { getCreateDesignType, getUpdateDesignType } from './upsert-input';

export const updateOneEmbeddedInput = <T, NA extends string>(
  classRef: CrudEntityType<T, NA>,
  options?: {
    isUpdate: boolean;
    parentRef: CrudEntityType;
  },
) => {
  const typeName = getTypeName(classRef);

  const name = `${typeName}EmbeddedInput`;

  if (typesCache[name]) {
    return typesCache[name];
  }

  @ArgsType()
  @InputType(name, { isAbstract: false })
  class EmbeddableInputArgsType {}

  typesCache[name] = EmbeddableInputArgsType;

  const fields = getCrudInfosForType(classRef);
  const uniqueFields = uniqBy(fields, (f) => f.name);
  uniqueFields.map((crudInfo) => {
    const filterDesignType = options?.isUpdate
      ? getUpdateDesignType(crudInfo, classRef)
      : getCreateDesignType(crudInfo, classRef);

    Object.defineProperty(
      EmbeddableInputArgsType.prototype,
      crudInfo.schemaName,
      {
        writable: true,
        configurable: true,
      },
    );
    Field(() => filterDesignType, {
      ...crudInfo.options,
      nullable: true,
      isArray: false,
    } as any)(EmbeddableInputArgsType.prototype, crudInfo.schemaName);
  });
  return EmbeddableInputArgsType;
};
