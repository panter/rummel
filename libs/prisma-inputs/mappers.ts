import {
  GenericPrismaInput,
  InferPrismaModel,
  ManyReferenceMapper,
  ManyRelationMapper,
  OneReferenceMapper,
  OneRelationMapper,
  PrismaInput,
  PrismaInputSchema,
  PrismaInputSchemaProperty,
  PrismaManyObjectInput,
  PrismaManyReferenceInput,
  PrismaOneObjectInput,
  PrismaOneReferenceInput,
  PropertyMapper,
} from './index';
import { deepCompareObjects } from './deepCompare';

const MAPPER_ORDER: { [key: string]: number } = {
  Property: 1,
  Relation: 2,
  Reference: 3,
  ManyRelation: 4,
  ManyReference: 5,
};

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

export const property = <T>(): PropertyMapper<T> => ({
  map: ({ value, oldValue, method }) => {
    if (value !== oldValue) {
      return setPropertyMapper(method, value === null ? undefined : value);
    }
  },
  __typename: 'Property',
});

export const relation = <
  T extends { create?: any; update?: any },
  S = T,
  Create = 'create' extends keyof T
    ? T['create'] extends unknown
      ? any
      : T['create']
    : any,
  Update = 'update' extends keyof T
    ? T['update'] extends unknown
      ? any
      : T['update']
    : any,
>(
  p: () => {
    create?: () => PrismaInputSchema<Create, S> | undefined;
    update?: () => PrismaInputSchema<Update, S> | undefined;
  },
): OneRelationMapper<
  T,
  S | undefined | null,
  Create | undefined,
  Update | undefined
