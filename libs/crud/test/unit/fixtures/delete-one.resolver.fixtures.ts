export const DELETE_ONE_USER_GQL_SCHEMA: string = `type User {
  id: Float!
  name: String!
}

type Mutation {
  deleteOneUser(where: EntityIdInput): User!
}

input EntityIdInput {
  id: String!
}`;
