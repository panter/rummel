import { deepCompareObjects } from './deepCompare';
import {
  GenericPrismaInput,
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
} from './index';

const MAPPER_ORDER: { [key: string]: number } = {
  Property: 1,
  Relation: 2,
  Reference: 3,
  ManyRelation: 4,
  ManyReference: 5,
};

// type StringTuple<T extends (string | number | symbol)[]> = [T[number], ...T];

export const setPropertyMapper = <T, M extends 'create' | 'update'>(
  method: M,
  value: T,
):
  | T
  | {
      set?: T;
    } => {
  const result = method === 'create' ? value : { set: value };
  return result;
};

export function property<T, S>(
  pick: (a?: S | null) => T,
  forceMethod?: 'create' | 'update',
): PropertyMapper<T | null | undefined, S, any> {
  return {
    pick,
    map: ({ value, oldValue, method }) => {
      if (value !== oldValue) {
        return setPropertyMapper(
          forceMethod || method,
          value === null ? undefined : value,
        );
      }
    },
    __typename: 'Property',
  };
}

export function autoProperty<T, S, K>(
  forceMethod?: 'create' | 'update',
): PropertyMapper<
  T | null | undefined,
  S,
  K extends keyof S ? (T extends S[K] ? K : unknown) : any
> {
  return {
    map: ({ value, oldValue, method }) => {
      if (value !== oldValue) {
        return setPropertyMapper(
          forceMethod || method,
          value === null ? undefined : value,
        );
      }
    },
    __typename: 'Property',
  };
}

const mapRelation = <Model, Create, Update, Connect>(p: {
  relationMappers: () => {
    create?: () =>
      | PrismaInputSchema<Create, Nullable<Partial<Model>>>
      | undefined;
    update?: () =>
      | PrismaInputSchema<Update, Nullable<Partial<Model>>>
      | undefined;
  };
  value?: Nullable<Partial<Model>> | undefined | null;
  oldValue?: Nullable<Partial<Model>> | undefined | null;
}) => {
  const { value, oldValue } = p;
  const { create, update } = p.relationMappers();
  if (value === oldValue) {
    return;
  }
  const inputData:
    | PrismaOneObjectInput<
        Create | undefined,
        Update | undefined,
        Connect | undefined
      >
    | undefined = {};

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
  T extends { create?: any; update?: any },
  S = T,
  Create = 'create' extends keyof T
    ? T['create'] extends unknown
      ? undefined
      : T['create']
    : undefined,
  Update = 'update' extends keyof T
    ? T['update'] extends unknown
      ? undefined
      : T['update']
    : undefined,
  Connect = 'connect' extends keyof T
    ? T['connect'] extends unknown
      ? undefined
      : T['connect']
    : undefined,
  ModelSource = any,
>(
  pick: (m?: ModelSource | null) => Nullable<Partial<S>> | null | undefined,
  p: () => {
    create?: () => PrismaInputSchema<Create, Nullable<Partial<S>>> | undefined;
    update?: () => PrismaInputSchema<Update, Nullable<Partial<S>>> | undefined;
  },
): OneRelationMapper<
  T,
  Nullable<Partial<S>> | undefined | null,
  Create | undefined,
  Update | undefined,
  Connect | undefined,
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
  __typename: 'Relation',
});

export const autoRelation = <
  T extends { create?: any; update?: any },
  S = T,
  Create = 'create' extends keyof T
    ? T['create'] extends unknown
      ? undefined
      : T['create']
    : undefined,
  Update = 'update' extends keyof T
    ? T['update'] extends unknown
      ? undefined
      : T['update']
    : undefined,
  Connect = 'connect' extends keyof T
    ? T['connect'] extends unknown
      ? undefined
      : T['connect']
    : undefined,
  ModelSource = any,
  Key = any,
>(
  p: () => {
    create?: () => PrismaInputSchema<Create, Nullable<Partial<S>>> | undefined;
    update?: () => PrismaInputSchema<Update, Nullable<Partial<S>>> | undefined;
  },
): OneRelationMapper<
  T,
  Nullable<Partial<S>> | undefined | null,
  Create | undefined,
  Update | undefined,
  Connect | undefined,
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

