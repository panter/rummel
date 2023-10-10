# Introduction to @panter/crud
In the modern web development landscape, CRUD operations form the backbone of many applications. The @panter/crud library seamlessly integrates with Nest.js and Mikro-Orm to provide developers with a powerful tool to automatically generate a GraphQL API tailored for CRUD operations.

# Overview
The @panter/crud library is a lightweight yet robust solution designed for Nest.js applications. By leveraging the power of Mikro-Orm entities and GraphQL schemas, it automates the creation of GraphQL endpoints for standard CRUD operations. This means less boilerplate code, consistent API patterns, and faster development cycles.

# Key Features
Auto-Generated Resolvers: Based on your Mikro-Orm entities and GraphQL schema, the library can automatically generate resolvers for:

- Fetching a single record (`FindOneResolver`)
- Fetching multiple records with filtering, ordering, and pagination (`FindManyResolver`)
- Creating a new record (`CreateOneResolver`)
- Updating an existing record (`UpdateOneResolver`)
- Deleting a record (`DeleteOneResolver`)
- Flexible Decorators: With the `@CrudField` decorator, developers can easily control the visibility and behavior of entity fields during CRUD operations. For instance, certain fields can be hidden during creation or update processes.
- Dynamic Querying: The generated API supports dynamic querying capabilities, allowing clients to filter, sort, and paginate results with ease. This is particularly useful for building responsive and efficient front-end interfaces.
- Consistent Schema Patterns: By using the library, your GraphQL schemas for CRUD operations will follow a consistent pattern, making it easier for developers and clients to understand and work with the API.

# Installation

```shell
yarn add @panter/crud
```

# Example
Consider a simple User entity:

```typescript 
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { CrudField } from '@panter/crud';

@Entity()
@ObjectType()
export class User {
  @CrudField({ hideCreate: true, hideUpdate: true })
  @Field()
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Field()
  @Property()
  name!: string;
}
```

With just this entity definition and the power of @panter/crud, a comprehensive GraphQL API is generated, allowing clients to fetch, create, update, and delete users with ease.

# Resolvers
## FindOneResolver

__Resolver__:
```ts
import { FindOneResolver } from '@panter/crud';

@Resolver(() => User)
export class FindOneUserResolver extends FindOneResolver(User) {}
```

__Schema__:
```gql
type User {
  id: Float!
  name: String!
}

type Query {
  user(where: EntityIdInput): User
}

input EntityIdInput {
  id: String!
}
```

## FindManyResolver

__Resolver__:
```ts
import { FindManyResolver } from '@panter/crud';

@Resolver(() => User)
export class FindManyUserResolver extends FindManyResolver(User) {}
```

__Schema__:
```gql
type User {
  id: Float!
  name: String!
}

type Query {
  users(where: UserWhereInput, orderBy: [UserOrderByInput!], skip: Int, take: Int): [User!]!
  usersCount(where: UserWhereInput, orderBy: [UserOrderByInput!], skip: Int, take: Int): Int!
}

input UserWhereInput {
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
  id: IntFilter
  name: StringFilter
}

input IntFilter {
  equals: Float
  gt: Float
  gte: Float
  lt: Float
  lte: Float
}

input StringFilter {
  equals: String
  in: [String!]
  nin: [String!]
  contains: String
  gt: String
  gte: String
  lt: String
  lte: String
  fulltext: String
  mode: SringQueryMode
}

enum SringQueryMode {
  default
  insensitive
}

input UserOrderByInput {
  id: SortOrder
  name: SortOrder
}

enum SortOrder {
  asc
  desc
}

```

## CreateOneResolver

__Resolver__:
```ts
import { CreateOneResolver } from '@panter/crud';

@Resolver(() => User)
export class CreateOneUserResolver extends CreateOneResolver(User) {}
```

