export const FIND_MANY_USER_GQL_SCHEMA: string = `type User {
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
}`;
