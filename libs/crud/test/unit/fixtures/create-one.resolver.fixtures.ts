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
