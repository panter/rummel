import { deepCompareObjects } from './deepCompare';
import {
  GenericPrismaInput,
  GenericPrismaOneConnect,
  InferPrismaModel,
  ManyReferenceMapper,
  ManyRelationMapper,
  Nullable,
  OneReferenceMapper,
  OneRelationMapper,
  PrismaInputSchema,
  PrismaInputSchemaProperty,
  PrismaManyObjectInput,
  PrismaManyReferenceInput,
  PrismaOneObjectInput,
  PrismaOneReferenceInput,
  PropertyMapper,
  SafeProperty,
} from './index';

const MAPPER_ORDER: { [key: string]: number } = {
  Property: 1,
  Relation: 2,
  Reference: 3,
  ManyRelation: 4,
  ManyReference: 5,
};

export function pickProperty<T, K extends keyof T>(
  obj: T | null | undefined,
  key: K,
): { [P in K]: T[P] } | undefined | null {
  if (!obj) {
    return obj;
  }
  return { [key]: obj[key] } as { [P in K]: T[P] };
}

export function pickPropertyFromArray<T, K extends keyof T>(
  arr: T[] | null | undefined,
  key: K,
): { [P in K]: T[P] }[] | undefined | null {
  if (arr === null || arr === undefined) {
    return arr;
  }

  return arr.map((item) => ({ [key]: item[key] }) as { [P in K]: T[P] });
}

// type StringTuple<T extends (string | number | symbol)[]> = [T[number], ...T];

export const ignoreProperty: any = () => ({
  pick: () => undefined,
  map: () => undefined,
  __typename: '',
});

type PropertyOptions = {
  set?: boolean;
};

export function property<Input, ModelSource>(
  pick: (a?: ModelSource | null) => Input | undefined,
  options?: PropertyOptions & { required?: false },
): PropertyMapper<Input | undefined | null, ModelSource, any>;

export function property<Input, ModelSource>(
  pick: (a?: ModelSource | null) => Input | undefined,
  options?: PropertyOptions & { required: true },
): PropertyMapper<Input | undefined, ModelSource, any>;

export function property<Input, ModelSource>(
  pick: (a?: ModelSource | null) => Input | undefined,
  options: PropertyOptions & { required?: boolean } = {},
): PropertyMapper<Input | undefined | null, ModelSource, any> {
  const { set = false } = options;

  return {
    pick,
    map: ({ value, oldValue, method }) => {
      if (value === oldValue) return;

      const mappedValue = value === null ? undefined : value;

      if (set && method === 'update') {
        return { set: mappedValue };
      }

      return mappedValue;
    },
    __typename: 'Property' as const,
  };
}

export function autoProperty<
  Input,
  ModelSource,
  Key extends keyof ModelSource,
>(options?: {
  set?: boolean;
}): PropertyMapper<
  Input,
  ModelSource,
  ModelSource[Key] extends Input ? Key : unknown
> {
  const { set = false } = options || {};

  return {
    map: ({ value, oldValue, method }) => {
      if (value === oldValue) return;

      const mappedValue = value === null ? undefined : value;

      if (set && method === 'update') {
        return { set: mappedValue };
      }

      return mappedValue;
    },
    __typename: 'Property' as const,
  };
}

const mapRelation = <Model, Create, Update, Connect>(p: {
  relationMappers: () => {
    create?: () => PrismaInputSchema<Create, Model> | undefined;
    update?: () => PrismaInputSchema<Update, Model> | undefined;
  };
  value?: Partial<Model> | undefined | null;
  oldValue?: Partial<Model> | undefined | null;
}) => {
  const { value, oldValue } = p;
  const { create, update } = p.relationMappers();
  if (value === oldValue) {
    return;
  }
  const inputData: PrismaOneObjectInput<Create, Update, Connect> | undefined =
    {};

  if (
    oldValue !== undefined &&
    oldValue !== null &&
    (value === undefined || value === null)
  ) {
    inputData.disconnect = true;
  } else if (oldValue !== undefined && oldValue != null && value) {
    const updateMapper = update?.();
    const updateInputData = updateMapper?.mapper?.({
      value: value === undefined ? null : value,
      oldValue,
      mapper: updateMapper,
    });
    if (updateInputData) {
      inputData.update = updateInputData;
    }
  } else if (value !== undefined && value !== null) {
    const createMapper = create?.();
    const createInputData = createMapper?.mapper?.({
      value: value === undefined ? null : value,
      oldValue,
      mapper: createMapper,
    });

    if (createInputData) {
      inputData.create = createInputData;
    }
  }
  if (Object.keys(inputData).length === 0) {
    return;
  }
  return inputData;
};

