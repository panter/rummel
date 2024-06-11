import {
  InferPrismaModel,
  PrismaInput,
  PrismaInputSchema,
  autoManyReference,
  autoManyRelation,
  autoProperty,
  autoReference,
  autoRelation,
  manyReference,
  manyRelation,
  object,
  prismaSchemaBuilder,
  property,
  reference,
  relation,
} from '.';

export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: { input: string; output: string };
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: string; output: string };
};

export type StringInput = {
  set?: InputMaybe<Scalars['String']['input']>;
};

export type Maybe<T> = T | null;

export type InputMaybe<T> = Maybe<T>;

export type ConnectRelationInput = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type EntityIdInput = {
  id?: Scalars['String']['input'] | null;
};

export type Simple = {
  id: string;
  fname: string;
  fsecondeName?: string | null | undefined;
};

export type Person = {
  id: string;
  name: string;
  addresses: Address[];
  addressesIds: EntityIdInput[];
  organisation: Organisation;
};

export type Address = {
  id: string;
  address: string;
};

export type Organisation = {
  id: string;
  description: string;
  person: EntityIdInput[];
  personIds: EntityIdInput[];
  simple: Simple;
  simpleId: EntityIdInput;
  simples: Simple[];
  simplesIds: EntityIdInput[];
};

export type SimpleCreateInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type SimpleUpdateInput = {
  name?: InputMaybe<StringInput>;
  secondName?: InputMaybe<StringInput>;
};

export type PersonCreateInput = {
  addresses?: AddressCreateNestedManyWithoutPersonInput | null;
  name?: InputMaybe<Scalars['String']['input']>;
  organisation?: InputMaybe<OrganisationCreateNestedOneWithoutPersonInput>;
};

export type PersonCreateNestedManyWithoutOrganisationInput = {
  connect?: InputMaybe<Array<ConnectRelationInput>>;
  disconnect?: InputMaybe<Array<EntityIdInput>>;
};

export type PersonUpdateInput = {
  addresses?: InputMaybe<AddressCreateNestedManyWithoutPersonInput>;
  name?: InputMaybe<StringInput>;
  organisation?: InputMaybe<OrganisationUpdateNestedOneWithoutPersonInput>;
};

export type AddressCreateNestedManyWithoutPersonInput = {
  connect?: InputMaybe<Array<ConnectRelationInput>>;
  create?: InputMaybe<Array<AddressCreateWithoutPersonInput>>;
  disconnect?: InputMaybe<Array<EntityIdInput>>;
  update?: InputMaybe<Array<AddressUpdateWithWhereUniqueWithoutPersonInput>>;
};

export type AddressCreateWithoutPersonInput = {
  address?: InputMaybe<Scalars['String']['input']>;
};

export type AddressUpdateInput = {
  address?: InputMaybe<StringInput>;
};

export type AddressUpdateWithWhereUniqueWithoutPersonInput = {
  data?: InputMaybe<AddressUpdateInput>;
  where?: EntityIdInput | null;
};

export type OrganisationCreateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  person?: InputMaybe<PersonCreateNestedManyWithoutOrganisationInput>;
  simple?: InputMaybe<SimpleCreateNestedOneWithoutOrganisationInput>;
  simples?: InputMaybe<SimpleCreateNestedManyWithoutOrganisationInput>;
};

export type OrganisationCreateNestedOneWithoutPersonInput = {
  connect?: InputMaybe<ConnectRelationInput>;
};

export type OrganisationUpdateInput = {
  description?: InputMaybe<StringInput>;
  person?: InputMaybe<PersonCreateNestedManyWithoutOrganisationInput>;
  simple?: InputMaybe<SimpleUpdateNestedOneWithoutOrganisationInput>;
  simples?: InputMaybe<SimpleCreateNestedManyWithoutOrganisationInput>;
};

