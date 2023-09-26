import { PrismaInput, PrismaInputSchema, prismaSchemaBuilder } from '.';
import {
  manyReference,
  manyRelation,
  object,
  property,
  reference,
  relation,
} from './mappers';

export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: { input: any; output: any };
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any };
};

export type StringInput = {
  set?: InputMaybe<Scalars['String']['input']>;
};

export type Maybe<T> = T | null;

export type InputMaybe<T> = Maybe<T>;

export type ConnectRelationInput = {
  id: Scalars['String']['input'];
};

export type EntityIdInput = {
  id: Scalars['String']['input'];
};

export type SimpleCreateInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type SimpleUpdateInput = {
  name?: InputMaybe<StringInput>;
};

export type PersonCreateInput = {
  addresses?: InputMaybe<AddressCreateNestedManyWithoutPersonInput>;
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
  where: EntityIdInput;
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
  disconnect?: InputMaybe<Array<EntityIdInput>>;
  update?: InputMaybe<
    Array<SimpleUpdateWithWhereUniqueWithoutOrganisationInput>
  >;
};

export type SimpleUpdateWithWhereUniqueWithoutOrganisationInput = {
  data?: InputMaybe<SimpleUpdateInput>;
  where: EntityIdInput;
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

const simpleSchema = prismaSchemaBuilder<SimpleCreateInput, SimpleUpdateInput>(
  () => ({
    props: {
      name: property(),
    },
    create: {},
    update: {},
  }),
);

const personSchema = prismaSchemaBuilder<PersonCreateInput, PersonUpdateInput>(
  () => ({
    props: {
      name: property(),
      addresses: manyRelation(() => addressSchema.relation()),
      addressesIds: manyReference(),
      organisation: relation(() => ({
        create: () => organisationCreateMapper,
        update: () => organisationUpdateMapper,
      })),
      organisationId: reference(),
    },
    create: {},
    update: {},
  }),
);

const addressSchema = prismaSchemaBuilder<
  AddressCreateWithoutPersonInput,
  AddressUpdateInput
>(() => ({
  props: {
    address: property(),
  },
  create: {},
  update: {},
}));

// const organisationMapper: PrismaInputSchema<
//   PrismaInput<OrganisationCreateInput | OrganisationUpdateInput>
// > = {
//   mapper: object(),
//   properties: {
//     // simple: relation(simpleSchema.relation()),
//     // simpleId: reference(),
//     description: property(),
//     personIds: manyReference(),
//     simple: relation(() => simpleSchema.relation()),
//     simpleId: reference(),
//   },
// };

const organisationCreateMapper: PrismaInputSchema<
  PrismaInput<OrganisationCreateInput>
> = {
  mapper: object(),
  properties: {
    description: property(),
    personIds: manyReference(),
    simple: relation(() => simpleSchema.relation()),
    simpleId: reference(),
    simples: manyRelation(() => simpleSchema.relation()),
    simplesIds: manyReference(),
  },
};

const organisationUpdateMapper: PrismaInputSchema<
  PrismaInput<OrganisationUpdateInput>
> = {
  mapper: object(),
  properties: {
    description: property(),
    personIds: manyReference(),
    simple: relation(() => simpleSchema.relation()),
    simpleId: reference(),
    simples: manyRelation(() => simpleSchema.relation()),
    simplesIds: manyReference(),
  },
};

describe('property()', () => {
  it('should return new value if no oldValue is not set "create"', () => {
    const resultUndefined = property<string>().map({
      value: 'John',
      method: 'create',
    });
    expect(resultUndefined).toBe('John');

    const resultNull = property<string>().map({
      value: 'John',
      oldValue: null,
      method: 'create',
    });
    expect(resultNull).toBe('John');
  });

  it('should return new value if no oldValue is not set "update"', () => {
    const resultUndefined = property<string>().map({
      value: 'John',
      method: 'update',
    });
    expect(resultUndefined).toEqual({ set: 'John' });

    const resultNull = property<string>().map({
      value: 'John',
      oldValue: null,
      method: 'update',
    });
    expect(resultNull).toEqual({ set: 'John' });
  });

  it('should return undefined if value and oldValue are the same', () => {
    const resultCreate = property<string>().map({
      value: 'John',
      oldValue: 'John',
      method: 'create',
    });
    expect(resultCreate).toBeUndefined();

    const resultUpdate = property<string>().map({
      value: 'John',
      oldValue: 'John',
      method: 'create',
    });
    expect(resultUpdate).toBeUndefined();
  });

  it('should return undefined if new value is null or undefined and oldValue is set on create', () => {
    const resultUndefined = property<string>().map({
      oldValue: 'John',
      method: 'create',
    });
    expect(resultUndefined).toBeUndefined();

    const resultNull = property<string>().map({
      value: null,
      oldValue: 'John',
      method: 'create',
    });
    expect(resultNull).toBeUndefined();
  });

  it('should return undefined if new value is null or undefined and oldValue is set on create', () => {
    const resultCreate = property<string>().map({
      oldValue: 'John',
      method: 'update',
    });
    expect(resultCreate).toEqual({ set: undefined });

    const resultUpdate = property<string>().map({
      value: null,
      oldValue: 'John',
      method: 'update',
    });
    expect(resultUpdate).toEqual({ set: undefined });
  });

  it('should return new value if no oldValue is not set "update"', () => {
    const resultUndefined = property<string>().map({
      value: 'John',
      method: 'update',
    });
    expect(resultUndefined).toEqual({ set: 'John' });

    const resultNull = property<string>().map({
      value: 'John',
      oldValue: null,
      method: 'update',
    });
    expect(resultNull).toEqual({ set: 'John' });
  });
});

describe('reference()', () => {
  it('should return new value if no oldValue is not set', () => {
    const resultUndefined = reference<
      { connect: { id: string } },
      { id: string }
    >().map({
      value: { id: '1' },
    });
    expect(resultUndefined).toEqual({ connect: { id: '1' } });
  });

  it('should return undefined if value and oldValue are the same', () => {
    const resultCreate = reference<
      { connect: { id: string } },
      { id: string }
    >().map({
      value: { id: '1' },
      oldValue: { id: '1' },
    });
    expect(resultCreate).toBeUndefined();
  });

  it('should return undefined if new value is null or undefined and oldValue is set on create', () => {
    const resultUndefined = reference<
      { connect: { id: string } },
      { id: string }
    >().map({
      oldValue: { id: '1' },
    });
    expect(resultUndefined).toEqual({ disconnect: true });

    const resultNull = reference<
      { connect: { id: string } },
      { id: string }
    >().map({
      oldValue: { id: '1' },
    });
    expect(resultNull).toEqual({ disconnect: true });
  });

  it('should return value if value and oldValue are set', () => {
    const resultCreate = reference<
      { connect: { id: string } },
      { id: string }
    >().map({
      value: { id: '1' },
      oldValue: { id: '2' },
    });
    expect(resultCreate).toEqual({ connect: { id: '1' } });
  });

  it('should return undefined if there is nothing to do', () => {
    const resultCreate = reference<
      { connect: { id: string } },
      { id: string }
    >().map({
      value: {} as any,
      oldValue: undefined,
    });
    expect(resultCreate).toBeUndefined();
  });
});

describe('manyReference()', () => {
  it('should return new value if no oldValue is not set', () => {
    const resultUndefined = manyReference<
      { connect: { id: string }[] },
      { id: string }
    >().map({
      value: [{ id: '1' }],
    });
    expect(resultUndefined).toEqual({ connect: [{ id: '1' }] });
  });

  it('should return undefined if value and oldValue are the same', () => {
    const resultCreate = manyReference<
      { connect: { id: string }[] },
      { id: string }
    >().map({
      value: [{ id: '1' }],
      oldValue: [{ id: '1' }],
    });
    expect(resultCreate).toBeUndefined();
  });

  it('should return undefined if new value is null or undefined and oldValue is set on create', () => {
    const resultUndefined = manyReference<
      { connect: { id: string }[] },
      { id: string }
    >().map({
      oldValue: [{ id: '1' }],
    });
    expect(resultUndefined).toEqual({ disconnect: [{ id: '1' }] });

    const resultNull = manyReference<
      { connect: { id: string }[] },
      { id: string }
    >().map({
      oldValue: [{ id: '1' }],
    });
    expect(resultNull).toEqual({ disconnect: [{ id: '1' }] });
  });

  it('should return value and disconnect old value if value and oldValue are set', () => {
    const resultCreate = manyReference<
      { connect: { id: string }[] },
      { id: string }
    >().map({
      value: [{ id: '1' }],
      oldValue: [{ id: '2' }],
    });
    expect(resultCreate).toEqual({
      connect: [{ id: '1' }],
      disconnect: [{ id: '2' }],
    });
  });

  it('should return value and disconnect old value if value and oldValue are set', () => {
    const resultCreate = manyReference<
      { connect: { id: string }[] },
      { id: string }
    >().map({
      value: [{ id: '1' }],
      oldValue: [{ id: '2' }],
    });
    expect(resultCreate).toEqual({
      connect: [{ id: '1' }],
      disconnect: [{ id: '2' }],
    });
  });

  it('should return undefined if there is nothing to do', () => {
    const resultCreate = manyReference<
      { connect: { id: string }[] },
      { id: string }
    >().map({
      value: [] as any,
      oldValue: undefined,
    });
    expect(resultCreate).toBeUndefined();
  });

  it("should ingore the connect if the property id is not present in the value's object", () => {
    const warnSpy = jest.spyOn(console, 'warn');
    warnSpy.mockImplementation(() => '');

    const resultCreate = manyReference<
      { connect: { id: string }[] },
      { id: string }
    >().map({
      value: [{ id: '' }],
      oldValue: [{ id: '2' }],
    });
    expect(resultCreate).toEqual({
      disconnect: [{ id: '2' }],
    });

    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});

describe('relation()', () => {
  it('should return new value if no oldValue is not set', () => {
    const resultCreate = organisationCreateMapper.properties.simple.map({
      value: {
        name: 'John',
      },
    });
    expect(resultCreate).toEqual({ create: { name: 'John' } });
  });

  it('should return undefined if value and oldValue are the same', () => {
    const resultCreate = organisationCreateMapper.properties.simple.map({
      value: { name: 'John' },
      oldValue: { name: 'John' },
    });

    expect(resultCreate).toBeUndefined();
  });

  it('should disconnect if new value is null or undefined and oldValue is set', () => {
    const resultUndefined = organisationCreateMapper.properties.simple.map({
      value: undefined,
      oldValue: { name: 'John' },
    });
    expect(resultUndefined).toEqual({ disconnect: true });

    const resultNull = organisationCreateMapper.properties.simple.map({
      value: null,
      oldValue: { name: 'John' },
    });
    expect(resultNull).toEqual({ disconnect: true });
  });

  it('should return create if property id is not set, disregarding the oldValue', () => {
    const resultCreate = organisationCreateMapper.properties.simple.map({
      value: { name: 'John' },
      oldValue: {
        name: 'Jane',
        id: '1',
      } as any,
    });
    expect(resultCreate).toEqual({
      create: { name: 'John' },
    });
  });
  it('should return update if property id is set, disregarding the oldValue', () => {
    const resultCreate = organisationCreateMapper.properties.simple.map({
      value: { name: 'John', id: '1' } as any,
      oldValue: { name: 'Jane', id: '1' } as any,
    });
    expect(resultCreate).toEqual({
      update: { name: { set: 'John' } },
    });
  });
});

describe('manyRelation()', () => {
  it('should return new value if oldValue is not set', () => {
    const resultCreate = organisationCreateMapper.properties.simples.map({
      value: [{ name: 'John' }],
    });
    expect(resultCreate).toEqual({ create: [{ name: 'John' }] });
  });

  it('should return undefined if value and oldValue are the same', () => {
    const resultCreate = organisationCreateMapper.properties.simples.map({
      value: [{ name: 'John' }],
      oldValue: [{ name: 'John' }],
    });
    expect(resultCreate).toBeUndefined();
  });

  it('should disconnect if new value is null or undefined and oldValue is set', () => {
    const john = { name: 'John', id: '1' };

    const resultUndefined = organisationCreateMapper.properties.simples.map({
      oldValue: [john],
    });
    expect(resultUndefined).toEqual({ disconnect: [{ id: john.id }] });

    const resultNull = organisationCreateMapper.properties.simples.map({
      value: null,
      oldValue: [john],
    });
    expect(resultNull).toEqual({ disconnect: [{ id: john.id }] });
  });

  it('should update, create and remove', () => {
    const jane = { name: 'Jane', id: '1' };
    const james = { name: 'James', id: '2' };
    const emma = { name: 'Emma', id: '3' };
    const resultCreate = organisationCreateMapper.properties.simples.map({
      value: [{ name: 'John' }, james, { id: emma.id, name: 'Emma-Lisa' }],
      oldValue: [jane, james, emma],
    });
    expect(resultCreate).toEqual({
      create: [{ name: 'John' }],
      update: [
        { where: { id: emma.id }, data: { name: { set: 'Emma-Lisa' } } },
      ],
      disconnect: [{ id: jane.id }],
    });
  });
});

describe('object()', () => {
  it('should use property()', () => {
    const personCreateSchema = personSchema.createSchema;
    expect(personCreateSchema).not.toBeUndefined();

    const resultCreate = object()({
      // we checked that personCreateSchema is not undefined
      mapper: personCreateSchema ? personCreateSchema : ({} as any),
      value: { name: 'John' },
    });
    expect(resultCreate).toEqual({ name: 'John' });
  });

  it('should use relation()', () => {
    const personCreateSchema = personSchema.createSchema;
    expect(personCreateSchema).not.toBeUndefined();

    const resultCreate = object()({
      // we checked that personCreateSchema is not undefined
      mapper: personCreateSchema ? personCreateSchema : ({} as any),
      value: {
        organisation: { description: 'Org1' },
      },
    });
    // nest simple-entity into organisation and check if the reference can be used when nested
    expect(resultCreate).toEqual({
      organisation: { create: { description: 'Org1' } },
    });
  });

  it('should use manyRelation()', () => {
    const personCreateSchema = personSchema.createSchema;
    expect(personCreateSchema).not.toBeUndefined();

    const resultCreate = object()({
      // we checked that personCreateSchema is not undefined
      mapper: personCreateSchema ? personCreateSchema : ({} as any),
      value: { addresses: [{ address: 'Org1' }] },
    });
    expect(resultCreate).toEqual({
      addresses: { create: [{ address: 'Org1' }] },
    });
  });

  it('should use reference()', () => {
    const personCreateSchema = personSchema.createSchema;
    expect(personCreateSchema).not.toBeUndefined();

    const resultCreate = object()({
      // we checked that personCreateSchema is not undefined
      mapper: personCreateSchema ? personCreateSchema : ({} as any),
      value: {
        organisationId: { id: '1' },
      },
    });
    expect(resultCreate).toEqual({
      organisation: {
        connect: { id: '1' },
      },
    });
  });

  it('should use nested reference()', () => {
    const personCreateSchema = personSchema.createSchema;
    expect(personCreateSchema).not.toBeUndefined();

    const resultCreate = object()({
      // we checked that personCreateSchema is not undefined
      mapper: personCreateSchema ? personCreateSchema : ({} as any),
      value: {
        organisation: { description: 'Org1', simpleId: { id: '1' } },
      },
    });
    expect(resultCreate).toEqual({
      organisation: {
        create: { description: 'Org1', simple: { connect: { id: '1' } } },
      },
    });
  });

  it('should use manyReference()', () => {
    const personCreateSchema = personSchema.createSchema;
    expect(personCreateSchema).not.toBeUndefined();

    const resultCreate = object()({
      // we checked that personCreateSchema is not undefined
      mapper: personCreateSchema ? personCreateSchema : ({} as any),
      value: { addressesIds: [{ id: '1' }] },
    });
    expect(resultCreate).toEqual({
      addresses: { connect: [{ id: '1' }] },
    });
  });

  // it('should assert a disconnect conflict between reference and relation', () => {
  //   const consoleErrorSpy = jest.spyOn(console, 'error');
  //   const result = object<
  //     Partial<PrismaInputReferences<UpdatePersonInput> & UpdatePersonInput>,
  //     InferPrismaModel<
  //       Partial<PrismaInputReferences<UpdatePersonInput> & UpdatePersonInput>
  //     >
  //   >()({
  //     mapper: personUpdateMapper,
  //     value: {
  //       organisationId: { id: '1' },
  //     },
  //     oldValue: {
  //       organisationId: { id: '2' },
  //       organisation: { description: 'Org1', id: '1' } as any,
  //     },
  //   });
  //   // expect(result).toEqual({});
  //   expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
  //   //`Cannot disconnect and connect a relation at the same time`,
  // });
});
