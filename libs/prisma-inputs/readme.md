# Prisma Inputs

Prisma Inputs is a TypeScript library that provides utility functions and types for working with Prisma input schemas. It offers a set of mapper functions that help you map and transform a model that can be used in a form  to match the structure expected by Prisma's `create`, `update`, `connect` and `disconnect` methods.

- [prisma create](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#create)
- [prisma update](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#update)
- [prisma connect](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#connect)
- [prisma delete](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#delete)

## Installation

You can install Prisma Inputs using npm or yarn:

```shell
yarn add @panter/prisma-inputs
```

### ! Important NOTE !

This package is `not transpiled` jet.
If you want to use it with next js you need to add this to your `next.config.js`:

```js
const nextConfig = {
  transpilePackages: ["@panter/prisma-inputs"]
  ...
}
```


## What does prisma-inputs do?

Before diving into the code, let's understand the transformation with a simple example. Consider a model for a User that has an associated address.

```ts
type UserModel = {
  name: string;
  email: string;
  address: {
    street: string;
    city: string;
    zip: string;
  };
};
```
Suppose you have an instance of this model:
```ts
const user: UserModel = {
  name: "John Doe",
  email: "john.doe@example.com",
  address: {
    id: "1",
    street: "123 Main St",
    city: "Anytown",
    zip: "12345"
  }
};

```
Now, let's say you want to update the user's address in your database using Prisma. Prisma expects the input for relations in a specific format, using create, update, connect, and disconnect.

After Mapping
Using Prisma Inputs, the transformed model ready for a Prisma update might look like:
```ts
const prismaUpdateInput = {
  name: "John Doe",
  email: "john.doe@example.com",
  address: {
    update: {
      street: { set: "123 Main St" },
      city: { set: "Anytown" },
      zip: { set: "12345" }
    }
  }
};

```
In this example, the address field of the UserModel is transformed to match Prisma's expected input format for updating relations. The PrismaInputSchema and the provided utility functions handle this transformation seamlessly.

## Usage
To use Prisma Inputs, you need to import the necessary functions and types from the library. Here's an example of how you can use Prisma Inputs to define an input schema and map input data:

### PrismaInputSchema
``` ts
import {
  PrismaInputSchema,
  PropertyMapper,
  OneRelationMapper,
  reference,
  relation,
  object,
  mapFromPrismaSchema,
} from '@rummel/prisma-inputs';

// Create an input schema
const addressCreateSchema: PrismaInputSchema<
  AddressCreateWithoutPersonInput,
  InferPrismaModel<Partial<AddressCreateWithoutPersonInput>>
> = {
  mapper: object(),
  properties: {
    address: property(),
  },
};

// Update an input schema
const addressUpdateSchema: PrismaInputSchema<
  AddressUpdateInput,
  InferPrismaModel<Partial<AddressUpdateInput>>
> = {
  mapper: object(),
  properties: {
    address: property(),
  },
};

// create a new address
const createAddressInput = mapFromPrismaSchema({
  schema: addressCreateSchema,
  value: { address: 'otherstreet' },
});
console.log(createAddressInput); // { address: 'otherstreet' }

// update new address
const newAddress = { id: '1', address: 'streetname' };
const updateAddressInput = mapFromPrismaSchema({
  schema: addressUpdateSchema,
  value: newAddress,
});
console.log(updateAddressInput); // { address: { set: 'streetname' } }

// use address schema in a relation
const userCreateSchema: PrismaInputSchema<PersonCreateInput> = {
  mapper: object(),
  properties: {
    name: property(),
    addresses: manyRelation(() => ({
      create: () => addressCreateSchema,
      update: () => addressUpdateSchema,
    })),
    organisation: reference(),
  },
};

const createPersonInput = mapFromPrismaSchema({
  schema: userCreateSchema,
  value: { organisation: { id: '1' }, addresses: [{ address: 'streetname' }] },
});

/**
{
  organisation: { connect: { id: '1' } },
  addresses: { create: [{ address: 'streetname' }] },
}
 */
console.log(createPersonInput);
```

### PrismaSchemaBuilder

To define an input schema builder, you can use the prismaSchema function. It takes three parameters: unionProps, createProps, and updateProps. These parameters are functions that define the properties of the input schema.

Here's an example of how to define an input schema for the Simple model:


```ts
const simpleSchema = prismaSchemaBuilder<SimpleCreateInput, SimpleUpdateInput>({
  props: {
    name: property(),
  },
  create: {},
  update: { secondName: property() },
});

const personSchema = prismaSchemaBuilder<PersonCreateInput, PersonUpdateInput>({
  props: {
    name: property(),
    addresses: manyRelation(() => addressSchema.relation()),
    addressesIds: manyReference(),
    organisation: reference(),
    organisationId: reference(),
  },
  create: {},
  update: {},
});

const addressSchema = prismaSchemaBuilder<
  AddressCreateWithoutPersonInput,
  AddressUpdateInput
>({
  props: {
    address: property(),
  },
  create: {},
  update: {},
});

const organisationCreateMapper: PrismaInputSchema<
  PrismaInput<OrganisationCreateInput>
> = {
  mapper: object(),
  properties: {
    description: property(),
    person: manyReference(),
    personIds: manyReference(),
    simple: relation(() => simpleSchema.relation()),
    simpleId: reference(),
    simples: manyRelation(() => simpleSchema.relation()),
    simplesIds: manyReference(),
  },
};
```

### Using the schemas to map

```ts
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
```