const mapManyRelation = <Model, Create, Update, Connect, Where>(p: {
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
    Create | undefined,
    Update | undefined,
    Connect | undefined,
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
  pick: (
    m?: ModelSource | null,
  ) => (Partial<S> | null | undefined)[] | null | undefined,
  pickForUpdate: 'where' extends keyof SourceUpdate
    ? (m: S | undefined | null) => SourceUpdate['where'] | null | undefined
    : false,
): ManyRelationMapper<
  T,
  S | undefined | null,
  Create | undefined,
  Update | undefined,
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

export const autoManyRelation = <
  T extends { create?: any[] | null; update?: any[] | null },
  S = T,
  SourceUpdate = T extends { update?: (infer U)[] | null } ? U : never,
  Create = T extends { create?: (infer C)[] | null } ? C : never,
  Update = 'data' extends keyof SourceUpdate ? SourceUpdate['data'] : never,
  Connect = T extends { connect?: any[] | null } ? T | undefined : undefined,
  aConnectData = T extends { connect?: (infer Data)[] | null }
    ? Data | undefined
    : undefined,
  UpdateWhere = 'where' extends keyof SourceUpdate
    ? SourceUpdate['where']
    : undefined,
  // Disconnect = T extends { disconnect?: any[] | null }
  //   ? T | undefined
  //   : undefined,
  ModelSource = object,
  Key = any,
  ForeignKey extends keyof UpdateWhere = any,
>(
  p: () => {
    create?: () => PrismaInputSchema<Create, S> | undefined;
    update?: () => PrismaInputSchema<Update, S> | undefined;
  },
  foreignKey: ForeignKey,
): ManyRelationMapper<
  T,
  S | undefined | null,
  Create | undefined,
  Update | undefined,
  Connect | undefined,
  any, // Errors in disconnect will popup on runtime
  ModelSource,
  Key extends keyof ModelSource
    ? ModelSource[Key] extends Partial<InferPrismaModel<Create>>[]
      ? ModelSource[Key][0] extends UpdateWhere | undefined | null // TODO or vice versa?
        ? ForeignKey extends keyof ModelSource[Key][0]
          ? ForeignKey extends keyof UpdateWhere
            ? Key
            : unknown
          : unknown
        : unknown
      : unknown
    : unknown
> => ({
  map: ({ value, oldValue }) => {
    return mapManyRelation({
      pickForUpdate: (m?: any) => m?.[foreignKey as any],
      relationMappers: p,
      value,
      oldValue,
    });
  },
  __typename: 'ManyRelation',
});

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

export const autoReference = <
  T extends { connect?: any },
  S,
  ModelSource,
  Key,
>(): OneReferenceMapper<
  T,
  S | undefined,
  'connect' extends keyof S ? S['connect'] : any,
  ModelSource,
  Key extends keyof ModelSource
    ? T['connect'] | undefined | null extends
        | ModelSource[Key]
        | undefined
        | null // TODO or vice versa?
      ? Key
      : unknown
    : any
> => ({ map: (p) => mapReference(p), __typename: 'Reference' });

export const reference = <T extends { connect?: any }, S, ModelSource>(
  resolveValue: (
    value?: Partial<ModelSource> | null,
  ) => T['connect'] | null | undefined,
): OneReferenceMapper<
  T,
  S | undefined,
  'connect' extends keyof S ? S['connect'] : any,
  ModelSource
> => ({
  pick: resolveValue,
  map: (p) => mapReference(p),
  __typename: 'Reference',
});

export const manyReference = <T extends { connect?: any }, S, ModelSource>(
  // p?: ReferenceOptions<NonNullable<S>, keyof NonNullable<S>>,
  resolveValue?: (value?: ModelSource | null) => S[] | null | undefined,
): ManyReferenceMapper<T, S[] | undefined | null, any, ModelSource> => ({
  pick: resolveValue,
  map: ({ value, oldValue }) => {
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
  },
  __typename: 'ManyReference',
});

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
            const method = oldValue ? 'update' : 'create';
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

// const assertDisconnectConflict = (v: any, v2: any, key: string) => {
//   if (v?.disconnect && v2?.disconnect) {
//     console.error(
//       `object: reference and relation property on ${key} want to disconnect`,
//       key,
//     );
//   }
// };

// function shallowEqual(value1: any, value2: any): boolean {
//   // Check if both values are strictly equal, covering primitives and reference equality for objects
//   if (value1 === value2) {
//     return true;
//   }

//   // Check for null or undefined
//   if (value1 == null || value2 == null) {
//     return value1 === value2;
//   }

//   // Ensure both values are objects before proceeding with object comparison
//   if (typeof value1 !== 'object' || typeof value2 !== 'object') {
//     return false;
//   }

//   const keys1 = Object.keys(value1);
//   const keys2 = Object.keys(value2);

//   if (keys1.length !== keys2.length) {
//     return false;
//   }

//   for (const key of keys1) {
//     if (value1[key] !== value2[key]) {
//       return false;
//     }
//   }

//   return true;
// }

function someKeysHaveValues(obj: any) {
  for (const key in obj) {
    if (obj[key]) {
      return true;
    }
  }
  return false;
}
