export const FIND_ONE_USER_GQL_SCHEMA: string = `type User {
  id: Float!
  name: String!
}

type Query {
  user(where: EntityIdInput): User
}

input EntityIdInput {
  id: String!
}`;
