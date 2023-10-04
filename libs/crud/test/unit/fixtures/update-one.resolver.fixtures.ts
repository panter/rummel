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
