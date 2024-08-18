import { Type } from '@nestjs/common';
import { Field, Float, InputType, TypeMetadataStorage } from '@nestjs/graphql';
import { isArray, uniqBy } from 'lodash';
import { manyRelationInput } from './many-relation-input';
import { typesCache } from './types-cache';
import { updateOneRelationInput } from './update-one-relation-input';
import { CrudInfo, getCrudInfosForType, getTypeName } from './utils';
import { GraphQLJSON } from 'graphql-scalars';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

@InputType()
class StringInput {
  @Field(() => String, { nullable: true })
  set: any;
}

@InputType()
class StringArrayInput {
  @Field(() => [String], { nullable: true })
  set: any;
}

@InputType()
class NumberInput {
  @Field(() => Float, { nullable: true })
  set: any;
}

@InputType()
class DateInput {
  @Field(() => Date, { nullable: true })
  set: any;
}

@InputType()
class BooleanInput {
  @Field(() => Boolean, { nullable: true })
  set: any;
}

@InputType()
class JSONInput {
  @Field(() => GraphQLJSON, { nullable: true })
  set: any;
}

export const enumInput = (e: any) => {
  const enumMetaData = TypeMetadataStorage.getEnumsMetadata().find(
    (enumMetadata) => enumMetadata.ref === e,
  );

  if (!enumMetaData) {
    return null;
  }

  const name = `${enumMetaData.name}EnumInput`;

  const cached = typesCache[name];
  if (cached) {
    return cached;
  }

  @InputType(name)
  class EnumInput {
    @Field(() => e, { nullable: true })
    set: any;
  }
  typesCache[name] = EnumInput;
  return EnumInput;
};

const getCreateDesignType = (p: CrudInfo, parentRef: Type<any>) => {
  if (p.isVirtual && !p.crudOptions?.inputResolver) {
    return;
  }
  const designType = p.typeFn();
  if (p.options.isArray) {
    const manyDesignType = isArray(designType) ? designType[0] : designType;
    if (manyDesignType === String) {
      return [String];
    }
    return manyRelationInput(manyDesignType as Type, {
      parentRef,
      hideCreate: !p.crudOptions?.relation?.showCreate,
      hideUpdate: !p.crudOptions?.relation?.showUpdate,
      parentProperty: p.name,
    });
  } else if ((designType as any).name === 'String') {
    return String;
  } else if ((designType as any).name === 'Boolean') {
    return Boolean;
  } else if ((designType as any).name === 'ID') {
    return;
  } else if (
    (designType as any).name === 'Int' ||
    (designType as any).name === 'BigInt' ||
    (designType as any).name === 'Number' ||
    (designType as any).name === 'Float'
  ) {
    return Number;
  } else if ((designType as any).name === 'Date') {
    return Date;
  } else if ((designType as any).name === 'Upload') {
    return GraphQLUpload;
  } else if ((designType as any).name === 'JSON') {
    return GraphQLJSON;
  } else if (typeof designType !== 'function') {
    // return String; // TODO workaround for enums
    return designType;
  } else {
    return updateOneRelationInput(designType as Type, {
      parentRef,
      hideUpdate: !p.crudOptions?.relation?.showUpdate,
      hideDisconnect: true,
      hideCreate: !p.crudOptions?.relation?.showCreate,
      parentProperty: p.name,
    });
  }
};

const getUpdateDesignType = (p: CrudInfo, parentRef: Type<any>) => {
  if (p.isVirtual && !p.crudOptions?.inputResolver) {
    return;
  }
  const designType = p.typeFn();
  if (p.options.isArray) {
    const manyDesignType = isArray(designType) ? designType[0] : designType;
    if (manyDesignType === String) {
      return StringArrayInput;
    }

    return manyRelationInput(manyDesignType as Type, {
      parentRef,
      hideCreate: !p.crudOptions?.relation?.showCreate,
      hideUpdate: !p.crudOptions?.relation?.showUpdate,
      parentProperty: p.name,
    });
  } else if ((designType as any).name === 'String') {
    return StringInput;
  } else if ((designType as any).name === 'Boolean') {
    return BooleanInput;
  } else if ((designType as any).name === 'ID') {
    return;
  } else if (
    (designType as any).name === 'Int' ||
    (designType as any).name === 'Number' ||
    (designType as any).name === 'BigInt' ||
    (designType as any).name === 'Float'
  ) {
    return NumberInput;
  } else if ((designType as any).name === 'Date') {
    return DateInput;
  } else if ((designType as any).name === 'Upload') {
    return GraphQLUpload;
  } else if ((designType as any).name === 'JSON') {
    return JSONInput;
  } else if (typeof designType !== 'function') {
    return enumInput(designType);
  } else {
    if (isArray(designType)) {
      return manyRelationInput(designType[0] as Type, {
        parentRef,
        hideCreate: !p.crudOptions?.relation?.showCreate,
        hideUpdate: !p.crudOptions?.relation?.showUpdate,
        parentProperty: p.name,
      });
    } else {
      return updateOneRelationInput(designType as Type, {
        parentRef,
        hideCreate: !p.crudOptions?.relation?.showCreate,
        hideUpdate: !p.crudOptions?.relation?.showUpdate,
        hideConnect: p.crudOptions?.relation?.hideConnect,
        hideDisconnect: p.crudOptions?.relation?.hideDisconnect,
        parentProperty: p.name,
      });
    }
  }
};

export const upsertInput = <T>(
  classRef: Type<T>,
  options?: { ignoreType?: Type<any>; isUpdate?: boolean },
) => {
  try {
    const fields = getCrudInfosForType(classRef);
    const uniqueFields = uniqBy(fields, (f) => f.name);
    const withoutTypeName = options?.ignoreType
      ? `Without${getTypeName(options?.ignoreType)}`
      : '';
    const typeName = getTypeName(classRef);
    const name = `${typeName}${
      options?.isUpdate ? 'Update' : 'Create'
    }${withoutTypeName}Input`;

    if (typesCache[name]) {
      return typesCache[name];
    }

    abstract class A {}

    typesCache[name] = A;
    uniqueFields.forEach((crudInfo) => {
      if (
        options?.ignoreType === crudInfo.typeFn() ||
        (!options?.isUpdate && crudInfo.crudOptions?.hideCreate) ||
        (options?.isUpdate && crudInfo.crudOptions?.hideUpdate)
      ) {
        return;
      }
      const filterDesignType = options?.isUpdate
        ? getUpdateDesignType(crudInfo, classRef)
        : getCreateDesignType(crudInfo, classRef);

      if (filterDesignType) {
        Object.defineProperty(A.prototype, crudInfo.schemaName, {
          writable: true,
          configurable: true,
        });
        Field(() => filterDesignType, {
          ...crudInfo.options,
          nullable: true,
          isArray: false,
        } as any)(A.prototype, crudInfo.schemaName);
      }
    });

    InputType(name, { isAbstract: false })(A);

    return A;
  } catch (error) {
    // TODO: error handling
    console.log(error);
  }
};
