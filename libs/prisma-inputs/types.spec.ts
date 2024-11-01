import { PrismaInputSchema } from '.';
import {
  autoManyReference,
  autoProperty,
  autoReference,
  autoRelation,
  manyReference,
  object,
  property,
  reference,
  relation,
} from './mappers';

describe('types: PrismaInputSchema', () => {
  it('expect to reject if not everty property has a mapping', () => {
    const schema: PrismaInputSchema<
      {
        name: string;
      },
      { name: string }
    > = {
      mapper: object(),
      // @ts-expect-error missing properties
      properties: {},
    };

    expect(schema).toBeDefined();
  });
});

describe('types: PropertyMapper', () => {
  it('should respect nullable properties and reject', () => {
    const schema: PrismaInputSchema<
      {
        name: string;
      },
      { name: string | null }
    > = {
      mapper: object(),
      properties: {
        name: {
          // @ts-expect-error Input.name is not nullable but Model.name is
          pick: (m) => m?.name,
          // @ts-expect-error return value cannot be null
          map: () => {
            return null;
          },
          __typename: 'Property',
        },
      },
    };

    expect(schema).toBeDefined();
  });

  it('should respect model types in mapper', () => {
    const schema: PrismaInputSchema<
      {
        name: string | null;
      },
      { name: boolean | null }
    > = {
      mapper: object(),
      properties: {
        name: {
          // @ts-expect-error Model.name is boolean but Input.name is string
          pick: (m) => m?.name,
          map: ({ value }) => {
            return value;
          },
          __typename: 'Property',
        },
      },
    };

    expect(schema).toBeDefined();
  });

  it('should respect Input types with the {set?: ... | null} type', () => {
    const schema: PrismaInputSchema<
      {
        name: { set?: string };
      },
      { name: string }
    > = {
      mapper: object(),

      properties: {
        name: {
          pick: (m) => m?.name,
          map: (p) => {
            return p ? { set: p.value } : undefined;
          },
          __typename: 'Property',
        },
      },
    };

    expect(schema).toBeDefined();
  });
});

describe('types: PropertyMapper -> property', () => {
  it('should respect Input and Model property types', () => {
    const schema: PrismaInputSchema<
      {
        name: string;
        secondName: string;
        displayName: string | null;
      },
      {
        name: string | null;
        secondName: boolean | null;
        optionalName: string | null;
      }
    > = {
      mapper: object(),
      properties: {
        // @ts-expect-error Input.name is not nullable but Model.name is
        name: property((m) => m?.name),
        // @ts-expect-error Model.name is boolean but Input.name is string
        secondName: property((m) => m?.name),
        // no error map optionalName to displayName, both are nullable and strings
        displayName: property((m) => m?.optionalName),
      },
    };

    expect(schema).toBeDefined();
  });

  it('should respect Input and Model property types also with the "set" styles', () => {
    const schema: PrismaInputSchema<
      {
        name: { set?: string };
        secondName: { set?: string };
        displayName: { set?: string | null };
      },
      {
        name: string | null;
        secondName: boolean | null;
        optionalName: string | null;
      }
    > = {
      mapper: object(),
      properties: {
        // @ts-expect-error Input.name is not nullable but Model.name is
        name: property((m) => m?.name),
        // @ts-expect-error Model.name is boolean but Input.name is string
        secondName: property((m) => m?.name),
        // no error map optionalName to displayName, both are nullable and strings
        displayName: property((m) => m?.optionalName),
      },
    };

    expect(schema).toBeDefined();
  });
});

describe('types: PropertyMapper -> autoProperty', () => {
  it('should respect that Input and Model properties are equal types', () => {
    const schema: PrismaInputSchema<
      {
        name: string;
        secondName: string;
        displayName: string;
        optionalName: string | null;
        optionalShortName: string | null;
      },
      {
        secondName: string | null;
        displayName: boolean;
        optionalName: string | null;
        optionalShortName: string;
      }
    > = {
      mapper: object(),
      properties: {
        // @ts-expect-error Model.name is not present
        name: autoProperty(),
        // @ts-expect-error Model.name is nullable but Input.name is not
        secondName: autoProperty(),
        // @ts-expect-error Model.name is a boolean but Input.displayName is a string
        displayName: autoProperty(),
        // no error, both are nullable and strings
        optionalName: autoProperty(),
        // no error, Input.optionalShortName is nullable and Model.optionalShortName is a string and not nullable
        optionalShortName: autoProperty(),
      },
    };

    expect(schema).toBeDefined();
  });
});

