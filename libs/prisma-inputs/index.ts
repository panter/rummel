export * from './mappers';
export * from './builder';

// TODO: composed primary keys
type EntityIdInput = {
  id?: string;
};

// TODO: composed primary keys
// type ConnectRelationInput = {
//   id?: string;
// };

type PropertyTypes = string | number | boolean | Date | bigint;

export type GenericPrismaInput = Record<string, unknown>;

type GenericPrismaOneConnect = { connect?: any };

type GenericPrismaManyConnect = { connect?: any[] | null };

type GenericPrismaRelation = { create?: any; update?: any };

type PrismaInputReferenceOneKeys<K> = `${Extract<K, string>}Id`;

type PrismaInputReferenceManyKeys<K> = `${Extract<K, string>}Ids`;

export type PrismaInputArgs<T> = T extends { data?: infer U } ? U : never;

type ExtractPrismaInputFromMany<C, U> = PrismaInput<
  | (C extends unknown ? never : C)
  | (U extends { data?: infer D }
      ? D extends Record<any, any>
        ? D
        : never
      : never)
>;

type ExtractModelDataType<S> = S extends any[] ? S[0] : never;

type ExtractPrismaInputFromOne<C, U> = PrismaInput<
  C extends Record<any, any>
    ? C | undefined
    : U extends Record<any, any>
      ? U | undefined
      : never
>;

type ExtractManyRelationConnectType<T> = T extends {
  connect?: (infer C)[] | null;
}
  ? C | undefined
  : never;

type ExtractManyReferenceType<T> = T extends { connect?: (infer C)[] }
  ? C | undefined
  : never;

type ExtractManyRelationUpdateDataType<U> = U extends { data?: infer UU }
  ? Partial<UU> | never
  : never;

export type CommonProperties<T, U> = Extract<keyof T, keyof U>;

/**
 * A utility type that takes a Prisma model input type and returns a new type that only includes
 * the fields that reference other models. For each reference field, the type is modified to only
 * include the `connect` property, which is used to specify the primary keys of the related model instance.
 */
export type PrismaInputReferences<T> = {
  [K in keyof T as T[K] extends GenericPrismaManyConnect | undefined | null
    ? PrismaInputReferenceManyKeys<K>
    : T[K] extends GenericPrismaOneConnect | undefined | null
      ? PrismaInputReferenceOneKeys<K>
      : never]: T[K] extends { connect?: infer U } | undefined | null
    ? { connect?: U }
    : never;
};

export type PrismaInput<T> = PrismaInputReferences<T> & T;

export type PrismaOneObjectInput<Create, Update, Connect> = {
  connect?: Connect;
  create?: Create;
  disconnect?: boolean;
  update?: Update;
};

export type PrismaManyObjectInput<Create, Update, Connect> = {
  connect?: Connect[];
  create?: Create[];
  disconnect?: EntityIdInput[];
  update?: { where: EntityIdInput; data: Update }[];
};

export type PrismaOneReferenceInput<Connect> = {
  connect?: Connect;
  disconnect?: boolean;
};

export type PrismaManyReferenceInput<Connect> = {
  connect?: Connect[];
  disconnect?: EntityIdInput[];
};

// ---
export type PropertyMapper<Model> = {
  map: (props: {
    value?: Model | null;
    oldValue?: Model | null;
    method: 'create' | 'update';
  }) => Model | { set?: Model } | undefined;
  __typename: 'Property';
};

export type OneRelationMapper<
  Input extends GenericPrismaRelation | undefined,
  Model = any,
  Create = 'create' extends keyof Input ? Input['create'] : never,
  Update = 'update' extends keyof Input ? Input['update'] : never,
  Connect = 'connect' extends keyof Input ? Input['connect'] : never,
> = {
  // embbedded?: boolean;
  map: (props: {
    value?: Model | null;
    oldValue?: Model | null;
  }) => PrismaOneObjectInput<Create, Update, Connect> | undefined;
  __typename: 'Relation';
};

export type ManyRelationMapper<
  Input extends GenericPrismaRelation,
  Model = any,
  Create = Input['create'],
  Update = Input['update'],
  Connect = 'connect' extends keyof Input
    ? Input['connect'] extends unknown
      ? undefined
      : Input['connect']
    : undefined,
> = {
  // embbedded?: boolean;
  map: (props: {
    value?: Model[] | null;
    oldValue?: Model[] | null;
  }) => PrismaManyObjectInput<Create, Update, Connect> | undefined;
  __typename: 'ManyRelation';
};

export type OneReferenceMapper<
  Input extends GenericPrismaOneConnect,
  Model = Input,
  Connect = Input['connect'],
> = {
  // embbedded?: boolean;
  map: (props: {
    value?: Model | null;
    oldValue?: Model | null;
  }) => PrismaOneReferenceInput<Connect> | undefined;
  __typename: 'Reference';
};

export type ManyReferenceMapper<
  Input extends GenericPrismaManyConnect,
  Source = any,
  Connect = ExtractManyReferenceType<Input>,