export const relation = <
  T extends { create?: any; update?: any; connect?: any },
  S,
  ModelSource = any,
  Create = SafeProperty<T, 'create'>,
  Update = SafeProperty<T, 'update'>,
  Connect = SafeProperty<T, 'connect'>,
>(
  pick: (m?: ModelSource | null) => S | undefined | null,
  p: () => {
    create?: () => PrismaInputSchema<Create, S> | undefined;
    update?: () => PrismaInputSchema<Update, S> | undefined;
  },
): OneRelationMapper<
  S | undefined | null,
  Create,
  Update,
  Connect,
  ModelSource,
  any
> => ({
  pick,
  map: ({ value, oldValue }) => {
    return mapRelation({
      relationMappers: p,
      value,
      oldValue,
    });
  },
  __typename: 'Relation' as const,
});

export const autoRelation = <
  T extends { create?: any; update?: any },
  S = T,
  Create = SafeProperty<T, 'create'>,
  Update = SafeProperty<T, 'update'>,
  Connect = SafeProperty<T, 'connect'>,
  ModelSource = any,
  Key = any,
>(
  p: () => {
    create?: () => PrismaInputSchema<Create, S> | undefined;
    update?: () => PrismaInputSchema<Update, S> | undefined;
  },
): OneRelationMapper<
  Partial<S> | undefined | null,
  Create,
  Update,
  Connect,
  ModelSource,
  Key extends keyof ModelSource
    ? ModelSource[Key] extends InferPrismaModel<Create> &
        InferPrismaModel<Update>
      ? Key
      : unknown
    : any
> => ({
  map: ({ value, oldValue }) => {
    return mapRelation({
      relationMappers: p,
      value,
      oldValue,
    });
  },
  __typename: 'Relation',
});

const mapManyRelation = <
  Model,
  Create,
  Update,
  UpdateWhere,
  Connect,
  Where,
>(p: {
  pickForUpdate?:
    | false
    | ((m: Model | null | undefined) => Where | null | undefined);
  relationMappers: () => {
    create?: () => PrismaInputSchema<Create, Model> | undefined;
    update?: () => PrismaInputSchema<Update, Model> | undefined;
  };
  value?: (Model | null | undefined)[] | null | undefined;
  oldValue?: (Model | null | undefined)[] | null | undefined;
}) => {
  const { value, oldValue, pickForUpdate } = p;
  const { create, update } = p.relationMappers();

  if (value === oldValue) {
    return;
  }

  if (deepCompareObjects(value, oldValue)) {
    return;
  }

  const inputData: PrismaManyObjectInput<
    Create,
    Update,
    UpdateWhere,
    Connect,
    any
  > = {};

  // disconnect
  if (pickForUpdate) {
    oldValue
      ?.filter((oldValueItem) => {
        return !value?.some((newValueItem) => {
          return deepCompareObjects(
            pickForUpdate(newValueItem) || false,
            pickForUpdate(oldValueItem),
          );
        });
      })
      .forEach((oldValueItem) => {
        inputData.disconnect = inputData.disconnect || [];
        // const disconnectInput = foreignKeys.reduce((acc, key) => {
        //   acc[key] = (oldValueItem as any)[key];
        //   return acc;
        // }, {} as any);
        const disconnectInput = pickForUpdate(oldValueItem);
        if (disconnectInput) inputData.disconnect.push(disconnectInput);
      });
  }

  // create & update
  value?.forEach((newValueItem) => {
    const oldValueItem = pickForUpdate
      ? oldValue?.find((oldValueItem) => {
          return deepCompareObjects(
            pickForUpdate(newValueItem) || false,
            pickForUpdate(oldValueItem),
          );
        })
      : undefined;

    if (
      // foreignKeys.length > 0 &&
      // foreignKeys.every((key) => {
      //   return (
      //     (newValueItem as any)[key] &&
      //     (newValueItem as any)[key] === (oldValueItem as any)[key]
      //   );
      // })
      pickForUpdate &&
      deepCompareObjects(
        pickForUpdate(newValueItem) || false,
        pickForUpdate(oldValueItem),
      )
    ) {
      const updateMapper = update?.();
      const updateInputData = updateMapper?.mapper?.({
        value: newValueItem,
        oldValue: oldValueItem,
        mapper: updateMapper,
      });
      if (updateInputData) {
        inputData.update = inputData.update || [];

        inputData.update.push({
          // where: foreignKeys.reduce((acc, key) => {
          //   acc[key] = (newValueItem as any)[key];
          //   return acc;
          // }, {} as any),
          where: pickForUpdate(newValueItem) as any,
          data: updateInputData,
        });
      }
      // } else if ((newValueItem as any)?.id && !oldValueItem) {
      //   inputData.connect = inputData.connect || [];
      //   if (foreignKeys.length) {
      //     inputData.connect.push(
      //       foreignKeys.reduce((acc, key) => {
      //         acc[key] = (newValueItem as any)[key];
      //         return acc;
      //       }, {} as any),
      //     );
      //   }
    } else {
      const createMapper = create?.();
      const createInputData = createMapper?.mapper?.({
        value: newValueItem,
        oldValue: oldValueItem,
        mapper: createMapper,
      });

      if (createInputData) {
        inputData.create = inputData.create || [];
        inputData.create.push(createInputData);
      }
    }
  });

  return inputData;
};