describe('types: OneReferenceMapper', () => {
  it('should respect that Input and Model properties are equal types', () => {
    const schema: PrismaInputSchema<
      {
        personId: { connect?: { id: string } };
        addressId: { connect?: { id: string } };
        countryId: { connect?: { id: string } };
        organizationId: { connect?: { id: string | null } | null };
      },
      { personId: { id: string | null }; addressId: { id: number } }
    > = {
      mapper: object(),
      properties: {
        personId: {
          // @ts-expect-error Input.personId.id is not nullable but Model.personId.id is
          pick: (m) => m?.personId,
          // @ts-expect-error return value cannot be null
          map: () => {
            return null;
          },
          __typename: 'Reference',
        },
        addressId: {
          // @ts-expect-error Input.personId.id is a string but Model.personId.id is a number
          pick: (m) => m?.addressId,
          // @ts-expect-error id in connect cannot be null
          map: () => {
            return { connect: { id: null } };
          },
          __typename: 'Reference',
        },
        countryId: {
          // @ts-expect-error Input.personId.id cannot be null
          pick: () => ({
            id: null,
          }),
          // @ts-expect-error id in connect cannot be null
          map: () => {
            return { connect: { id: null } };
          },
          __typename: 'Reference',
        },
        organizationId: {
          // not error Input.organizationId.connect.id is nullable
          pick: () => ({
            id: null,
          }),
          // not error Input.organizationId.connect.id is nullable
          map: () => {
            return { connect: { id: null } };
          },
          __typename: 'Reference',
        },
      },
    };

    expect(schema).toBeDefined();
  });
});

describe('types: OneReferenceMapper -> reference', () => {
  it('should respect that Input and Model properties are equal types', () => {
    const schema: PrismaInputSchema<
      {
        personId: { connect?: { id?: string | null } };
        addressId?: { connect?: { id?: string | null } | null } | null;
        countryId?: { connect?: { id?: string | null } | null } | null;
        organizationId?: { connect?: { id: string | null } | null } | null;
      },
      {
        personId: { id: string | null };
        addressId: { id: number };
        organizationId: { id: string; tooMuch?: string | null } | null;
      }
    > = {
      mapper: object(),
      properties: {
        // @-ts-expect-error Input.personId.id is not nullable but Model.personId.id is
        personId: reference((m) => m?.personId, { required: true }),
        // @ts-expect-error Input.personId.id is a string but Model.personId.id is a number
        addressId: reference((m) => m?.addressId),
        // @-ts-expect-error Input.personId.id cannot be null
        countryId: reference(() => {
          return { id: null };
        }),
        organizationId: reference((m) => m?.organizationId),
      },
    };

    expect(schema).toBeDefined();
  });
});

describe('types: OneReferenceMapper -> autoReference', () => {
  it('should respect that Input and Model properties are equal types', () => {
    const schema: PrismaInputSchema<
      {
        personId: { connect?: { id?: string | null } };
        addressId?: { connect?: { id?: string | null } | null } | null;
        countryId: { connect?: { id?: string | null } | null } | null;
        organizationId?: { connect?: { id?: string | null } | null } | null;
      },
      {
        personId: { id: string | null } | null;
        addressId?: { id: number | null } | null;
        countryId?: { id?: string | null } | null;
        organizationId?: { id?: string | null; tooMuch?: number } | null;
      }
    > = {
      mapper: object(),
      properties: {
        // @ts-expect-error Input.personId.id is not nullable but Model.personId.id is
        personId: autoReference(),
        // @ts-expect-error Input.personId.id is a string but Model.personId.id is a number
        addressId: autoReference(),
        countryId: autoReference(),
        // @ts-expect-error Model.organizationId, has more properties than Input.organizationId
        organizationId: autoReference(),
      },
    };

    expect(schema).toBeDefined();
  });
});

describe('types: OneRelationMapper', () => {
  it('should respect that Input and Model properties are equal types', () => {
    const schema: PrismaInputSchema<
      {
        person: { create?: { name: string } };
      },
      { person: { name: string; id: string } }
    > = {
      mapper: object(),
      properties: {
        // the property has no idea how to map the person object, so it leave everything as any
        // for a consistent typing system use the `*Relation` mappers
        person: {
          pick: (m) => m?.person,
          map: (p) => {
            return p ? { create: { name: p.value } } : undefined;
          },
          __typename: 'Relation',
        },
      },
    };
    expect(schema).toBeDefined();
  });
});

describe('types: OneRelationMapper -> relation', () => {
  it('should respect that Input and Model properties are equal types', () => {
    const schema: PrismaInputSchema<
      {
        person: { create?: { name: string } };
        address: { create?: { name: string } };
        country: { create?: { name: string } };
        // organizationId: { connect?: { id: string | null } | null };
      },
      {
        person: { name: string; id: string };
        address: { name: string | null };
        country: { name: string };
      }
    > = {
      mapper: object(),
      properties: {
        // no error here
        person: relation(
          (m) => m?.person,
          () =>
            ({}) as {
              create?: () => PrismaInputSchema<
                {
                  name: string;
                },
                { name: string }
              >;
            },
        ),
        address: relation(
          // @ts-expect-error Model.address.name is nullable but the `create` schema model property `name` is not nullable
          (m) => m?.address,
          () =>
            ({}) as {
              create?: () => PrismaInputSchema<
                {
                  name: string;
                },
                { name: string }
              >;
            },
        ),
        // @ts-expect-error Input.country.name is not nullable but the `create` schema input property `name` is nullable
        country: relation(
          (m) => m?.country,
          () =>
            ({}) as {
              create?: () => PrismaInputSchema<
                {
                  name: string | null;
                },
                { name: string }
              >;
            },
        ),
      },
    };
    expect(schema).toBeDefined();
  });
});

