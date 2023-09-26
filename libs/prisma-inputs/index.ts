export * from './mappers';
export * from './builder';

type KeysOfSpecificType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];
type OmitByType<T, U> = Omit<T, KeysOfSpecificType<T, U>>;

// TODO: composed primary keys
type EntityIdInput = {
  id?: string;
};

// TODO: composed primary keys
type ConnectRelationInput = {
  id?: string;
};

type PropertyTypes = string | number | boolean | Date;

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
    ? { connect?: U; __reference: true }
    : never;
};

export type PrismaInput<T> = Required<PrismaInputReferences<T> & T>;

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
  : T extends { connect?: (infer C)[] | null; __reference: true }
  ? ManyReferenceMapper<T, S[], Partial<C> | undefined>
  : T extends { connect?: infer C; __reference: true }
  ? OneReferenceMapper<T, S, Partial<C> | undefined>
  : T extends PropertyTypes
  ? PropertyMapper<T>
  : T extends { set?: infer S }
  ? PropertyMapper<Partial<S>>
  : never;

export type PrismaInputSchema<
  T extends GenericPrismaInput | unknown,
  Source = InferPrismaFormModel<Partial<T>>,
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

export type PrismaInputSchemaProperties<Input> = {
  [K in keyof InferPrismaFormModel<Input>]-?: PrismaInputSchemaProperty<
    Input[K],
    InferPrismaFormModel<Input>[K]
  >;
};

export type InferPrismaModelProperty<T> = T extends {
  set?: infer U;
}
  ? U
  : T extends { create?: (infer C)[] | null; update?: (infer U)[] | null }
  ?
      | InferPrismaFormModel<Partial<ExtractPrismaInputFromMany<C, U>>>[]
      | undefined
      | null
  : T extends { create?: infer C; update?: infer U }
  ?
      | InferPrismaFormModel<Partial<ExtractPrismaInputFromOne<C, U>>>
      | undefined
      | null
  : T extends { connect?: infer C; __reference: true }
  ? C
  : T extends { connect?: any }
  ? '__omit'
  : T;

export type InferPrismaModel<T extends GenericPrismaInput | unknown> = {
  [K in keyof T]: InferPrismaModelProperty<T[K]>;
};

export type InferPrismaFormModel<T> = OmitByType<
  InferPrismaModel<T>,
  | '__omit'
  | ('__omit' | undefined)
  | ('__omit' | null)
  | ('__omit' | undefined | null)
>;