export const manyRelation = <
  T extends { create?: any[] | null; update?: any[] | null },
  S = T,
  SourceUpdate = T extends { update?: (infer U)[] | null } ? U : never,
  Create = T extends { create?: (infer C)[] | null } ? C : never,
  Update = 'data' extends keyof SourceUpdate ? SourceUpdate['data'] : never,
  Connect = T extends { connect?: any[] | null } ? T | undefined : undefined,
  // Where = 'where' extends keyof SourceUpdate ? SourceUpdate['where'] : false,
  // Disconnect = T extends { disconnect?: any[] | null }
  //   ? T | undefined
  //   : undefined,
  ModelSource = object,
>(
  p: () => {
    create?: () => PrismaInputSchema<Create, S> | undefined;
    update?: () => PrismaInputSchema<Update, S> | undefined;
  },
  pick: (m?: ModelSource | null) => Partial<S>[] | null | undefined,
  pickForUpdate: 'where' extends keyof SourceUpdate
    ? (m: S | undefined | null) => SourceUpdate['where'] | null | undefined
    : false,
): ManyRelationMapper<
  S,
  Create | undefined,
  Update | undefined,
  any,
  Connect | undefined,
  any, // Errros in disconnect will popup on runtime
  ModelSource,
  any
> => ({
  pick,
  map: ({ value, oldValue }) => {
    return mapManyRelation({
      pickForUpdate,
      relationMappers: p,
      value,
      oldValue,
    });
  },
  __typename: 'ManyRelation',
});

type SinglePropertyObject<K extends string | number | symbol, V> = {
  [P in K]: V;
};
export const autoManyRelation = <
  T extends { create?: any[] | null; update?: any[] | null },
  S = T,
  SourceUpdate = T extends { update?: (infer U)[] | null } ? U : never,
  Create = T extends { create?: (infer C)[] | null } ? C : never,
  Update = 'data' extends keyof SourceUpdate ? SourceUpdate['data'] : never,
  Connect = T extends { connect?: any[] | null } ? T | undefined : undefined,
  // ConnectData = T extends { connect?: (infer Data)[] | null }
  //   ? Data | undefined
  //   : undefined,
  // UpdateWhere = 'where' extends keyof SourceUpdate
  //   ? SourceUpdate['where']
  //   : undefined,
  // Disconnect = T extends { disconnect?: any[] | null }
  //   ? T | undefined
  //   : undefined,
  ModelSource = object,
  Key = any,
  ForeignKey extends keyof S = never,
>(
  p: () => {
    create?: () => PrismaInputSchema<Create, S> | undefined;
    update?: () => PrismaInputSchema<Update, S> | undefined;
  },
  options: { foreignKey: ForeignKey | false },
): ManyRelationMapper<
  S,
  Create | undefined,
  Update | undefined,
  SinglePropertyObject<ForeignKey, S[ForeignKey]> | undefined,
  Connect | undefined,
  any, // Errors in disconnect will popup on runtime
  ModelSource,
  Key extends keyof ModelSource
    ? ModelSource[Key] extends Partial<InferPrismaModel<Create>>[]
      ? ForeignKey extends keyof ModelSource[Key][number]
        ? Key
        : unknown
      : keyof ModelSource[Key]
    : unknown