describe('types: OneRelationMapper -> autoRelation', () => {
  it('should respect that Input and Model properties are equal types', () => {
    const schema: PrismaInputSchema<
      {
        person: { create?: { name: string } };
        // address: { create?: { name: string } };
        // country: { create?: { name: string } };
        // organizationId: { connect?: { id: string | null } | null };
      },
      {
        person: { name: string; id: string };
        // address: { name: string | null };
        // country: { name: string };
      }
    > = {
      mapper: object(),
      properties: {
        // no error here
        person: autoRelation(
          () =>
            ({}) as {
              create?: () => PrismaInputSchema<
                {
                  name: string;
                },
                { name: string }
              >;
            },
        ),
      },
    };
    expect(schema).toBeDefined();
  });
});

describe('types: ManyReferenceMapper -> manyReference', () => {
  it('should respect that Input and Model properties are equal types', () => {
    const schema: PrismaInputSchema<
      {
        persons: { connect?: { id?: string | null }[] | null };
        notRequiredPersons?: {
          connect?: { id?: string | null }[] | null;
        } | null;
        requiredPersons: { connect?: { id?: string | null }[] | null };
        addresses?: { connect?: { id?: string | null }[] | null } | null;
        countries?: { connect?: { id?: string | null }[] | null } | null;
        organization?: { connect?: { id?: string | null }[] | null } | null;
      },
      {
        persons: { id: string }[];
        addresses: { id?: number | null }[];
        organization: { id: string; tooMuch?: string }[];
      }
    > = {
      mapper: object(),
      properties: {
        // no error here
        persons: manyReference(
          () => {
            return [{ id: 'm?.persons || null)' }];
          },
          { required: true },
        ),
        notRequiredPersons: manyReference(() => {
          return [{ id: 'm?.persons || null)' }];
        }),
        // @ts-expect-error Input.addresses is required, so the param "{required: true}"" is missing
        requiredPersons: manyReference(() => {
          return null;
        }),
        // @ts-expect-error Input.addresses.id is a string but Model.addresses.id is a number
        addresses: autoManyReference(),
        // @ts-expect-error countries no present in the model
        countries: autoManyReference(),
        // @ts-expect-error organization has more properties than the model "tooMuch?: string"
        organization: autoManyReference(),
      },
    };
    expect(schema).toBeDefined();
  });
});

describe('types: ManyReferenceMapper -> autoManyReference', () => {
  it('should respect that Input and Model properties are equal types', () => {
    const schema: PrismaInputSchema<
      {
        persons: { connect?: { id?: string | null }[] | null };
        notRequiredPersons: {
          connect?: { id?: string | null }[] | null;
        } | null;
        requiredPersons: {
          connect?: { id?: string | null }[] | null;
        };
        addresses?: { connect?: { id?: string | null }[] | null } | null;
        countries?: { connect?: { id?: string | null }[] | null } | null;
        organization?: { connect?: { id?: string | null }[] | null } | null;
      },
      {
        persons: { id: string }[];
        notRequiredPersons: { id: string }[] | null;
        requiredPersons: { id: string }[] | null;
        addresses?: { id: number | null }[] | null;
        organization?: { id: string; tooMuch?: string }[] | null;
      }
    > = {
      mapper: object(),
      properties: {
        // no error here
        persons: autoManyReference(),
        // no error here
        notRequiredPersons: autoManyReference(),
        // @ts-expect-error Input.requiredPersons.id is nullable but Model.requiredPersons.id is not
        requiredPersons: autoManyReference(),
        // @ts-expect-error Input.addresses.id is a string but Model.addresses.id is a number
        addresses: autoManyReference(),
        // @ts-expect-error countries no present in the model
        countries: autoManyReference(),
        // @ts-expect-error organization has more properties than the model "tooMuch?: string"
        organization: autoManyReference(),
      },
    };
    expect(schema).toBeDefined();
  });
});

describe('types: EmbeddedProperties', () => {
  it('is should allow to map embedded objects', () => {
    type Embedded = {
      street?: string | null;
    };
    const schema: PrismaInputSchema<
      {
        address?: Embedded | null;
      },
      { address?: Embedded | null }
    > = {
      mapper: object(),
      properties: {
        address: {
          pick: (m) => m?.address,
          map: () => {
            // use mapModelToInput with the schema of the embedded object
            return {
              street: 'street',
            };
          },
          __typename: 'Property',
        },
      },
    };

    expect(schema).toBeDefined();
  });
});
