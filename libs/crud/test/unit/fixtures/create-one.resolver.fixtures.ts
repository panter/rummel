export const CREATE_ONE_USER_GQL_SCHEMA: string = `type User {
  id: Float!
  name: String!
}

type Mutation {
  createOneUser(data: UserCreateInput): User!
}

input UserCreateInput {
  name: String
}`;

export const CREATE_ONE_COMPANY_GQL_SCHEMA: string = `type User {
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
  createOneCompany(data: CompanyCreateInput): Company!
}

input CompanyCreateInput {
  name: String
  founder: UserConnectNestedOneWithoutCompanyInput
}

input UserConnectNestedOneWithoutCompanyInput {
  connect: ConnectRelationInput
}

input ConnectRelationInput {
  id: String!
}`;

export const CREATE_ONE_GROUP_GQL_SCHEMA = `type User {
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
  createOneGroup(data: GroupCreateInput): Group!
}

input GroupCreateInput {
  name: String
  description: String
  founders: UserConnectNestedManyWithoutGroupInput
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
}`;