export type OrganisationUpdateNestedOneWithoutPersonInput = {
  connect?: InputMaybe<ConnectRelationInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SimpleCreateNestedOneWithoutOrganisationInput = {
  connect?: InputMaybe<ConnectRelationInput>;
  create?: InputMaybe<SimpleCreateWithoutOrganisationInput>;
};

export type SimpleCreateWithoutOrganisationInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type SimpleCreateNestedManyWithoutOrganisationInput = {
  connect?: InputMaybe<Array<ConnectRelationInput>>;
  create?: InputMaybe<Array<SimpleCreateWithoutOrganisationInput>>;
  // disconnect?: InputMaybe<Array<EntityIdInput>>;
  update?: InputMaybe<
    Array<SimpleUpdateWithWhereUniqueWithoutOrganisationInput>
  >;
};

export type SimpleUpdateWithWhereUniqueWithoutOrganisationInput = {
  data?: InputMaybe<SimpleUpdateInput>;
  where?: EntityIdInput | null;
};

export type SimpleUpdateNestedOneWithoutOrganisationInput = {
  connect?: InputMaybe<ConnectRelationInput>;
  create?: InputMaybe<SimpleCreateWithoutOrganisationInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<SimpleUpdateWithoutOrganisationInput>;
};

export type SimpleUpdateWithoutOrganisationInput = {
  name?: InputMaybe<StringInput>;
};

const simpleSchema = prismaSchemaBuilder<
  SimpleCreateInput,
  SimpleUpdateInput,
  Simple
>({
  props: {
    name: property((m) => m?.fname, { set: true, required: false }),
    //     name: {
    //       __typename: 'Property',
    // pick: (m) => m?.name,
    //     }
    // name: property((m) => m?.fname),
  },
  create: {},
  update: {
    secondName: property((m) => m?.fsecondeName),
  },
});

export const personSchema = prismaSchemaBuilder<
  PersonCreateInput,
  PersonUpdateInput,
  Person
>({
  props: {
    name: property((m) => m?.name, { set: true, required: false }),
    addresses: manyRelation(
      () => addressSchema.relation(),
      (m) => m?.addresses, // BUG m should be typeof person[address]
      (m) => (m?.id ? { id: m.id || '' } : undefined),
    ),
    addressesIds: manyReference((m) => m?.addressesIds),
    organisation: reference((m) => m?.organisation),
    organisationId: reference(
      (m) => m?.organisation && { id: m.organisation.id || '' },
    ),
  },
  create: {
    // name: property((m) => m?.name),
  },
  update: {
    // name: property((m) => m?.name),
  },
});

const addressSchema = prismaSchemaBuilder<
  AddressCreateWithoutPersonInput,
  AddressUpdateInput,
  Address
>({
  props: {
    address: property((m) => {
      return m?.address;
    }),
    // address: {
    //   pick: (m) => m?.address,
    //   map: (p) => {
    //     p.value;
    //     console.log('value', p.value);
    //     return '';
    //   },
    //   __typename: 'Property',
    // },
  },
  create: {},
  update: {},
});

export const organisationCreateMapper: PrismaInputSchema<
  PrismaInput<OrganisationCreateInput>,
  Omit<
    InferPrismaModel<Partial<OrganisationCreateInput>>,
    'simples' | 'simplesIds' | 'description'
  > & {
    id: string;
    description: string;
    simple: {
      id: string;
    };
    simpleId: {
      id: string;
      // ida?: string;
    };
    simples: Array<{
      id: string;
      name?: string;
    }>;
    simplesIds: Array<{
      id: string;
    }>;
  }
> = {
  mapper: object(),
  properties: {
    description: autoProperty(),
    person: manyReference((m) => m?.person),
    personIds: manyReference((m) => m?.person),
    simple: autoRelation(
      // (m) => {
      //   return { id: m?.simple.id, fname: m?.simple.name };
      // },
      () => simpleSchema.relation(),
    ),
    simpleId: autoReference(),
    simples: autoManyRelation(() => simpleSchema.relation(), {
      foreignKey: 'id',
    }),
    simplesIds: autoManyReference(),
    // description: {
    //   pick: (m) => `${m?.description}`,
    //   map: ({ oldValue, value, method }) => {
    //     if (method === 'create') {
    //       return value || undefined;
    //     }
    //     return { set: '' };
    //   },
    //   __typename: 'Property',
    // },
    // description: property((m) => m?.adescription),
    // person: {
    //   __typename: 'ManyReference',
    //   pick: (m) => [{ id: m?.xsimpleId.iad || '' }],
    //   map: ({ oldValue, value }) => {
    //     if (value) {
    //       return { connect: value };
    //     }
    //     return { connect: [{ id: 'value.id' }] };
    //   },
    // },
    // simpleId: {
    //   __typename: 'Reference',
    //   pick: (m) => ({ id: 'm?.simapleId.id' }),
    //   map: ({ oldValue, value }) => {
    //     if (value) {
    //       return { connect: value };
    //     }xx
    //     return { connect: { id: 'value.id' } };
    //   },
    // },
  },
};

export const organisationUpdateMapper: PrismaInputSchema<
  PrismaInput<OrganisationUpdateInput>,
  Organisation
> = {
  mapper: object(),
  properties: {
    description: property((m) => m?.description),
    person: manyReference((m) => m?.person),
    personIds: manyReference((m) => m?.personIds),
    simple: relation(
      (m) => m?.simple,
      () => simpleSchema.relation(),
    ),
    simpleId: reference((m) => m?.simpleId),
    simples: manyRelation(
      () => simpleSchema.relation(),
      (m) => m?.simples,
      (m) => ({ id: m?.id || '' }),
    ),
    simplesIds: manyReference((m) => m?.simplesIds),
  },
};
