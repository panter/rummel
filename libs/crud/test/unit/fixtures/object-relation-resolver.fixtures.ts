export const OBJECT_RELATIONS_GROUP_GQL_SCHEMA = `type User {
  id: Float!
  name: String!
}

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

type Query {
  group(where: EntityIdInput): Group
}

input EntityIdInput {
  id: String!
}`;
