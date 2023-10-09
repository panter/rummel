export const UPDATE_ONE_USER_GQL_SCHEMA: string = `type User {
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
}`;

export const UPDATE_ONE_COMPANY_GQL_SCHEMA: string = `type User {
  id: Float!
  name: String!
}

type Company {
  id: Float!
  name: String!
  description: String!
  founder: User!
  ceo: User
  cto: User
}

type Mutation {
  updateOneCompany(data: CompanyUpdateInput, where: EntityIdInput!): Company!
}

input CompanyUpdateInput {
  description: StringInput
  ceo: UserConnectNestedOneWithoutCompanyInput
  cto: UserNestedOneWithoutCompanyInput
}

input StringInput {
  set: String
}

input UserConnectNestedOneWithoutCompanyInput {
  connect: ConnectRelationInput
  disconnect: Boolean
}

input ConnectRelationInput {
  id: String!
}

input UserNestedOneWithoutCompanyInput {
  connect: ConnectRelationInput
  disconnect: Boolean
  create: UserCreateWithoutCompanyInput
  update: UserUpdateWithoutCompanyInput
}

input UserCreateWithoutCompanyInput {
  name: String
}

input UserUpdateWithoutCompanyInput {
  name: StringInput
}

input EntityIdInput {
  id: String!
}`;

export const UPDATE_ONE_GROUP_GQL_SCHEMA = `type User {
  id: Float!
  name: String!
}

type Group {
  id: Float!
  name: String!
  description: String!
  founders: [User!]!
  coordinator: [User!]
  finance: [User!]
}

type Mutation {
  updateOneGroup(data: GroupUpdateInput, where: EntityIdInput!): Group!
}

input GroupUpdateInput {
  description: StringInput
  coordinator: UserConnectNestedManyWithoutGroupInput
  finance: UserConnectCreateUpdateNestedManyWithoutGroupInput
}

input StringInput {
  set: String
}

input UserConnectNestedManyWithoutGroupInput {
  connect: [ConnectRelationInput!]
  disconnect: [EntityIdInput!]
}

input ConnectRelationInput {
  id: String!
}

input EntityIdInput {
  id: String!
}

input UserConnectCreateUpdateNestedManyWithoutGroupInput {
  connect: [ConnectRelationInput!]
  disconnect: [EntityIdInput!]
  create: [UserCreateWithoutGroupInput!]
  update: [UserUpdateWithWhereUniqueWithoutGroupInput!]
}

input UserCreateWithoutGroupInput {
  name: String
}

input UserUpdateWithWhereUniqueWithoutGroupInput {
  where: EntityIdInput!
  data: UserUpdateInput
}

input UserUpdateInput {
  name: StringInput
}`;