> => ({
  // pick: omitTypename,
  map: ({ value, oldValue }) => {
    const { foreignKey } = options;
    return mapManyRelation({
      pickForUpdate: (m?: any) =>
        m?.[foreignKey]
          ? { [foreignKey as number]: m?.[foreignKey] }
          : undefined,
      relationMappers: p,
      value: omitTypenameFromArray(value) as any,
      oldValue: omitTypenameFromArray(oldValue) as any,
    });
  },
  __typename: 'ManyRelation',
});

type IsTypeAssignable<A, B> =
  NonNullable<A> extends NonNullable<B>
    ? keyof Omit<NonNullable<A>, '__typename'> extends keyof Omit<
        NonNullable<B>,
        '__typename'
      >
      ? true
      : false
    : false;

const mapReference = <Model, Connect>(p?: {
  value?: Model | null;
  oldValue?: Model | null;
}): PrismaOneReferenceInput<Connect> | undefined => {
  const { value, oldValue } = p || {};
  if (
    deepCompareObjects(value || false, oldValue)
    // foreignKeys.length > 0 &&
    // foreignKeys?.every((key) => {
    //   return (value as any)?.[key] === (oldValue as any)?.[key];
    // })
  ) {
    return;
  }

  const inputData: PrismaOneReferenceInput<Connect> | undefined = {};
  if (
    oldValue !== undefined &&
    oldValue !== null &&
    (value === undefined || value === null)
  ) {
    inputData.disconnect = true;
  } else if (
    // foreignKeys.length > 0 &&
    // foreignKeys?.every((key) => {
    //   return (value as any)?.[key];
    // })
    value &&
    Object.keys(value).length > 0
  ) {
    // connect by foreign key
    inputData.connect = value as any;
    // inputData.connect = foreignKeys.reduce((acc, key) => {
    //   acc[key] = (value as any)?.[key];
    //   return acc;
    // }, {} as any);
  }

  if (Object.keys(inputData).length === 0) {
    return;
  }
  return inputData;
};

// Define a utility type that removes the __typename property recursively
type DeepOmitTypename<T> = T extends object
  ? {
      [K in keyof T as Exclude<K, '__typename'>]: DeepOmitTypename<T[K]>;
    }
  : T;

// Function to deeply omit __typename from an object or array
const omitTypename = <T>(value: T): DeepOmitTypename<T> => {
  if (value === null || value === undefined) {
    return value as DeepOmitTypename<T>;
  }
  if (typeof value !== 'object') {
    return value as DeepOmitTypename<T>;
  }
  if (Array.isArray(value)) {
    return value.map((v) => omitTypename(v)) as DeepOmitTypename<T>;
  }
  const result: Record<string, unknown> = {};
  for (const key in value) {
    if (key === '__typename') {
      continue;
    }
    result[key] = omitTypename(value[key as keyof typeof value]);
  }
  return result as DeepOmitTypename<T>;
};

const omitTypenameFromArray = <T>(
  value: T[] | null | undefined,
): DeepOmitTypename<T>[] | null | undefined => {
  if (value === null || value === undefined) {
    return value as DeepOmitTypename<T>[] | null | undefined;
  }
  const arr = value.map((v) => omitTypename(v));
  return arr;
};

export const autoReference = <
  Input extends GenericPrismaOneConnect,
  ModelSource,
  Key,
>(): OneReferenceMapper<
  Input,
  Input['connect'],
  Input['connect'],
  ModelSource,
  Key extends keyof ModelSource
    ? IsTypeAssignable<ModelSource[Key], Input['connect']> extends true
      ? Key
      : unknown
    : unknown,
  Key extends keyof ModelSource
    ? null extends ModelSource[Key]
      ? false
      : true
    : never
> => ({
  map: ({ value, oldValue }) =>
    mapReference({
      value: omitTypename(value),
      oldValue: omitTypename(oldValue),
    }),
  __typename: 'Reference',
});

export const reference = <
  Input extends GenericPrismaOneConnect,
  ModelSource,
  Required extends boolean = false,
>(
  resolveValue: (value?: Partial<ModelSource> | null) => Input['connect'],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  options?: {
    required?: Required;
  },
): OneReferenceMapper<
  Input,
  Input['connect'],
  Input['connect'],
  ModelSource,
  any,
  Required