> = {
  // embbedded?: boolean;
  map: (props: {
    value?: Source | null;
    oldValue?: Source | null;
  }) => PrismaManyReferenceInput<Connect> | undefined;
  __typename: 'ManyReference';
};

// ---

/**
 * Represents a type that determines the appropriate schema property mapper based on the structure of a given Prisma input property.
 *
 * The type performs a series of checks on the input property `T` to decide which mapper type should be used:
 *
 * This type is instrumental in constructing a Prisma input schema that accurately represents the structure
 * and relations of the underlying Prisma model.
 *
 * @typeParam Input - Represents the Prisma input property structure.
 * @typeParam Model - Represents the model property type that the input property maps to.
 */
export type PrismaInputSchemaProperty<
  Input = any,
  Model = any,
  InputSource = any,
  Key extends keyof InputSource = any,
> = Input extends {
  create?: (infer C)[] | null;
  update?: (infer U)[] | null;
}
  ? ManyRelationMapper<
      Input,
      ExtractModelDataType<Model>,
      C | undefined,
      ExtractManyRelationUpdateDataType<U> | undefined,
      ExtractManyRelationConnectType<Input>
    >
  : Input extends { create?: infer C; update?: infer U }
    ? OneRelationMapper<
        Input,
        Model,
        C extends unknown ? C | undefined : C | undefined,
        U extends unknown ? U | undefined : U | undefined,
        'connect' extends keyof Input ? Input['connect'] : undefined
      >
    : Input extends { connect?: (infer C)[] | null }
      ? ManyReferenceMapper<Input, Model[], Partial<C> | undefined>
      : Input extends { connect?: infer C }
        ? OneReferenceMapper<Input, Model, Partial<C> | undefined>
        : Input extends PropertyTypes
          ? PropertyMapper<InputSource[Key]>
          : Input extends { set?: infer S }
            ? PropertyMapper<Partial<S>>
            : never;

/**
 * Represents a type that defines the structure and mapping behavior of a Prisma input schema.
 *
 * The type consists of two main parts:
 *
 * 1. `mapper`: A function that transforms a given source value (and its previous value, if any) into the desired
 *    Prisma input format. The function receives the current value, the old value, and the schema itself as arguments.
 *
 * 2. `properties`: An object that maps each key of the input type `T` to its corresponding Prisma input schema property.
 *    It ensures that only valid properties, as defined by `PrismaInputSchemaProperty`, are included in the resulting schema.
 *
 * This type provides a blueprint for constructing and transforming Prisma input data, ensuring that the input aligns
 * with the expected structure and relations of the underlying Prisma model.
 *
 * @typeParam Input - Represents the Prisma input the mappter will return.
 * @typeParam Model - The model of the value and value that are mapped to the Input type.
 */
export type PrismaInputSchema<
  Input extends GenericPrismaInput | unknown,
  Model = InferPrismaModel<Partial<Input>>,
> = {
  mapper(props: {
    value?: Model | null;
    oldValue?: Model | null;
    mapper: PrismaInputSchema<Input, Model>;
  }): Input | undefined;
  properties: {
    [K in keyof Input]-?: K extends keyof Model
      ? PrismaInputSchemaProperty<Input[K], Model[K]>
      : never;
  };
};

/**
 * Represents a type that infers the structure of a property within a Prisma model based on a given Prisma input property.
 *
 * This type is useful for determining the expected model property structure based on various Prisma input patterns,
 * especially when dealing with relations, connections, or value updates.
 *
 * @typeParam Input - Represents the Prisma input structure from which the model is inferred.
 */
export type InferPrismaModelProperty<Input> = Input extends {
  set?: infer U;
}
  ? U
  : Input extends { create?: (infer C)[] | null; update?: (infer U)[] | null }
    ?
        | InferPrismaModel<Partial<ExtractPrismaInputFromMany<C, U>>>[]
        | undefined
        | null
    : Input extends { create?: infer C; update?: infer U }
      ?
          | InferPrismaModel<Partial<ExtractPrismaInputFromOne<C, U>>>
          | undefined
          | null
      : Input extends { connect?: infer C }
        ? C
        : Input;

/**
 * Represents a type that infers the structure of a Prisma model based on a given Prisma input.
 *
 * For each property type `Input`, it infers the corresponding model property type
 * using the `InferPrismaModelProperty` utility type.
 *
 * This type is useful for deriving the expected model structure from a Prisma input, especially
 * when dealing with complex nested inputs or relations.
 *
 * @typeParam Input - Represents the Prisma input structure from which the model is inferred.
 */
export type InferPrismaModel<Input> = {
  [K in keyof Input]: InferPrismaModelProperty<Input[K]>;
};

/**
 * Represents a type that maps each property of an inferred Prisma input to its corresponding model property.
 *
 * For each key in `Input`, is associated with a `PrismaInputSchemaProperty` that describes how the model is
 * mapped to the input.
 *
 * @typeParam Input - Represents the Prisma input structure from which the model is inferred.
 */
export type PrismaInputSchemaProperties<Input> = {
  [K in keyof Input]-?: PrismaInputSchemaProperty<
    Input[K],
    InferPrismaModel<Input>[K],
    Input,
    K
  >;
};
