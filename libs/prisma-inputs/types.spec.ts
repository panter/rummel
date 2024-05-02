import { PrismaInputSchema } from '.';
import {
  autoProperty,
  autoReference,
  object,
  property,
  reference,
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
        displayName: property((m) => m?.optionalName, {
          nullable: true,
        }),
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
        personId: { connect: { id: string } };
        addressId: { connect: { id: string } };
        countryId: { connect: { id: string } };
        organizationId: { connect: { id: string | null } | null };
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
        personId: { connect?: { id: string } };
        addressId: { connect?: { id: string } };
        countryId: { connect?: { id: string } };
        organizationId: { connect?: { id: string | null } | null };
      },
      {
        personId: { id: string | null };
        addressId: { id: number };
        organizationId: { id: string };
      }
    > = {
      mapper: object(),
      properties: {
        // @ts-expect-error Input.personId.id is not nullable but Model.personId.id is
        personId: reference((m) => m?.personId),
        // @ts-expect-error Input.personId.id is a string but Model.personId.id is a number
        addressId: reference((m) => m?.addressId),
        // @ts-expect-error Input.personId.id cannot be null
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
        personId: { connect?: { id: string } };
        addressId: { connect?: { id: string } };
        countryId: { connect?: { id: string } };
        organizationId: { connect?: { id: string | null } | null };
      },
      {
        personId: { id: string | null };
        addressId: { id: number };
        countryId: { id: string };
        organizationId: { id: string | null } | null;
      }
    > = {
      mapper: object(),
      properties: {
        // @ts-expect-error Input.personId.id is not nullable but Model.personId.id is
        personId: autoReference(),
        // @ts-expect-error Input.personId.id is a string but Model.personId.id is a number
        addressId: autoReference(),
        countryId: autoReference(),
        organizationId: autoReference(),
      },
    };

    expect(schema).toBeDefined();
  });
});
