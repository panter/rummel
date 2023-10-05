export * from './mappers';
export * from './builder';

// TODO: composed primary keys
type EntityIdInput = {
  id?: string;
};

// TODO: composed primary keys
type ConnectRelationInput = {
  id?: string;
};

type PropertyTypes = string | number | boolean | Date | bigint;

type GenericPrismaInput = Record<string, unknown>;

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

type ExtractManyReferenceType<T> = T extends { connect?: (infer C)[] }
  ? C | undefined
  : never;

type ExtractManyRelationUpdateDataType<U> = U extends { data?: infer UU }
  ? Partial<UU> | never
  : never;

export type CommonProperties<T, U> = Extract<keyof T, keyof U>;

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

export type PrismaOneObjectInput<Create, Update> = {
  connect?: ConnectRelationInput;
  create?: Create;
  disconnect?: boolean;
  update?: Update;
};

export type PrismaManyObjectInput<Create, Update> = {
  connect?: ConnectRelationInput[];
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
export type PropertyMapper<T> = {
  map: (props: {
    value?: T | null;
    oldValue?: T | null;
    method: 'create' | 'update';
  }) => T | { set?: T } | undefined;
  __typename: 'Property';
};

export type OneRelationMapper<
  T extends GenericPrismaRelation | undefined,
  Source = T,
  Create = 'create' extends keyof T ? T['create'] : never,
  Update = 'update' extends keyof T ? T['update'] : never,
> = {
  // embbedded?: boolean;
  map: (props: {
    value?: Source | null;
    oldValue?: Source | null;
  }) => PrismaOneObjectInput<Create, Update> | undefined;
  __typename: 'Relation';
};

export type ManyRelationMapper<
  T extends GenericPrismaRelation,
  Source = T,
  Create = T['create'],
  Update = T['update'],
> = {
  // embbedded?: boolean;
  map: (props: {
    value?: Source[] | null;
    oldValue?: Source[] | null;
  }) => PrismaManyObjectInput<Create, Update> | undefined;
  __typename: 'ManyRelation';
};

export type OneReferenceMapper<
  T extends GenericPrismaOneConnect,
  Source = T,
  Connect = T['connect'],
> = {
  // embbedded?: boolean;
  map: (props: {
    value?: Source | null;
    oldValue?: Source | null;
  }) => PrismaOneReferenceInput<Connect> | undefined;
  __typename: 'Reference';
};

export type ManyReferenceMapper<
  T extends GenericPrismaManyConnect,
  Source = T,
  Connect = ExtractManyReferenceType<T>,
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
 * @typeParam T - Represents the Prisma input property structure.
 * @typeParam S - Represents a source type, defaulting to a partial version of `T`.
 */
export type PrismaInputSchemaProperty<T, S = Partial<T>> = T extends {
  create?: (infer C)[] | null;
  update?: (infer U)[] | null;
}
  ? ManyRelationMapper<
      T,
      ExtractModelDataType<S>,
      C | undefined,
      ExtractManyRelationUpdateDataType<U> | undefined
    >
  : T extends { create?: infer C; update?: infer U }
  ? OneRelationMapper<
      T,
      S,
      C extends unknown ? C | undefined : C | undefined,
      U extends unknown ? U | undefined : U | undefined
    >
  : T extends { connect?: (infer C)[] | null }
  ? ManyReferenceMapper<T, S[], Partial<C> | undefined>
  : T extends { connect?: infer C }
  ? OneReferenceMapper<T, S, Partial<C> | undefined>
  : T extends PropertyTypes
  ? PropertyMapper<T>
  : T extends { set?: infer S }
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
 * @typeParam T - Represents the Prisma input structure. It should extend from `GenericPrismaInput` or be `unknown`.
 * @typeParam Source - Represents the inferred Prisma model derived from a partial version of `T`. By default, it's inferred
 *                     from the input type `T`.
 */
export type PrismaInputSchema<
  T extends GenericPrismaInput | unknown,
  Source = InferPrismaModel<Partial<T>>,
> = {
  mapper(props: {
    value?: Source | null;
    oldValue?: Source | null;
    mapper: PrismaInputSchema<T, Source>;
  }): T | undefined;
  properties: {
    [K in keyof T as PrismaInputSchemaProperty<T[K]> extends never
      ? never
      : K]-?: K extends keyof Source
      ? PrismaInputSchemaProperty<T[K], Source[K]>
      : never;
  };
};

/**
 * Represents a type that infers the structure of a property within a Prisma model based on a given Prisma input property.
 *
 * This type is useful for determining the expected model property structure based on various Prisma input patterns,
 * especially when dealing with relations, connections, or value updates.
 *
 * @typeParam T - Represents the Prisma input property structure.
 */
export type InferPrismaModelProperty<T> = T extends {
  set?: infer U;
}
  ? U
  : T extends { create?: (infer C)[] | null; update?: (infer U)[] | null }
  ?
      | InferPrismaModel<Partial<ExtractPrismaInputFromMany<C, U>>>[]
      | undefined
      | null
  : T extends { create?: infer C; update?: infer U }
  ?
      | InferPrismaModel<Partial<ExtractPrismaInputFromOne<C, U>>>
      | undefined
      | null
  : T extends { connect?: infer C }
  ? C
  : T;

/**
 * Represents a type that infers the structure of a Prisma model based on a given Prisma input.
 *
 * For each property `K` in the input type `T`, it infers the corresponding model property type
 * using the `InferPrismaModelProperty` utility type.
 *
 * This type is useful for deriving the expected model structure from a Prisma input, especially
 * when dealing with complex nested inputs or relations.
 *
 * @typeParam T - A type that extends from `GenericPrismaInput` or is `unknown`. Represents the Prisma input structure.
 */
export type InferPrismaModel<T extends GenericPrismaInput | unknown> = {
  [K in keyof T]: InferPrismaModelProperty<T[K]>;
};

/**
 * Represents a type that maps each property of an inferred Prisma model to its corresponding Prisma input schema property.
 *
 * For each key `K` in the inferred Prisma model derived from the input type `Input`, this type associates it with
 * a `PrismaInputSchemaProperty` that describes how the input property should be structured and how it relates to
 * the model property.
 *
 * This type is instrumental in constructing a comprehensive Prisma input schema that aligns with the structure
 * and relations of the underlying Prisma model.
 *
 * @typeParam Input - Represents the Prisma input structure from which the model is inferred.
 */
export type PrismaInputSchemaProperties<Input> = {
  [K in keyof InferPrismaModel<Input>]-?: PrismaInputSchemaProperty<
    Input[K],
    InferPrismaModel<Input>[K]
  >;
};