> => ({
  map: ({ value, oldValue }) => {
    const { create, update } = p();
    if (value === oldValue) {
      return;
    }
    const inputData:
      | PrismaOneObjectInput<Create | undefined, Update | undefined>
      | undefined = {};

    if (
      oldValue !== undefined &&
      oldValue !== null &&
      (value === undefined || value === null)
    ) {
      inputData.disconnect = true;
    } else if (
      (value as any)?.id &&
      (value as any)?.id === (oldValue as any)?.id
    ) {
      const updateMapper = update?.();
      const updateInputData = updateMapper?.mapper?.({
        value: value === undefined ? null : value,
        oldValue,
        mapper: updateMapper,
      });
      if (updateInputData) {
        inputData.update = updateInputData;
      }
    } else if ((value as any)?.id) {
      inputData.connect = { id: (value as any)?.id };
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
  },
  __typename: 'Relation',
});

export const manyRelation = <
  T extends { create?: any[] | null; update?: any[] | null },
  S = T,
  SourceUpdate = T extends { update?: (infer U)[] | null } ? U : never,
  Create = T extends { create?: (infer C)[] | null } ? C : never,
  Update = 'data' extends keyof SourceUpdate ? SourceUpdate['data'] : never,
>(
  p: () => {
    create?: () => PrismaInputSchema<Create, S> | undefined;
    update?: () => PrismaInputSchema<Update, S> | undefined;
  },
): ManyRelationMapper<
  T,
  S | undefined | null,
  Create | undefined,
  Update | undefined
> => ({
  map: ({ value, oldValue }) => {
    const { create, update } = p();
    if (value === oldValue) {
      return;
    }

    if (deepCompareObjects(value, oldValue)) {
      return;
    }

    const inputData: PrismaManyObjectInput<
      Create | undefined,
      Update | undefined
    > = {};

    // disconnect
    oldValue
      ?.filter((oldValueItem) => {
        return !value?.some((newValueItem) => {
          return (newValueItem as any).id === (oldValueItem as any).id;
        });
      })
      .forEach((oldValueItem) => {
        inputData.disconnect = inputData.disconnect || [];
        inputData.disconnect.push({ id: (oldValueItem as any).id });
      });

    // create & update
    value?.forEach((newValueItem) => {
      const oldValueItem = oldValue?.find((oldValueItem) => {
        return (
          (newValueItem as any)?.id &&
          (newValueItem as any)?.id === (oldValueItem as any)?.id
        );
      });
      if (
        (newValueItem as any)?.id &&
        (newValueItem as any)?.id == (oldValueItem as any)?.id
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
            where: { id: (newValueItem as any)?.id },
            data: updateInputData,
          });
        }
      } else if ((newValueItem as any)?.id && !oldValueItem) {
        inputData.connect = inputData.connect || [];
        inputData.connect.push({ id: (newValueItem as any)?.id });
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
  },
  __typename: 'ManyRelation',
});

export const reference = <T extends { connect?: any }, S>(): // map?: (props: {
//   value?: S | null;
//   oldValue?: S | null;
// }) => PrismaOneReferenceInput<T['connect']>,
OneReferenceMapper<T, S | undefined> => ({
  map: ({ value, oldValue }) => {
    // if (map) {
    //   return map({ value, oldValue });
    // }

    if (value === oldValue) {
      return;
    }

    if ((value as any)?.id && (value as any)?.id === (oldValue as any)?.id) {
      return;
    }

    const inputData: PrismaOneReferenceInput<T['connect']> | undefined = {};
    if (
      oldValue !== undefined &&
      oldValue !== null &&
      (value === undefined || value === null)
    ) {
      inputData.disconnect = true;
    } else if ((value as any)?.id) {
      inputData.connect = { id: (value as any)?.id };
    }

    if (Object.keys(inputData).length === 0) {
      return;
    }
    return inputData;
  },
  __typename: 'Reference',
});

export const manyReference = <
  T extends { connect?: any },
  S = T,
>(): ManyReferenceMapper<T, S[] | undefined> => ({
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
        !value?.some(
          (newValueItem) =>
            (newValueItem as any).id === (oldValueItem as any).id,
        )
      ) {
        inputData.disconnect = inputData.disconnect || [];
        inputData.disconnect.push({ id: (oldValueItem as any).id });
      }
    });

    // connect
    value?.forEach((newValueItem) => {
      if (!(newValueItem as any).id) {
        console.warn(
          'ManyReference: id is missing, ignore the connect',
          newValueItem,
        );
      } else {
        // connect if not in oldValue
        if (
          !oldValue?.some(
            (oldValueItem) =>
              (newValueItem as any).id === (oldValueItem as any).id,
          )
        ) {
          inputData.connect = inputData.connect || [];
          inputData.connect.push({ id: (newValueItem as any).id } as any); // CRO: weird typing
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
  <
    Input extends GenericPrismaInput,
    Model extends InferPrismaModel<Partial<Input>>,
  >() =>
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
          // sort by mapper type so that relations before references
          const aPropMapper: PrismaInputSchemaProperty = (
            props.mapper.properties as any
          )[a as keyof Input];

          const bPropMapper: PrismaInputSchemaProperty = (
            props.mapper.properties as any
          )[b as keyof Input];

          return (
            MAPPER_ORDER[aPropMapper.__typename] -
            MAPPER_ORDER[bPropMapper.__typename]
          );
        })
        .forEach((key) => {
          const propMapper: PrismaInputSchemaProperty = (
            props.mapper.properties as any
          )[key as keyof Input];

          const value = source[key as keyof Model] as any;
          const oldValue = oldSource?.[key as keyof Model] as any;

          if (propMapper.__typename === 'Property') {
            const method = (source as any)?.id ? 'update' : 'create';
            const mappedValue = propMapper.map?.({
              value,
              oldValue,
              method,
            });
            if (mappedValue) {
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

export function prismaInputSchema<T>(
  schema: PrismaInputSchema<PrismaInput<T>>,
): PrismaInputSchema<PrismaInput<T>> {
  return schema;
}

export const mapFromPrismaSchema = <T>({
  schema,
  value,
  oldValue,
}: {
  schema: PrismaInputSchema<T>;
  value?: InferPrismaModel<T> | null | undefined;
  oldValue?: InferPrismaModel<T> | null | undefined;
}) => schema.mapper({ value, oldValue, mapper: schema });

// const assertDisconnectConflict = (v: any, v2: any, key: string) => {
//   if (v?.disconnect && v2?.disconnect) {
//     console.error(
//       `object: reference and relation property on ${key} want to disconnect`,
//       key,
//     );
//   }
// };
