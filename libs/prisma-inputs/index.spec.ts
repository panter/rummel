import {
  manyReference,
  mapFromPrismaSchema,
  object,
  property,
  reference,
} from './mappers';
import {
  organisationCreateMapper,
  organisationUpdateMapper,
  personSchema,
} from './test-data';

const TESTPICK = (() => null) as any;

describe('property()', () => {
  it('should return new value if no oldValue is not set "create"', () => {
    const resultUndefined = property<string, any>(TESTPICK).map({
      value: 'John',
      method: 'create',
    });
    expect(resultUndefined).toBe('John');

    const resultNull = property<string | null, any>(TESTPICK).map({
      value: 'John',
      oldValue: null,
      method: 'create',
    });
    expect(resultNull).toBe('John');
  });

  it('should return new value if no oldValue is not set "update"', () => {
    const resultUndefined = property<string, boolean>(TESTPICK).map({
      value: 'John',
      method: 'update',
    });
    expect(resultUndefined).toEqual({ set: 'John' });

    const resultNull = property<string | null, string>(TESTPICK).map({
      value: 'John',
      oldValue: null,
      method: 'update',
    });
    expect(resultNull).toEqual({ set: 'John' });
  });

  it('should return undefined if value and oldValue are the same', () => {
    const resultCreate = property<string, string>(TESTPICK).map({
      value: 'John',
      oldValue: 'John',
      method: 'create',
    });
    expect(resultCreate).toBeUndefined();

    const resultUpdate = property<string, string>(TESTPICK).map({
      value: 'John',
      oldValue: 'John',
      method: 'create',
    });
    expect(resultUpdate).toBeUndefined();
  });

  it('should return undefined if new value is null or undefined and oldValue is set on create', () => {
    const resultUndefined = property<string, string>(TESTPICK).map({
      oldValue: 'John',
      method: 'create',
    });
    expect(resultUndefined).toBeUndefined();

    const resultNull = property<string | null, string>(TESTPICK).map({
      value: null,
      oldValue: 'John',
      method: 'create',
    });
    expect(resultNull).toBeUndefined();
  });

  it('should return undefined if new value is null or undefined and oldValue is set on create', () => {
    const resultCreate = property<string, string>(TESTPICK).map({
      oldValue: 'John',
      method: 'update',
    });
    expect(resultCreate).toEqual({ set: undefined });

    const resultUpdate = property<string | null, string>(TESTPICK).map({
      value: null,
      oldValue: 'John',
      method: 'update',
    });
    expect(resultUpdate).toEqual({ set: undefined });
  });

  it('should return new value if no oldValue is not set "update"', () => {
    const resultUndefined = property<string, string>(TESTPICK).map({
      value: 'John',
      method: 'update',
    });
    expect(resultUndefined).toEqual({ set: 'John' });

    const resultNull = property<string | null, string>(TESTPICK).map({
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
    >(TESTPICK).map({
      value: { id: '1' },
    });
    expect(resultUndefined).toEqual({ connect: { id: '1' } });
  });

  it('should return undefined if value and oldValue are the same', () => {
    const resultCreate = reference<{ connect: { id: string } }, { id: string }>(
      TESTPICK,
    ).map({
      value: { id: '1' },
      oldValue: { id: '1' },
    });
    expect(resultCreate).toBeUndefined();
  });

  it('should return undefined if new value is null or undefined and oldValue is set on create', () => {
    const resultUndefined = reference<
      { connect: { id: string } },
      { id: string }
    >(TESTPICK).map({
      oldValue: { id: '1' },
    });
    expect(resultUndefined).toEqual({ disconnect: true });

    const resultNull = reference<{ connect: { id: string } }, { id: string }>(
      TESTPICK,
    ).map({
      oldValue: { id: '1' },
    });
    expect(resultNull).toEqual({ disconnect: true });
  });

  it('should return value if value and oldValue are set', () => {
    const resultCreate = reference<{ connect: { id: string } }, { id: string }>(
      TESTPICK,
    ).map({
      value: { id: '1' },
      oldValue: { id: '2' },
    });
    expect(resultCreate).toEqual({ connect: { id: '1' } });
  });

  it('should return undefined if there is nothing to do', () => {
    const resultCreate = reference<{ connect: { id: string } }, { id: string }>(
      TESTPICK,
    ).map({
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
      { id: string },
      any
    >(TESTPICK).map({
      value: [{ id: '1' }],
    });
    expect(resultUndefined).toEqual({ connect: [{ id: '1' }] });
  });

  it('should return undefined if value and oldValue are the same', () => {
    const resultCreate = manyReference<
      { connect: { id: string }[] },
      { id: string },
      any
    >(TESTPICK).map({
      value: [{ id: '1' }],
      oldValue: [{ id: '1' }],
    });
    expect(resultCreate).toBeUndefined();
  });

  it('should return undefined if new value is null or undefined and oldValue is set on create', () => {
    const resultUndefined = manyReference<
      { connect: { id: string }[] },
      { id: string },
      any
    >(TESTPICK).map({
      oldValue: [{ id: '1' }],
    });
    expect(resultUndefined).toEqual({ disconnect: [{ id: '1' }] });

    const resultNull = manyReference<
      { connect: { id: string }[] },
      { id: string },
      any
    >(TESTPICK).map({
      oldValue: [{ id: '1' }],
    });
    expect(resultNull).toEqual({ disconnect: [{ id: '1' }] });
  });

  it('should return value and disconnect old value if value and oldValue are set', () => {
    const resultCreate = manyReference<
      { connect: { id: string }[] },
      { id: string },
      any
    >(TESTPICK).map({
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
      { id: string },
      any
    >(TESTPICK).map({
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
      { id: string },
      any
    >(TESTPICK).map({
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
      { id: string },
      any
    >(TESTPICK).map({
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
        fname: 'John',
      },
    });
    expect(resultCreate).toEqual({ create: { name: 'John' } });
  });

  it('should return undefined if value and oldValue are the same', () => {
    const resultCreate = organisationCreateMapper.properties.simple.map({
      value: { fname: 'John' },
      oldValue: { fname: 'John' },
    });

    expect(resultCreate).toBeUndefined();
  });

  //   it('should disconnect if new value is null or undefined and oldValue is set', () => {
  //     const resultUndefined = organisationCreateMapper.properties.simple.map({
  //       value: undefined,
  //       oldValue: { fname: 'John' },
  //     });
  //     expect(resultUndefined).toEqual({ disconnect: true });

  //     const resultNull = organisationCreateMapper.properties.simple.map({
  //       value: null,
  //       oldValue: { fname: 'John' },
  //     });
  //     expect(resultNull).toEqual({ disconnect: true });
  //   });

  //   it('should return update even if property id is not set', () => {
  //     const resultCreate = organisationUpdateMapper.properties.simple.map({
  //       value: { fname: 'John' },
  //       oldValue: {
  //         fname: 'Jane',
  //         id: '1',
  //       } as any,
  //     });
  //     expect(resultCreate).toEqual({
  //       update: { name: { set: 'John' } },
  //     });
  //   });
  //   it('should return update if property id is set, disregarding the oldValue', () => {
  //     const resultCreate = organisationCreateMapper.properties.simple.map({
  //       value: { fname: 'John', id: '1' } as any,
  //       oldValue: { fname: 'Jane', id: '1' } as any,
  //     });
  //     expect(resultCreate).toEqual({
  //       update: { name: { set: 'John' } },
  //     });
  //   });
  // });

  // describe('manyRelation()', () => {
  //   it('should return new value if oldValue is not set', () => {
  //     const resultCreate = organisationCreateMapper.properties.simples.map({
  //       value: [{ fname: 'John' }],
  //     });
  //     expect(resultCreate).toEqual({ create: [{ name: 'John' }] });
  //   });

  //   it('should return undefined if value and oldValue are the same', () => {
  //     const resultCreate = organisationCreateMapper.properties.simples.map({
  //       value: [{ fname: 'John' }],
  //       oldValue: [{ fname: 'John' }],
  //     });
  //     expect(resultCreate).toBeUndefined();
  //   });

  //   it('should disconnect if new value is null or undefined and oldValue is set', () => {
  //     const john = { fname: 'John', id: '1' };

  //     const resultUndefined = organisationCreateMapper.properties.simples.map({
  //       oldValue: [john],
  //     });
  //     expect(resultUndefined).toEqual({ disconnect: [{ id: john.id }] });

  //     const resultNull = organisationCreateMapper.properties.simples.map({
  //       value: null,
  //       oldValue: [john],
  //     });
  //     expect(resultNull).toEqual({ disconnect: [{ id: john.id }] });
  //   });

  //   it('should update, create and remove', () => {
  //     const jane = { fname: 'Jane', id: '1' };
  //     const james = { fname: 'James', id: '2' };
  //     const emma = { fname: 'Emma', id: '3' };
  //     const resultCreate = organisationCreateMapper.properties.simples.map({
  //       value: [{ fname: 'John' }, james, { id: emma.id, fname: 'Emma-Lisa' }],
  //       oldValue: [jane, james, emma],
  //     });

  //     expect(resultCreate).toEqual({
  //       create: [{ name: 'John' }],
  //       update: [
  //         { where: { id: emma.id }, data: { name: { set: 'Emma-Lisa' } } },
  //       ],
  //       disconnect: [{ id: jane.id }],
  //     });
  //   });
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
    const simpleCreateSchema = organisationCreateMapper;
    expect(simpleCreateSchema).not.toBeUndefined();

    const resultCreate = object()({
      // we checked that personCreateSchema is not undefined
      mapper: simpleCreateSchema ? simpleCreateSchema : ({} as any),
      value: {
        simple: { fname: 'Org1' },
      },
    });
    // nest simple-entity into organisation and check if the reference can be used when nested
    expect(resultCreate).toEqual({
      simple: { create: { name: 'Org1' } },
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
        organisation: { id: '1' },
      },
    });
    expect(resultCreate).toEqual({
      organisation: {
        connect: { id: '1' },
      },
    });
  });

  it('should use manyReference()', () => {
    const personCreateSchema = personSchema.createSchema;

    const resultCreate = object()({
      // we checked that personCreateSchema is not undefined
      mapper: personCreateSchema ? personCreateSchema : ({} as any),
      value: { addressesIds: [{ id: '1' }] },
    });
    expect(resultCreate).toEqual({
      addresses: { connect: [{ id: '1' }] },
    });
  });

  describe('mapFromPrismaSchema()', () => {
    it('should map using the schema', () => {
      const createSchema = personSchema.createSchema;
      expect(createSchema).not.toBeUndefined();
      if (!createSchema) {
        return;
      }

      const resultCreate = mapFromPrismaSchema({
        schema: createSchema,
        value: { addressesIds: [{ id: '1' }] },
      });

      expect(resultCreate).toEqual({
        addresses: { connect: [{ id: '1' }] },
      });
    });
  });
});
