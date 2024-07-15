import {
  autoProperty,
  autoRelation,
  mapFromPrismaSchema,
  prismaSchemaBuilder,
} from './';

// Define our model types
type AddressModel = {
  country: string;
};

type UserModel = {
  name: string;
  email: string;
  age?: number;
  address: AddressModel;
};

// Define Prisma input types (simplified for this example)
type AddressCreateInput = AddressModel;
type AddressUpdateInput = Partial<AddressModel>;
type UserCreateInput = Omit<UserModel, 'address'> & {
  address: { create: AddressCreateInput };
};
type UserUpdateInput = Partial<Omit<UserModel, 'address'>> & {
  address?: { update: AddressUpdateInput };
};

// Create schemas
const addressSchema = prismaSchemaBuilder<
  AddressCreateInput,
  AddressUpdateInput,
  AddressModel
>({
  props: {
    country: autoProperty({ set: true }),
  },
  create: {},
  update: {},
});

const userSchema = prismaSchemaBuilder<
  UserCreateInput,
  UserUpdateInput,
  UserModel
>({
  props: {
    name: autoProperty({ set: true }),
    email: autoProperty({ set: true }),
    age: autoProperty({ set: true }),
    address: autoRelation(() => addressSchema.relation()),
  },
  create: {},
  update: {},
});

if (!userSchema.updateSchema) {
  throw new Error('Update schema is required');
}

if (!userSchema.createSchema) {
  throw new Error('Create schema is required');
}

// Sample data
const user: UserModel = {
  name: 'John Doe',
  email: 'john@example.com',
  age: 30,
  address: {
    country: 'USA',
  },
};

// Function to demonstrate create operation
function demonstrateCreate(model: UserModel) {
  console.log('--- Create Operation ---');
  console.log('Input Model:');
  console.log(JSON.stringify(model, null, 2));

  if (!userSchema.createSchema) {
    throw new Error('Create schema is required');
  }

  const createInput = mapFromPrismaSchema({
    schema: userSchema.createSchema,
    value: model,
  });

  console.log('\nPrisma Create Input:');
  console.log(JSON.stringify(createInput, null, 2));
}

// Function to demonstrate update operation
function demonstrateUpdate(model: Partial<UserModel>, oldModel: UserModel) {
  console.log('\n--- Update Operation ---');
  console.log('Update Model:');
  console.log(JSON.stringify(model, null, 2));

  if (!userSchema.updateSchema) {
    throw new Error('Update schema is required');
  }

  const updateInput = mapFromPrismaSchema({
    schema: userSchema.updateSchema,
    value: model,
    oldValue: oldModel,
  });

  console.log('\nPrisma Update Input:');
  console.log(JSON.stringify(updateInput, null, 2));
}

// Run demonstrations
demonstrateCreate(user);

demonstrateUpdate(
  {
    email: 'johndoe@example.com',
    address: {
      country: 'Switzerland',
    },
  },
  user,
);

// Example of a more complex update
demonstrateUpdate(
  {
    age: 31,
    address: {
      country: 'Italy',
    },
  },
  user,
);
