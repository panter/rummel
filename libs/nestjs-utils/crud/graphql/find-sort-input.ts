import { Type } from '@nestjs/common';
import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { SortOrder } from './enums';
import { typesCache } from './types-cache';
import { CrudInfo, getCrudInfosForType, getTypeName } from './utils';
import { isArray } from 'lodash';

const getSortOrderDesignType = (p: CrudInfo) => {
  if (p.isVirtual) {
    return;
  }
  const designType = p.typeFn();
  if (
    (designType as any).name === 'String' ||
    (designType as any).name === 'ID' ||
    (designType as any).name === 'Number' ||
    (designType as any).name === 'Float' ||
    (designType as any).name === 'Date' ||
    (designType as any).name === 'Boolean' ||
    typeof designType !== 'function' //TODO workaround for enums
  ) {
    return SortOrder;
  } else {
    return findSortInput(isArray(designType) ? designType[0] : designType);
  }
};

export const findSortInput = <T>(classRef: Type<T>) => {
  try {
    const fields = getCrudInfosForType(classRef);
    const typeName = getTypeName(classRef);
    const name = typeName + 'OrderByInput';

    if (typesCache[name]) {
      return typesCache[name];
    }

    @ArgsType()
    @InputType(name, { isAbstract: false })
    class AbstractSortOrderInput {}

    typesCache[name] = AbstractSortOrderInput;
    fields.forEach((p) => {
      const filterDesignType = getSortOrderDesignType(p);
      if (filterDesignType) {
        Object.defineProperty(AbstractSortOrderInput.prototype, p.schemaName, {
          writable: true,
          configurable: true,
        });
        Field(() => filterDesignType, { nullable: true })(
          AbstractSortOrderInput.prototype,
          p.schemaName,
        );
      }
    });

    return AbstractSortOrderInput;
  } catch (error) {
    console.error(error);
    // TODO: error handling
  }
};