__Schema__:
```gql
type User {
  id: Float!
  name: String!
}

type Mutation {
  createOneUser(data: UserCreateInput): User!
}

input UserCreateInput {
  name: String
}
```

## UpdateOneResolver

__Resolver__:
```ts
import { UpdateOneResolver } from '@panter/crud';

@Resolver(() => User)
export class UpdateOneUserResolver extends UpdateOneResolver(User) {}
```

__Schema__:
```gql
type User {
  id: Float!
  name: String!
}

type Mutation {
  updateOneUser(data: UserUpdateInput, where: EntityIdInput!): User!
}

input UserUpdateInput {
  name: StringInput
}

input StringInput {
  set: String
}

input EntityIdInput {
  id: String!
}
```

## DeleteOneResolver

__Resolver__:
```ts
import { DeleteOneResolver } from '@panter/crud';

@Resolver(() => User)
export class DeleteOneUserResolver extends DeleteOneResolver(User) {}
```

__Schema__:
```gql
type User {
  id: Float!
  name: String!
}

type Mutation {
  deleteOneUser(where: EntityIdInput): User!
}

input EntityIdInput {
  id: String!
}
```

## ObjectRelationResolver
The ObjectRelationResolver is tailored to generate GraphQL resolvers for entity relationships where one entity relates to multiple others. Instead of merely fetching these related entities, the resolver provides enhanced capabilities, allowing clients to filter and paginate through the related entities seamlessly.

### How It Works
- Relationship Detection: The ObjectRelationResolver identifies relationships within the Mikro-Orm entities where one entity has multiple relations (e.g., one-to-many or many-to-many relationships).

- Resolver Generation: For each detected relationship, the resolver automatically generates GraphQL endpoints. These endpoints are not just for fetching the related entities but also offer advanced querying capabilities.

- Filtering and Pagination: The generated endpoints come equipped with filtering and pagination functionalities. This allows clients to retrieve a subset of related entities based on specific criteria or paginate through large sets of related entities.

__Resolver__:
```ts
@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Group] })],
  providers: [
    MaterialsDepotFindOneResolver,
    ...ObjectRelationResolvers(MaterialsDepot),
  ]
})
export class GroupModule {}
```

__Schema__:
```gql
type Group {
  id: Float!
  name: String!
  description: String!
  founders(where: UserWhereInput, orderBy: [UserOrderByInput!], skip: Int, take: Int): [User!]!
  coordinator(where: UserWhereInput, orderBy: [UserOrderByInput!], skip: Int, take: Int): [User!]
  finance(where: UserWhereInput, orderBy: [UserOrderByInput!], skip: Int, take: Int): [User!]
}

input UserWhereInput {
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
  id: IntFilter
  name: StringFilter
}

input UserOrderByInput {
  id: SortOrder
  name: SortOrder
}

...
```


# Decorators

### @CrudField

The CrudField decorator is used to control the visibility and behavior of entity fields during CRUD operations. 
Crud Field is not responsable for visibility on the object return by the mutations and queries. For this you can use the `@Field` decorator from `@nestjs/graphql`. [This is subject to change in the future](https://git.panter.ch/rummel/rummel/-/issues/7).

__Api Options__:
- `hideCreate`: If set to `true`, the field will be hidden from the create operation, so the field cannot be set during creation.
- `hideUpdate`: If set to `true`, the field will be hidden from the update operation, so the field cannot be updated.
- `hideWhere`: If set to `true`, the field will be hidden from the where input type, so the field cannot be filtered.
- `fieldOptions`: An object containing additional options for the field. This object is passed directly to the `@Field` decorator from `@nestjs/graphql`.
- `relation`: 
  - `showConnect`: If set to `true`, the relation can be connected by primary key.
  - `showCreate`: If set to `true`, the relation can be created with all it's fields.
  - `showUpdate`: If set to `true`, the relation can be updated with all it's fields.
  - `showDisconnect`: If set to `true`, the relation can be disconnected by primary key.
  