> => ({
  pick: resolveValue,
  map: (p) => mapReference(p),
  __typename: 'Reference',
});

type IsArrayTypeAssignable<A, B> = A extends any[]
  ? B extends any[]
    ? A[number] extends B[number]
      ? keyof A[number] extends keyof B[number]
        ? true
        : false
      : false
    : true
  : false;

const mapManyReference = <T, Connect>(p: {
  value: Connect[] | null | undefined;
  oldValue: Connect[] | null | undefined;
}) => {
  const { value, oldValue } = p;
  if (value === oldValue) {
    return;
  }

  if (deepCompareObjects(value, oldValue)) {
    return;
  }

  const inputData:
    | PrismaManyReferenceInput<
        T extends {
          connect?: (infer C)[] | undefined;
        }
          ? C | undefined
          : never
      >
    | undefined = {};

  // disconnect
  oldValue?.forEach((oldValueItem) => {
    if (
      !value?.some((newValueItem) =>
        deepCompareObjects(newValueItem, oldValueItem),
      )
    ) {
      inputData.disconnect = inputData.disconnect || [];
      inputData.disconnect.push(oldValueItem as any);
    }
  });

  // connect
  value?.forEach((newValueItem) => {
    const ids = newValueItem;

    // !(newValueItem as any).id
    if (!ids || !someKeysHaveValues(ids)) {
      console.warn(
        'ManyReference: id is missing, ignore the connect',
        newValueItem,
      );
    } else {
      // connect if not in oldValue
      if (
        !oldValue?.some(
          (oldValueItem) => deepCompareObjects(newValueItem, oldValueItem),
          // (newValueItem as any).id === (oldValueItem as any).id,
        )
      ) {
        inputData.connect = inputData.connect || [];
        // inputData.connect.push({ id: (newValueItem as any).id } as any); // CRO: weird typing
        inputData.connect.push(
          newValueItem as any,
          // foreignKeys.reduce((acc, key) => {
          //   acc[key] = (newValueItem as any)[key];
          //   return acc;
          // }, {} as any),
        );
      }
    }
  });

  if (Object.keys(inputData).length === 0) {
    return;
  }

  return inputData;
};

export const autoManyReference = <
  T extends GenericPrismaOneConnect,
  S,
  ModelSource,
  Key,
>(
  resolveValue?: (value?: ModelSource | null) => S[] | null | undefined,
): ManyReferenceMapper<
  T,
  T['connect'] | undefined | null,
  any,
  ModelSource,
  Key extends keyof ModelSource
    ? IsArrayTypeAssignable<
        NonNullable<ModelSource[Key]>,
        T['connect']
      > extends true
      ? Key
      : unknown
    : unknown,
  Key extends keyof ModelSource
    ? ModelSource[Key] extends any[]
      ? ModelSource[Key] extends null
        ? false
        : true
      : false
    : never
> => ({
  pick: resolveValue,
  map: ({ value, oldValue }) => {
    return mapManyReference({
      value: omitTypenameFromArray(value),
      oldValue: omitTypenameFromArray(oldValue),
    });
  },
  __typename: 'ManyReference',
});

export const manyReference = <
  T extends GenericPrismaOneConnect,
  S,
  ModelSource,
  Required extends boolean = false,
>(
  resolveValue: (value?: ModelSource | null) => S[] | null | undefined,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  options?: {
    required?: Required;
  },
): ManyReferenceMapper<
  T,
  Nullable<Partial<S>>[] | undefined | null,
  any,
  ModelSource,
  any,
  Required extends true ? true : false
> => {
  return {
    pick: resolveValue,
    map: ({ value, oldValue }) => {
      return mapManyReference({ value, oldValue });
    },
    __typename: 'ManyReference',
  };
};

