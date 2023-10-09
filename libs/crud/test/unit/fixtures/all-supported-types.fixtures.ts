export const ALL_SUPPORTED_TYPES_GQL_SCHEMA: string = `type Dummy2 {
  idProp: ID!
  dummyProp: Dummy!
}

type Dummy {
  idProp: ID!
  intProp: Int!
  floatProps: Float!
  enumProp: DummyEnum!
  stringProp: String!
  optionalStringProp: String
  boolProp: Boolean!
  dateProp: DateTime!
  oneToManyProp(where: Dummy2WhereInput, orderBy: [Dummy2OrderByInput!], skip: Int, take: Int): [Dummy2!]!
  manyToManyProp(where: Dummy2WhereInput, orderBy: [Dummy2OrderByInput!], skip: Int, take: Int): [Dummy2!]!
}

enum DummyEnum {
  A
  B
}

"""
A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format.
"""
scalar DateTime

input Dummy2WhereInput {
  AND: [Dummy2WhereInput!]
  OR: [Dummy2WhereInput!]
  NOT: [Dummy2WhereInput!]
  idProp: StringFilter
  dummyProp: DummyOneRelationFilter
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

input DummyOneRelationFilter {
  AND: DummyWhereInput
  OR: DummyWhereInput
  NOT: DummyWhereInput
  idProp: StringFilter
  intProp: IntFilter
  floatProps: IntFilter
  enumProp: DummyEnumEnumFilter
  stringProp: StringFilter
  optionalStringProp: StringFilter
  boolProp: BoolFilter
  dateProp: DateTimeFilter
}

input DummyWhereInput {
  AND: [DummyWhereInput!]
  OR: [DummyWhereInput!]
  NOT: [DummyWhereInput!]
  idProp: StringFilter
  intProp: IntFilter
  floatProps: IntFilter
  enumProp: DummyEnumEnumFilter
  stringProp: StringFilter
  optionalStringProp: StringFilter
  boolProp: BoolFilter
  dateProp: DateTimeFilter
  oneToManyProp: Dummy2WhereInput
  manyToManyProp: Dummy2WhereInput
}

input IntFilter {
  equals: Float
  gt: Float
  gte: Float
  lt: Float
  lte: Float
}

input DummyEnumEnumFilter {
  equals: DummyEnum
  in: [DummyEnum!]
  nin: [DummyEnum!]
  contains: DummyEnum
  gt: DummyEnum
  gte: DummyEnum
  lt: DummyEnum
  lte: DummyEnum
  fulltext: DummyEnum
  mode: SringQueryMode
}

input BoolFilter {
  equals: Boolean
}

input DateTimeFilter {
  equals: DateTime
  gt: DateTime
  gte: DateTime
  lt: DateTime
  lte: DateTime
}

input Dummy2OrderByInput {
  idProp: SortOrder
  dummyProp: DummyOrderByInput
}

enum SortOrder {
  asc
  desc
}

input DummyOrderByInput {
  idProp: SortOrder
  intProp: SortOrder
  floatProps: SortOrder
  enumProp: SortOrder
  stringProp: SortOrder
  optionalStringProp: SortOrder
  boolProp: SortOrder
  dateProp: SortOrder
  oneToManyProp: Dummy2OrderByInput
  manyToManyProp: Dummy2OrderByInput
}

type Query {
  dummy(where: EntityIdInput): Dummy
  dummies(where: DummyWhereInput, orderBy: [DummyOrderByInput!], skip: Int, take: Int): [Dummy!]!
  dummiesCount(where: DummyWhereInput, orderBy: [DummyOrderByInput!], skip: Int, take: Int): Int!
}

input EntityIdInput {
  id: String!
}

type Mutation {
  createOneDummy(data: DummyCreateInput): Dummy!
  updateOneDummy(data: DummyUpdateInput, where: EntityIdInput!): Dummy!
  deleteOneDummy(where: EntityIdInput): Dummy!
}

input DummyCreateInput {
  intProp: Float
  floatProps: Float
  enumProp: DummyEnum
  stringProp: String
  optionalStringProp: String
  boolProp: Boolean
  dateProp: DateTime
  oneToManyProp: Dummy2ConnectCreateUpdateNestedManyWithoutDummyInput
  manyToManyProp: Dummy2ConnectCreateUpdateNestedManyWithoutDummyInput
}

input Dummy2ConnectCreateUpdateNestedManyWithoutDummyInput {
  connect: [ConnectRelationInput!]
  disconnect: [EntityIdInput!]
  create: [Dummy2CreateWithoutDummyInput!]
  update: [Dummy2UpdateWithWhereUniqueWithoutDummyInput!]
}

input ConnectRelationInput {
  id: String!
}

input Dummy2CreateWithoutDummyInput

input Dummy2UpdateWithWhereUniqueWithoutDummyInput {
  where: EntityIdInput!
  data: Dummy2UpdateInput
}

input Dummy2UpdateInput {
  dummyProp: DummyConnectNestedOneWithoutDummy2Input
}

input DummyConnectNestedOneWithoutDummy2Input {
  connect: ConnectRelationInput
  disconnect: Boolean
}

input DummyUpdateInput {
  intProp: NumberInput
  floatProps: NumberInput
  enumProp: DummyEnumEnumInput
  stringProp: StringInput
  optionalStringProp: StringInput
  boolProp: BooleanInput
  dateProp: DateInput
  oneToManyProp: Dummy2ConnectCreateUpdateNestedManyWithoutDummyInput
  manyToManyProp: Dummy2ConnectCreateUpdateNestedManyWithoutDummyInput
}

input NumberInput {
  set: Float
}

input DummyEnumEnumInput {
  set: DummyEnum
}

input StringInput {
  set: String
}

input BooleanInput {
  set: Boolean
}

input DateInput {
  set: DateTime
}`;
