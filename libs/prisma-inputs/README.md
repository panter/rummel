# Prisma Inputs

Prisma Inputs is a TypeScript library that provides utility functions and types for working with Prisma input schemas. It offers a set of mapper functions that help you map and transform input data to match the structure expected by Prisma's `create`, `update`, `connect` and `disconnect` methods.

## Installation

You can install Prisma Inputs using npm or yarn:

```shell
yarn add @panter/prisma-inputs
```


## Usage
To use Prisma Inputs, you need to import the necessary functions and types from the library. Here's an example of how you can use Prisma Inputs to define an input schema and map input data:


## PrismaInputSchema
``` ts
import {
  PrismaInputSchema,
  PropertyMapper,
  OneRelationMapper,
  reference,
  relation,
  object,
} from '@panter/prisma-inputs';

// Define your input schema
type UserInput = {
  name: string;
  email: string;
  role: 'admin' | 'user';
  address: {
    street: string;
    city: string;
    country: string;
  };
  companyId?: number;
};
});

// Create an input schema
const userSchema: PrismaInputSchema<UserInput> = {
  mapper: object(),
  properties: {
    name: property<string>(),
    email: property<string>(),
    role: property<'admin' | 'user'>(),
    address: object<AddressInput>(),
    companyId: reference<CompanyIdInput>(),
  },
};

// Map input data using the input schema
const mapUserInput = (data: UserInput) => userSchema.mapper({ value: data });

// Usage example
const userInput: UserInput = {
  name: 'John Doe',
  email: 'john@example.com',
  role: 'user',
  address: {
    street: '123 Main St',
    city: 'New York',
    country: 'USA',
  },
  companyId: 1,
};

const prismaData = mapUserInput(userInput);
console.log(prismaData);
```

## PrismaSchemaBuilder

To define an input schema builder, you can use the prismaSchema function. It takes three parameters: unionProps, createProps, and updateProps. These parameters are functions that define the properties of the input schema.

Here's an example of how to define an input schema for the Simple model:


```ts
const simpleSchema = () =>
  prismaSchemaBuilder<CreateSimpleInput, UpdateSimpleInput>([
    () => ({
      name: property(),
    }),
    true,
    true,
  ]);

const personSchema = (): InferSchema<CreatePersonInput, UpdatePersonInput> =>
  prismaSchemaBuilder<CreatePersonInput, UpdatePersonInput>([
    () => ({
      name: property(),
      addresses: manyRelation(addressSchema().relation()),
      addressesIds: manyReference(),
      organisation: relation({
        create: () => organisationCreateMapper,
        update: () => organisationUpdateMapper,
      }),
      organisationId: reference(),
    }),
    true,
    true,
  ]);

const addressSchema = () =>
  prismaSchemaBuilder<UpdateAddressInput, UpdateAddressInput>([
    () => ({
      address: property(),
      personId: reference(),
      person: relation(personSchema().relation()),
    }),
    true,
    true,
  ]);

const organisationMapper: PrismaInputSchema<
  PrismaInput<CreateOrganisationInput | UpdateOrganisationInput>
> = {
  mapper: object(),
  properties: {
    simple: relation(simpleSchema().relation()),
    simpleId: reference(),
    description: property(),
    person: relation(personSchema().relation()),
    personId: reference(),
  },
};
```

### Referenced directly or indirectly in one of its return expressions

Error Message would look like this:
```
'personSchema' implicitly has return type 'any' because it does not have a return type annotation and is referenced directly or indirectly in one of its return expressions
```

To get rid of this, just type one of the conficting schemas with the `InferSchema` type:

``` ts
const personSchema = (): InferSchema<CreatePersonInput, UpdatePersonInput> => prismaSchemaBuilder<CreatePersonInput, UpdatePersonInput>([
```