export const object =
  <Input extends GenericPrismaInput, Model>() =>
  (props: {
    value?: Model | null;
    oldValue?: Model | null;
    mapper: PrismaInputSchema<Input, Model>;
  }): Input | undefined => {
    // if (props.mapper.mapper) {
    //   return props.mapper.mapper(props);
    // }

    const source = props.value;
    const oldSource = props.oldValue;
    if (source === oldSource) {
      return;
    }

    const inputData: Record<string, any> = {};
    if (source) {
      Object.keys(props.mapper.properties)
        .sort((a, b) => {
          // sort by mapper type so that relations are before references
          const aPropMapper: PrismaInputSchemaProperty = (
            props.mapper.properties as any
          )[a as keyof Input];

          const bPropMapper: PrismaInputSchemaProperty = (
            props.mapper.properties as any
          )[b as keyof Input];

          return (
            (MAPPER_ORDER[aPropMapper.__typename] || 0) -
            (MAPPER_ORDER[bPropMapper.__typename] || 0)
          );
        })
        .forEach((key) => {
          const propMapper: PrismaInputSchemaProperty = (
            props.mapper.properties as any
          )[key as keyof Input];
          const value = propMapper.pick
            ? propMapper.pick(source)
            : (source[key as keyof Model] as any);
          const oldValue = propMapper.pick
            ? propMapper.pick(oldSource)
            : (oldSource?.[key as keyof Model] as any);

          if (propMapper.__typename === 'Property') {
            const method = oldSource ? 'update' : 'create';
            const mappedValue = propMapper.map?.({
              value,
              oldValue,
              method,
            });
            if (mappedValue !== undefined) {
              inputData[key] = mappedValue;
            }
          } else if (propMapper.__typename === 'Reference') {
            const relationPropKey = key.endsWith('Id') ? key.slice(0, -2) : key;
            // const relationPropKey = key;
            if (inputData[relationPropKey]) {
              console.warn(
                `prima-input mapper: ${relationPropKey} relation already set, skipping reference updates`,
                key,
              );
              return;
            }
            const referenceInput = propMapper.map?.({ value, oldValue });

            // assertDisconnectConflict(
            //   inputData[relationPropKey],
            //   referenceInput,
            //   relationPropKey,
            // );
            if (referenceInput) {
              inputData[relationPropKey] = referenceInput;
            }
          } else if (propMapper.__typename === 'ManyReference') {
            const relationPropKey = key.endsWith('Ids')
              ? key.slice(0, -3)
              : key;

            if (inputData[relationPropKey]) {
              console.warn(
                `prima-input mapper: ${relationPropKey} relation already set, skipping reference updates`,
                key,
              );
              return;
            }
            const manyReferenceInput = propMapper.map?.({ value, oldValue });

            // assertDisconnectConflict(
            //   inputData[relationPropKey],
            //   manyReferenceInput,
            //   relationPropKey,
            // );
            if (manyReferenceInput) {
              inputData[relationPropKey] = manyReferenceInput;
            }
          } else if (propMapper.__typename === 'Relation') {
            const relationInput = propMapper.map?.({ value, oldValue });

            // assertDisconnectConflict(inputData[key], relationInput, key);
            if (relationInput) {
              inputData[key] = relationInput;
            } else {
              // TODO: read above
              // this is part of the "*Id|s" feature, we try to connect the relation by the id
              // in case the mapper does not a mapper for the "*Id|s" field
              // this is a bit hacky, and should be removed in the future
              const refValue = source[`${key}Id` as keyof Model] as any;
              const oldRefValue = oldSource?.[`${key}Id` as keyof Model] as any;
              const referenceInput = propMapper.map?.({
                value: refValue,
                oldValue: oldRefValue,
              });

              if (referenceInput) {
                inputData[key] = referenceInput;
              }
            }
          } else if (propMapper.__typename === 'ManyRelation') {
            const manyRelationInput = propMapper.map?.({ value, oldValue });

            // assertDisconnectConflict(inputData[key], manyRelationInput, key);
            if (manyRelationInput) {
              inputData[key] = manyRelationInput;
            }
          }
        });
    }
    if (Object.keys(inputData).length === 0) {
      return;
    }

    return inputData as Input;
  };

// export function prismaInputSchema<T, M>(
//   schema: PrismaInputSchema<PrismaInput<T>, M>,
// ): PrismaInputSchema<PrismaInput<T>, M> {
//   return schema;
// }

export const mapFromPrismaSchema = <T, M>({
  schema,
  value,
  oldValue,
}: {
  schema: PrismaInputSchema<T, M>;
  value?: Partial<M> | null | undefined;
  oldValue?: Partial<M> | null | undefined;
}) => schema.mapper({ value, oldValue, mapper: schema });

function someKeysHaveValues(obj: any) {
  for (const key in obj) {
    if (obj[key]) {
      return true;
    }
  }
  return false;
}
