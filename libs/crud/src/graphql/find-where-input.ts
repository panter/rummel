import { Type } from '@nestjs/common';
import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { isArray } from 'lodash';
import { findOneRelationFilter } from './find-one-relation-filter';
import {
  BoolFilter,
  DateTimeFilter,
  IntFilter,
  StringFilter,
  enumFilter,
} from './gql-filter-types';
import { typesCache } from './types-cache';
import { CrudInfo, getCrudInfosForType, getTypeName } from './utils';
import { CrudGqlType } from '../';
import { CrudEntityType } from './crud-types';

const getFilterDesignType = (p: CrudInfo) => {
  if (
    p.crudOptions?.hideWhere ||
    (!p.crudOptions?.whereResolver && p.isVirtual)
  ) {
    return;
  }

  const designType = p.typeFn();

  if (
    (designType as any).name === 'String' ||
    (designType as any).name === 'ID'
  ) {
    return StringFilter;
  } else if ((designType as any).name === 'Boolean') {
    return BoolFilter;
  } else if (
    (designType as any).name === 'Int' ||
    (designType as any).name === 'BigInt' ||
    (designType as any).name === 'Number' ||
    (designType as any).name === 'Float'
  ) {
    return IntFilter;
  } else if (
    (designType as any).name === 'Date' ||
    (designType as any).name === 'DateTime'
  ) {
    return DateTimeFilter;
  } else if (p.options.isArray) {
    return whereInput(designType as CrudEntityType);
  } else if (typeof designType !== 'function') {
    return enumFilter(designType); // TODO workaround for enums
  } else {
    if (isArray(designType)) {
      return whereInput(designType as any);
    }
    return findOneRelationFilter(designType as any);
  }
};

export const whereInput = <T, _N extends string, NA extends string>(
  classRef: CrudEntityType<T, NA>,
  pentityType?: Type<T>,
): Type<CrudGqlType<`${NA}WhereInput`>> => {
  const entityType = pentityType || classRef;
  try {
    const fields = getCrudInfosForType(entityType);
    const typeName = getTypeName(classRef);
    const name = typeName + 'WhereInput';

    if (typesCache[name]) {
      return typesCache[name];
    }

    @ArgsType()
    @InputType(name, { isAbstract: false })
    class WhereInput {
      @Field(() => [WhereInput], { nullable: true })
      AND?: WhereInput[] | null;

      @Field(() => [WhereInput], { nullable: true })
      OR?: WhereInput[] | null;

      @Field(() => [WhereInput], { nullable: true })
      NOT?: WhereInput[] | null;
    }

    typesCache[name] = WhereInput;

    fields.forEach((p) => {
      const filterDesignType = getFilterDesignType(p);

      if (filterDesignType) {
        Object.defineProperty(WhereInput.prototype, p.schemaName, {
          writable: true,
          configurable: true,
        });
        Field(() => filterDesignType, { nullable: true })(
          WhereInput.prototype,
          p.schemaName,
        );
      }
    });

    return WhereInput;
  } catch (error) {
    console.error('Error in whereInput', error);
    throw error;
  }
};
